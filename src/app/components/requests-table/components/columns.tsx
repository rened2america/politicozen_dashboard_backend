"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
// import { Checkbox } from "@/components/ui/checkbox"

import { labels, priorities, statuses } from "../data/data";
import { Task } from "../data/schema";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./data-table-row-actions";
import { Checkbox } from "@/components/ui/checkbox";

export const columns: ColumnDef<Task>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => (
      <div className="w-[80]">{row.getValue("id")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "artistName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Artist Name" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("artistName")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "position",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Position" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("position")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "color",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Colors" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("color")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "urlImage",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="color" />
    ),
    cell: ({ row }) =>  <img src={row.getValue("urlImage")} height={50} width={50} alt={"image"} />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "actions",
    cell: ({ row, table }) => {
      // Access the onDeleteSuccess callback from table context
      const { onDeleteSuccess } = table.options.meta || {};
      return <DataTableRowActions row={row} onDeleteSuccess={onDeleteSuccess} />;
    },
  },
];