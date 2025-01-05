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
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
    cell: ({ row }) => (
      <div className="w-[80]">{row.getValue("id")}</div>
    ),
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "artistName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Artist Name" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("artistName")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "urlImage",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Image" />
    ),
    cell: ({ row }) =>  <img src={row.getValue("urlImage")} height={50} width={50} alt={"image"} />,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "position",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Position" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("position")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "color",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Colors" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("color")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "templates",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="templates" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("templates")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "isCreated",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created?" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("isCreated")== true ? "Yes" : "No"}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    id: "actions",
    cell: ({ row, table }) => {
      // Access the onDeleteSuccess callback from table context
      const { onDeleteSuccess, handleEdit, onOpenCreate } = table.options.meta || {};
      return <DataTableRowActions row={row} onDeleteSuccess={onDeleteSuccess} handleEdit={handleEdit} onOpenCreate={onOpenCreate} />;
    },
  },
];