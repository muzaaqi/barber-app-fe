"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import EditHaircut from "./edit-haircut";
import DeleteDialog from "../delete-dialog";

export type Haircut = {
  id: string;
  name: string;
  description: string;
  image_url: string;
};

export const columns: ColumnDef<Haircut>[] = [
  {
    id: "index",
    header: () => <span className="hidden md:table-cell">No</span>,
    cell: ({ row, table }) => {
      return <span className="hidden md:table-cell">{row.index + 1}</span>;
    },
  },
  {
    accessorKey: "name",
    header: "Model Rambut",
    cell: ({ row }) => {
      const haircut = row.original;
      return (
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md border bg-muted">
            <Image
              src={haircut.image_url}
              alt={haircut.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold">{haircut.name}</span>
            {/* Pada mobile, jika deskripsi panjang, kita sembunyikan atau tampilkan sedikit saja di sini jika mau */}
          </div>
        </div>
      );
    },
  },
  // Kolom 3: Deskripsi (Hanya tampil di Desktop/Tablet)
  {
    accessorKey: "description",
    header: () => <span className="hidden md:table-cell">Deskripsi</span>,
    cell: ({ row }) => {
      const desc = row.getValue("description") as string;
      return (
        <div className="hidden max-w-[300px] truncate md:table-cell text-muted-foreground">
          {desc}
        </div>
      );
    },
  },
  // Kolom 4: Actions (Dropdown)
  {
    id: "actions",
    cell: ({ row }) => {
      const haircut = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-fit">
            {/* Masukkan komponen Edit & Delete Anda di sini */}
            <div className="flex flex-col gap-1 p-1">
                <EditHaircut
                id={haircut.id}
                haircut_name={haircut.name}
                haircut_description={haircut.description}
                image_url={haircut.image_url}
                />
                <DeleteDialog id={haircut.id} variant="haircut" />
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];