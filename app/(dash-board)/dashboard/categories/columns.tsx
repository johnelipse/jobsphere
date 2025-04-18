"use client";
import { ColumnDef } from "@tanstack/react-table";

import Link from "next/link";
import { Eye } from "lucide-react";
import SortableColumn from "@/components/back-end/DataTableColumns/SortableColumn";
import ActionColumn from "@/components/back-end/DataTableColumns/ActionColumn";
import { CategoryProps } from "@/types/types";

export const columns: ColumnDef<CategoryProps>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => (
      <SortableColumn column={column} title="Category Title" />
    ),
  },

  {
    accessorKey: "view",
    header: "View Category",
    cell: ({ row }) => {
      const category = row.original;
      return (
        <Link
          className="flex items-center justify-center space-x-2"
          target="_blank"
          href={`/categories/${category.slug}`}
        >
          <Eye className="text-blue-500" />
        </Link>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const category = row.original;
      return (
        <ActionColumn
          row={row}
          model="category"
          editEndpoint={`/dashboard/categories/update/${category.slug}`}
          slug={category.slug}
        />
      );
    },
  },
];
