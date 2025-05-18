"use client";

import dynamic from "next/dynamic";
import HelpDialog from "../help-dialog";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { NavItemAuth } from "./nav-item-auth";
import useAuthUser from "~/hooks/useAuthUser";
import { NavItemAnon } from "./nav-item-anon";

const DarkModeButton = dynamic(() => import("../sidebar-darkmode-button"), {
  ssr: false,
});

export function NavUser() {
  const { user } = useAuthUser();

  return (
    <SidebarMenu>
      <SidebarMenuItem className="text-xs">
        <SidebarMenuButton className="text-xs">
          <HelpDialog />
        </SidebarMenuButton>
        <DarkModeButton />
      </SidebarMenuItem>
      {user ? (
        <>
          <SidebarMenuItem>
            <NavItemAuth user={user} />
          </SidebarMenuItem>
        </>
      ) : (
        <SidebarMenuItem>
          <NavItemAnon />
        </SidebarMenuItem>
      )}
    </SidebarMenu>
  );
}
