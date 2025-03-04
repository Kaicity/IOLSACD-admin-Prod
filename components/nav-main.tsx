"use client";

import { ChevronRight } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import type NavLink from "@/app/models/nav-link.type";
import clsx from "clsx";
import { usePathname } from "next/navigation";

export function NavMain({ items }: { items: NavLink[] }) {
  const pathVariable = usePathname();

  const mainItems = items.filter((item) => item.group === "main");
  const managementItems = items.filter((item) => item.group === "management");
  const generalInformations = items.filter(
    (item) => item.group === "general-information"
  );
  const statisticItems = items.filter((item) => item.group === "statistic");

  const renderItem = (item: NavLink) => (
    <Collapsible
      key={item.label}
      asChild
      defaultOpen={item.isActive}
      className="group/collapsible"
    >
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          {!item.children || item.children.length === 0 ? (
            <Link href={item.path}>
              <SidebarMenuButton
                tooltip={item.label}
                className={clsx(
                  "hover:bg-primary hover:text-white",
                  item.path === pathVariable ? "text-white bg-primary" : ""
                )}
              >
                {item.icon && <item.icon />}
                <span>{item.label}</span>
                {item.children && item.children.length > 0 && (
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                )}
              </SidebarMenuButton>
            </Link>
          ) : (
            <SidebarMenuButton
              tooltip={item.label}
              className={clsx(
                "hover:bg-primary hover:text-white",
                item.path === pathVariable ? "text-white bg-primary" : ""
              )}
            >
              {item.icon && <item.icon />}
              <span>{item.label}</span>
              {item.children && item.children.length > 0 && (
                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              )}
            </SidebarMenuButton>
          )}
        </CollapsibleTrigger>
        {item.children && item.children.length > 0 && (
          <CollapsibleContent>
            <SidebarMenuSub>
              {item.children.map((subItem) => (
                <SidebarMenuSubItem key={subItem.path}>
                  <SidebarMenuSubButton
                    asChild
                    className={clsx(
                      "hover:bg-primary hover:text-white",
                      subItem.path === pathVariable
                        ? "text-white bg-primary"
                        : ""
                    )}
                  >
                    <Link href={subItem.path}>
                      <span>{subItem.label}</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        )}
      </SidebarMenuItem>
    </Collapsible>
  );

  return (
    <SidebarGroup>
      {mainItems.length > 0 && (
        <>
          <SidebarGroupLabel className="text-muted-foreground">
            Tổng quan
          </SidebarGroupLabel>
          <SidebarMenu>{mainItems.map(renderItem)}</SidebarMenu>
        </>
      )}

      {managementItems.length > 0 && (
        <>
          <SidebarGroupLabel className="text-muted-foreground">
            Quản lý
          </SidebarGroupLabel>
          <SidebarMenu>{managementItems.map(renderItem)}</SidebarMenu>
        </>
      )}

      {statisticItems.length > 0 && (
        <>
          <SidebarGroupLabel className="text-muted-foreground">
            Thống kê
          </SidebarGroupLabel>
          <SidebarMenu>{statisticItems.map(renderItem)}</SidebarMenu>
        </>
      )}

      {generalInformations.length > 0 && (
        <>
          <SidebarGroupLabel className="text-muted-foreground">
            Tùy chỉnh
          </SidebarGroupLabel>
          <SidebarMenu>{generalInformations.map(renderItem)}</SidebarMenu>
        </>
      )}
    </SidebarGroup>
  );
}
