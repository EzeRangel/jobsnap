"use client";

import { useTheme } from "next-themes";
import HelpDialog from "../help-dialog";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { MoonIcon, SunIcon } from "lucide-react";

export function NavUser() {
  const { setTheme, theme } = useTheme();

  return (
    <SidebarMenu>
      <SidebarMenuItem className="text-xs">
        <SidebarMenuButton className="text-xs">
          <HelpDialog />
        </SidebarMenuButton>
        <SidebarMenuButton
          className="text-xs"
          onClick={() => {
            if (theme === "dark") setTheme("light");
            else setTheme("dark");
          }}
        >
          {theme === "light" ? (
            <>
              <MoonIcon className="size-3" />
              <span>Dark</span>
            </>
          ) : (
            <>
              <SunIcon className="size-3" />
              <span>Light</span>
            </>
          )}
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
