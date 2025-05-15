"use client";

import { useTheme } from "next-themes";
import { SidebarMenuButton } from "./ui/sidebar";
import { MoonIcon, SunIcon } from "lucide-react";

export default function SidebarDarkModeButton() {
  const { setTheme, theme } = useTheme();

  return (
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
  );
}
