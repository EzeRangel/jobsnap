"use client";

import {
  BookPlusIcon,
  FileSearchIcon,
  FileStackIcon,
  SquareKanbanIcon,
  TextSearchIcon,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { NavMain } from "./navigation/nav-main";
import { NavUser } from "./navigation/nav-user";

const APPLICATION = [
  {
    id: 1,
    label: "Analyze CV",
    href: "/",
    icon: TextSearchIcon,
  },
  {
    id: 2,
    label: "Improve CV",
    href: "/improve",
    icon: BookPlusIcon,
  },
];

const USER_NAVIGATION = {
  dashboard: [
    {
      title: "Dashboard",
      href: "#",
      items: [
        {
          title: "Resume Manager",
          href: "/u/resume-manager",
          icon: FileStackIcon,
        },
        {
          title: "Job Tracking",
          href: "/u/job-tracking",
          icon: SquareKanbanIcon,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a href="/">
                <FileSearchIcon className="h-5 w-5" />
                <span className="text-base font-semibold">Job Snap</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain menu={APPLICATION} />
        {USER_NAVIGATION.dashboard.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((navItem) => (
                  <SidebarMenuItem key={navItem.title}>
                    <SidebarMenuButton>
                      {navItem?.icon ? <navItem.icon /> : null}
                      {navItem.title}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
