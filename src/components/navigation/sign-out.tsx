"use client";

import { LoaderCircleIcon, LogOut } from "lucide-react";
import { useTransition } from "react";
import useAuthUser from "~/hooks/useAuthUser";
import { signOut } from "~/common/actions/auth/signout";
import { DropdownMenuItem } from "../ui/dropdown-menu";

export default function SignOut() {
  const [pending, startTransition] = useTransition();
  const { mutate } = useAuthUser();

  const handleClick = () => {
    startTransition(async () => {
      await signOut();
      await mutate();
    });
  };

  return (
    <DropdownMenuItem onClick={handleClick}>
      {pending ? (
        <LoaderCircleIcon className="w-4 h-4 animate-spin" />
      ) : (
        <LogOut className="text-destructive" size={18} />
      )}
      Logout
    </DropdownMenuItem>
  );
}
