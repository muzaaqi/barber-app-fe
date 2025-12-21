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
import { formatIDR } from "@/features/formatter";
import EditProduct from "./edit-product";
import DeleteDialog from "../delete-dialog";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image_url: string;
};

export const columns: ColumnDef<Product>[] = [
  {
    id: "index",
    header: () => <span className="hidden md:table-cell">No</span>,
    cell: ({ row }) => (
      <span className="hidden md:table-cell">{row.index + 1}</span>
    ),
  },
  {
    accessorKey: "name",
    header: "Produk",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div className="flex items-center gap-3">
          <div className="bg-muted relative h-12 w-12 shrink-0 overflow-hidden rounded-md border">
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="line-clamp-1 font-semibold">{product.name}</span>
            <span className="text-muted-foreground text-xs md:hidden">
              Stok: {product.stock}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Harga",
    cell: ({ row }) => {
      return (
        <span className="font-medium">{formatIDR(row.getValue("price"))}</span>
      );
    },
  },
  {
    accessorKey: "stock",
    header: () => <span className="hidden md:table-cell">Stok</span>,
    cell: ({ row }) => (
      <span className="hidden md:table-cell">{row.getValue("stock")}</span>
    ),
  },
  {
    accessorKey: "description",
    header: () => <span className="hidden lg:table-cell">Deskripsi</span>,
    cell: ({ row }) => {
      const desc = row.getValue("description") as string;
      return (
        <div className="text-muted-foreground hidden max-w-[200px] truncate lg:table-cell">
          {desc}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;
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
              <EditProduct
                id={product.id}
                product_name={product.name}
                product_description={product.description}
                product_price={product.price}
                product_stock={product.stock}
                image_url={product.image_url}
              />
              <DeleteDialog id={product.id} variant="product" />
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
