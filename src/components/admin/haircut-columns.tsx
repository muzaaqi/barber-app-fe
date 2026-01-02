"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { MoreHorizontal, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import EditHaircut from "./edit-haircut";
import { deleteHaircutById } from "@/actions/management/haircut-actions";
import ConfirmationDialog from "../confirmation-dialog";
import type { Haircut } from "@/types";

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
          <div className="bg-muted relative h-12 w-12 shrink-0 overflow-hidden rounded-md border">
            <Image
              src={haircut.image_url}
              alt={haircut.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold">{haircut.name}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: () => <span className="hidden md:table-cell">Deskripsi</span>,
    cell: ({ row }) => {
      const desc = row.getValue("description") as string;
      return (
        <div className="text-muted-foreground hidden max-w-[300px] truncate md:table-cell">
          {desc}
        </div>
      );
    },
  },
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
            <div className="flex flex-col gap-1 p-1">
              <EditHaircut
                id={haircut.id}
                haircut_name={haircut.name}
                haircut_description={haircut.description}
                image_url={haircut.image_url}
              />
              <ConfirmationDialog
                onConfirm={async () => {
                  await deleteHaircutById(haircut.id);
                }}
                title="Hapus Model Rambut"
                description="Apakah Anda yakin ingin menghapus model rambut ini? Tindakan ini tidak dapat dibatalkan."
                confirmText="Hapus"
                cancelText="Batal"
                successText="Model rambut berhasil dihapus."
                errorText="Gagal menghapus model rambut."
                variant="destructive"
                trigger={
                  <Button
                    variant="ghost"
                    className="text-destructive flex items-center justify-start gap-3"
                  >
                    <Trash2 />
                    Hapus
                  </Button>
                }
              />
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
