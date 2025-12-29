"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  created_at: string;
  updated_at: string;
};

export const columns: ColumnDef<User>[] = [
  {
    id: "index",
    header: () => <span className="hidden md:table-cell">No</span>,
    cell: ({ row, table }) => {
      return <span className="hidden md:table-cell">{row.index + 1}</span>;
    },
  },
  {
    accessorKey: "name",
    header: "Nama Pengguna",
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div className="flex items-center gap-3">
          <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-md">
            <Image
              src="/default_avatar.svg"
              alt={user.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold">{user.name}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: () => <span className="hidden md:table-cell">Email</span>,
    cell: ({ row }) => {
      const email = row.getValue("email") as string;
      return (
        <div className="text-muted-foreground hidden max-w-[300px] truncate md:table-cell">
          {email}
        </div>
      );
    },
  },
  {
    accessorKey: "role",
    header: "Peran",
    cell: ({ row }) => {
      const role = row.getValue("role") as string;
      return <span className="capitalize">{role}</span>;
    },
  },
  {
    accessorKey: "created_at",
    header: () => <span className="hidden md:table-cell">Dibuat Pada</span>,
    cell: ({ row }) => {
      const createdAt = new Date(row.getValue("created_at") as string);
      return (
        <span className="hidden md:table-cell">{createdAt.toLocaleDateString()}</span>
      );
    },
  },
  {
    accessorKey: "updated_at",
    header: () => <span className="hidden md:table-cell">Diperbarui Pada</span>,
    cell: ({ row }) => {
      const updatedAt = new Date(row.getValue("updated_at") as string);
      return (
        <span className="hidden md:table-cell">{updatedAt.toLocaleDateString()}</span>
      );
    },
  }
];
