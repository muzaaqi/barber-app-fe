"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { formatIDR } from "@/features/formatter";
import { updateHaircutTransactionStatus } from "@/actions/management/haircut-transaction-actions";
import { EditableStatus } from "@/components/admin/editable-status";
import { Banknote, QrCode } from "lucide-react";
import { Popover } from "@radix-ui/react-popover";
import { PopoverContent, PopoverTrigger } from "../ui/popover";

const PAYMENT_STATUS_OPTS = ["paid", "unpaid"];

export type HaircutTransaction = {
  id: string;
  reservation_time: string;
  reservation_status: string;
  payment_method: string;
  payment_status: string;
  receipt_url: string;
  total_price: number;
  haircut: {
    name: string;
    image_url: string;
  };
  user: {
    name: string;
    email: string;
    image_url?: string;
  };
};

export const columns: ColumnDef<HaircutTransaction>[] = [
  {
    id: "index",
    header: () => <span className="hidden md:table-cell">No</span>,
    cell: ({ row }) => (
      <span className="hidden md:table-cell">{row.index + 1}</span>
    ),
  },
  {
    accessorKey: "haircut.name",
    header: "Model",
    cell: ({ row }) => {
      const { haircut } = row.original;
      return (
        <div className="flex items-center gap-3">
          <div className="bg-muted relative h-10 w-10 shrink-0 overflow-hidden rounded-md">
            <Image
              src={haircut.image_url}
              alt={haircut.name}
              fill
              className="object-cover"
            />
          </div>
          <span className="text-sm font-medium md:text-base">
            {haircut.name}
          </span>
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
            <span className="text-muted-foreground inline-block text-xs">
              {user.email}
            </span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "reservation_time",
    header: () => <span className="hidden md:table-cell">Jadwal</span>,
    cell: ({ row }) => {
      const date = new Date(row.original.reservation_time);
      return (
        <div className="hidden flex-col md:flex">
          <span className="text-sm font-medium">
            {date.toLocaleDateString("id-ID", {
              day: "numeric",
              month: "short",
            })}
          </span>
          <span className="text-muted-foreground text-xs">
            {date.toLocaleTimeString("id-ID", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "reservation_status",
    header: () => (
      <span className="hidden lg:table-cell">Status Reservasi</span>
    ),
    cell: ({ row }) => (
      <div className="hidden lg:block">
        <EditableStatus
          id={row.original.id}
          currentStatus={row.original.reservation_status}
          options={["pending", "confirmed", "completed", "cancelled"]}
          qrTriggerStatus="completed"
          verificationPath="verify-haircut"
          onUpdate={(id, status) =>
            updateHaircutTransactionStatus(id, "reservation_status", status)
          }
        />
      </div>
    ),
  },
  {
    accessorKey: "payment_status",
    header: "Pembayaran",
    cell: ({ row }) => (
      <div className="flex flex-col gap-1">
        <EditableStatus
          id={row.original.id}
          currentStatus={row.original.payment_status}
          options={PAYMENT_STATUS_OPTS}
          onUpdate={(id, status) =>
            updateHaircutTransactionStatus(id, "payment_status", status)
          }
        />
        <div className="text-muted-foreground flex items-center gap-1 text-[10px] md:hidden">
          {row.original.payment_method === "qris" ? (
            row.original.receipt_url ? (
              <Popover>
                <PopoverTrigger asChild>
                  <div
                    className={`flex cursor-pointer items-center gap-1 ${row.original.receipt_url && "animate-pulse"}`}
                  >
                    <QrCode size={13} /> QRIS
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] rounded-md border bg-white p-2 shadow-lg">
                  <Image
                    src={row.original.receipt_url}
                    alt="Receipt"
                    width={280}
                    height={400}
                    className="object-contain"
                  />
                </PopoverContent>
              </Popover>
            ) : (
              <>
                <QrCode size={13} /> QRIS
              </>
            )
          ) : (
            <>
              <Banknote size={13} /> Cash
            </>
          )}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "payment_method",
    header: () => <span className="hidden lg:table-cell">Metode</span>,
    cell: ({ row }) => (
      <div className="hidden items-center gap-1 text-sm capitalize lg:flex">
        {row.original.payment_method === "qris" ? (
          row.original.receipt_url ? (
            <Popover>
              <PopoverTrigger asChild>
                <div
                  className={`flex cursor-pointer items-center gap-1 ${row.original.receipt_url && "animate-pulse"}`}
                >
                  <QrCode size={13} /> QRIS
                </div>
              </PopoverTrigger>
              <PopoverContent className="w-[300px] rounded-md border bg-white p-2 shadow-lg">
                <Image
                  src={row.original.receipt_url}
                  alt="Receipt"
                  width={280}
                  height={400}
                  className="object-contain"
                />
              </PopoverContent>
            </Popover>
          ) : (
            <>
              <QrCode size={13} /> QRIS
            </>
          )
        ) : (
          <>
            <Banknote size={13} /> Cash
          </>
        )}
      </div>
    ),
  },
  {
    accessorKey: "total_price",
    header: "Total",
    cell: ({ row }) => (
      <span className="text-sm font-bold md:text-base">
        {formatIDR(row.original.total_price)}
      </span>
    ),
  },
];
