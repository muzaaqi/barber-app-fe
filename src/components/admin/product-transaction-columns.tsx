"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatIDR } from "@/features/formatter";
import { updateProductTransactionStatus } from "@/actions/management/product-transaction-actions";
import { EditableStatus } from "@/components/admin/editable-status";

const EXPEDITION_STATUS_OPTS = [
  "pending",
  "processed",
  "shipped",
  "delivered",
  "cancelled",
];
const PAYMENT_STATUS_OPTS = ["pending", "paid", "unpaid", "refunded"];

export type ProductsTransaction = {
  id: string;
  expedition_service: string;
  expedition_status: string;
  payment_method: string;
  payment_status: string;
  total_price: number;
  shipping_address: string;
  created_at?: string;
  items: {
    product_name: string;
    product_image: string;
    quantity: number;
    subtotal: number;
  }[];
  user: {
    name: string;
    email: string;
    image_url?: string;
  };
};

export const columns: ColumnDef<ProductsTransaction>[] = [
  {
    id: "index",
    header: () => <span className="hidden md:table-cell">No</span>,
    cell: ({ row }) => (
      <span className="hidden md:table-cell">{row.index + 1}</span>
    ),
  },
  {
    accessorKey: "items",
    header: "Produk",
    cell: ({ row }) => {
      const items = row.original.items;
      const firstItem = items[0];

      return (
        <div className="flex items-center gap-3">
          <div className="bg-muted relative h-10 w-10 shrink-0 overflow-hidden rounded-md border">
            <Image
              src={firstItem.product_image || "/placeholder.jpg"}
              alt={firstItem.product_name}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex flex-col">
            <span className="line-clamp-1 max-w-[150px] text-sm font-medium md:max-w-[200px] md:text-base">
              {firstItem.product_name}
            </span>

            <div className="text-muted-foreground flex items-center gap-2 text-xs">
              <span>x{firstItem.quantity}</span>
              {items.length > 1 && (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="link"
                      className="text-primary h-auto p-0 text-xs"
                    >
                      +{items.length - 1} lainnya
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-0" align="start">
                    <div className="space-y-3 p-3">
                      <h4 className="mb-2 border-b pb-2 text-sm font-medium">
                        Detail Item
                      </h4>
                      {items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <div className="bg-muted relative h-8 w-8 shrink-0 overflow-hidden rounded border">
                            <Image
                              src={item.product_image}
                              alt={item.product_name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 text-sm">
                            <p className="line-clamp-1 font-medium">
                              {item.product_name}
                            </p>
                            <div className="text-muted-foreground flex justify-between text-xs">
                              <span>x{item.quantity}</span>
                              <span>{formatIDR(item.subtotal)}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              )}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "user.name",
    header: "Customer",
    cell: ({ row }) => {
      const { user } = row.original;
      return (
        <div className="flex items-center gap-3">
          <div className="bg-muted relative h-8 w-8 shrink-0 overflow-hidden rounded-full">
            <Image
              src={user.image_url || "/default_avatar.svg"}
              alt={user.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{user.name}</span>
            <span className="text-muted-foreground hidden text-xs lg:inline-block">
              {user.email}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "expedition_service",
    header: () => <span className="hidden md:table-cell">Pengiriman</span>,
    cell: ({ row }) => {
      const trx = row.original;
      return (
        <div className="hidden max-w-[200px] flex-col gap-1 md:flex">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-[10px] uppercase">
              {trx.expedition_service}
            </Badge>
            <EditableStatus
              id={trx.id}
              currentStatus={trx.expedition_status}
              options={EXPEDITION_STATUS_OPTS}
              onUpdate={(id, status) =>
                updateProductTransactionStatus(id, "expedition_status", status)
              }
              colorMap={{
                delivered: "default",
                shipped: "secondary",
                pending: "outline",
                cancelled: "destructive",
              }}
            />
          </div>
          <p
            className="text-muted-foreground truncate text-xs"
            title={trx.shipping_address}
          >
            {trx.shipping_address || "-"}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "payment_status",
    header: () => <span className="hidden lg:table-cell">Status Bayar</span>,
    cell: ({ row }) => (
      <div className="hidden flex-col items-start gap-1 lg:flex">
        <EditableStatus
          id={row.original.id}
          currentStatus={row.original.payment_status}
          options={PAYMENT_STATUS_OPTS}
          onUpdate={(id, status) =>
            updateProductTransactionStatus(id, "payment_status", status)
          }
        />
        <span className="text-muted-foreground pl-1 text-xs capitalize">
          {row.original.payment_method}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "total_price",
    header: "Total",
    cell: ({ row }) => (
      <div className="flex flex-col items-end lg:items-start gap-1">
        <span className="text-sm font-bold md:text-base">
          {formatIDR(row.original.total_price)}
        </span>
        <Badge
          variant={
            row.original.payment_status === "paid" ? "default" : "secondary"
          }
          className="h-5 px-1 text-[10px] lg:hidden"
        >
          {row.original.payment_status}
        </Badge>
      </div>
    ),
  },
];
