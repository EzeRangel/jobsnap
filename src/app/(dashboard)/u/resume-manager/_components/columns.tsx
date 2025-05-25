"use client";

import { ColumnDef } from "@tanstack/react-table";
import { FileIcon } from "lucide-react";
import NoSsr from "~/components/no-ssr";
import { FileObject } from "~/types/Storage";
import { DataTableActions } from "./data-table-actions";

export const columns: ColumnDef<FileObject>[] = [
  {
    id: "name",
    accessorKey: "name",
    header: "Name",
    cell: ({ cell }) => {
      return (
        <div className="flex flex-row items-center gap-2">
          <FileIcon className="text-red-400" />
          {cell.getValue<string>()}
        </div>
      );
    },
  },
  {
    id: "fileSize",
    accessorFn: (row) => row.metadata["size"],
    header: () => <div className="text-right">Size</div>,
    cell: ({ cell }) => {
      const fileSize = cell.getValue<number>();

      return (
        <div className="text-right">
          <span>{`${(fileSize / 1024).toFixed(1)} KB`}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: () => <div className="text-right">Created at</div>,
    cell: ({ cell }) => {
      const createdAt = cell.getValue<string>();

      return (
        <div className="text-right">
          <NoSsr>
            <span>{new Date(createdAt).toLocaleDateString()}</span>
          </NoSsr>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableActions row={row.original} />,
  },
];
