"use client";
import { ColumnDef } from "@tanstack/react-table";

import Link from "next/link";
import { Eye } from "lucide-react";
import SortableColumn from "@/components/back-end/DataTableColumns/SortableColumn";
import ActionColumn from "@/components/back-end/DataTableColumns/ActionColumn";
import { Job } from "@prisma/client";

export const columns: ColumnDef<Job>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => (
      <SortableColumn column={column} title="Job Title" />
    ),
  },

  {
    accessorKey: "city",
    header: "City",
    cell: ({ row }) => {
      const job = row.original;
      return <h2>{job.city}</h2>;
    },
  },
  {
    accessorKey: "company",
    header: " Company",
    cell: ({ row }) => {
      const job = row.original;
      return <h2>{job.company}</h2>;
    },
  },

  {
    accessorKey: "view",
    header: "View Job",
    cell: ({ row }) => {
      const job = row.original;
      return (
        <Link
          className="flex items-center justify-center space-x-2"
          target="_blank"
          href={`/blogs/${job.id}`}
        >
          <Eye className="text-blue-500" />
        </Link>
      );
    },
  },

  // {
  //   accessorKey: "createdAt",
  //   header: "Published On",
  //   cell: ({ row }) => <DateColumn row={row} accessorKey="createdAt" />,
  // },

  {
    id: "actions",
    cell: ({ row }) => {
      const job = row.original;
      return (
        <ActionColumn
          row={row}
          model="job"
          editEndpoint={`/dashboard/jobs/update/${job.id}`}
          id={job.id}
        />
      );
    },
  },
];
