import { BadgeCheckIcon, ChevronsUpDown, Sparkles } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { SidebarMenuButton } from "../ui/sidebar";
import SignOut from "./sign-out";
import Link from "next/link";
import { UserDTO } from "~/types/UserProfile";
import getInitials from "~/lib/get-initials";

interface Props {
  user: UserDTO;
}

export function NavItemAuth({ user }: Props) {
  const { profile } = user;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarFallback className="rounded-lg">
              {profile?.first_name
                ? getInitials(`${profile.first_name} ${profile.last_name}`)
                : getInitials(user.email || "")}
            </AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            {user.profile?.first_name ? (
              <span className="truncate font-semibold">
                {`${user.profile.first_name} ${user.profile.last_name}`}
              </span>
            ) : null}
            <span className="truncate text-xs">{user.email}</span>
          </div>
          <ChevronsUpDown className="ml-auto size-4" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
        side="right"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarFallback className="rounded-lg">
                {profile?.first_name
                  ? getInitials(`${profile.first_name} ${profile.last_name}`)
                  : getInitials(user.email || "")}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              {user.profile?.first_name ? (
                <span className="truncate font-semibold">
                  {`${user.profile.first_name} ${user.profile.last_name}`}
                </span>
              ) : null}
              <span className="truncate text-xs">{user.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Sparkles />
            Upgrade to Pro
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/settings">
              <BadgeCheckIcon />
              Account
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <SignOut />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
