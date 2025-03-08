'use client';

import { navLinks } from '@/app/constants/navLinkItem';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { usePathname } from 'next/navigation';
import React from 'react';

interface FlattenedNavLink {
  path: string;
  label: string;
}

const BreadcrumbNavLink = () => {
  const pathname = usePathname();
  const pathnames = pathname.split('/').filter((x) => x);

  const flattenedNavLinks: FlattenedNavLink[] = navLinks.reduce((acc: FlattenedNavLink[], item) => {
    acc.push({ path: item.path, label: item.label });
    if (item.children) {
      acc.push(
        ...item.children.map((child) => ({
          path: child.path,
          label: child.label,
        })),
      );
    }
    return acc;
  }, []);

  const findLabelByPath = (path: string): string => {
    const found = flattenedNavLinks.find((item) => item.path === path);
    // return found ? found.label : path;
    return found ? found.label : '';
  };

  return (
    <Breadcrumb className="hidden md:block">
      <BreadcrumbList>
        {pathnames.map((_, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const label = findLabelByPath(routeTo);
          const isLast = index === pathnames.length - 1;
          return (
            <React.Fragment key={routeTo}>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage className="text-primary font-semibold">{label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={routeTo} className="text-black hover:underline">
                    {label}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbNavLink;
