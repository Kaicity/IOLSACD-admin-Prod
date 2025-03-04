import type { ReactNode } from 'react';

import { AppSidebar } from '@/components/app-sidebar';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import BreadcrumbNavLink from '../components/dashboard/Breadcrumb';
import { NavUser } from '@/components/nav-user';
import ToggleLanguage from '../components/dashboard/ToggleLanguage';
import NotificationBell from '../components/dashboard/NotificationBell';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="w-full overflow-hidden">
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b-[1px] border-border fixed top-0 left-0 right-0 z-50 bg-white">
          <div className="flex items-center justify-between w-full px-4">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4 hidden md:block" />
              <BreadcrumbNavLink />
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <ToggleLanguage />
              <NotificationBell />
              <NavUser />
            </div>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 mt-16">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
