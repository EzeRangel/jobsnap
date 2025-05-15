"use client";

import dynamic from "next/dynamic";
import HelpDialog from "../help-dialog";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";

const DarkModeButton = dynamic(() => import("../sidebar-darkmode-button"), {
  ssr: false,
});

export function NavUser() {
  return (
    <SidebarMenu>
      <SidebarMenuItem className="text-xs">
        <SidebarMenuButton className="text-xs">
          <HelpDialog />
        </SidebarMenuButton>
        <DarkModeButton />
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
