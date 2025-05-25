"use client";

import { MoreHorizontal } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { getDownloadURL } from "../_actions";
import { FileObject } from "~/types/Storage";
import { useTransition } from "react";

interface Props {
  row: FileObject;
}

export function DataTableActions({ row }: Props) {
  const [isPending, startTransition] = useTransition();

  const { name } = row;

  return (
    <div className="flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            disabled={isPending}
            onClick={() => {
              startTransition(async () => {
                const url = await getDownloadURL(name);

                startTransition(() => {
                  window.open(url, "_blank");
                });
              });
            }}
          >
            Download
          </DropdownMenuItem>
          <DropdownMenuItem>View payment details</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
