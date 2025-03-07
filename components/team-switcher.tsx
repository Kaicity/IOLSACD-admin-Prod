'use client';

import * as React from 'react';

import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import Image from 'next/image';
import { redirect } from 'next/navigation';

export function TeamSwitcher() {
  // const { isMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          onClick={() => {
            redirect('/dashboard');
          }}
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <Image width={50} height={50} src="/logo.jpg" alt="" className="w-[40px] h-auto" />

          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{'ILC'}</span>
            <span className="truncate text-xs">{'Platform'}</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
