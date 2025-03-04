"use client";

import * as React from "react";
import Logo from "@/public/logo.jpg";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";

export function TeamSwitcher() {
  // const { isMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <Image src={Logo} alt="" className="w-[40px] h-auto" />

          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{"ILC"}</span>
            <span className="truncate text-xs">{"Platform"}</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
