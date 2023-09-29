"use client";

import { ColumnDef } from "@tanstack/react-table";

import { CellAction } from "./cell-action";

export type CoreColumns = {
  id: string;
  core: string;
  thread: string;
  createdAt: string;
};

export const columns: ColumnDef<CoreColumns>[] = [
  {
    accessorKey: "core",
    header: "Core",
  },
  {
    accessorKey: "thread",
    header: "Thread",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">{row.original.thread}</div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
