"use client";

import { useState, useTransition } from "react";
import QRCode from "react-qr-code";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Spinner } from "../ui/spinner";

type Props = {
  id: string;
  currentStatus: string;
  options: string[];
  qrTriggerStatus?: string;
  verificationPath?: string;
  onUpdate: (
    id: string,
    status: string,
  ) => Promise<{ success: boolean; message: string }>;
  colorMap?: Record<
    string,
    "default" | "secondary" | "destructive" | "outline"
  >;
};

export const EditableStatus = ({
  id,
  currentStatus,
  options,
  onUpdate,
  colorMap,
  qrTriggerStatus = "completed",
}: Props) => {
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const [showQr, setShowQr] = useState(false);

  const getBadgeVariant = (status: string) => {
    if (colorMap && colorMap[status]) return colorMap[status];

    if (
      [
        "paid",
        "success",
        "completed",
        "shipped",
        "delivered",
        "confirmed",
      ].includes(status)
    )
      return "default";
    if (["cancelled", "failed", "unpaid"].includes(status))
      return "destructive";
    return "secondary";
  };
  const performUpdate = (newStatus: string) => {
    startTransition(async () => {
      const res = await onUpdate(id, newStatus);
      if (res.success) {
        toast.success(res.message);
        setIsOpen(false);
        setShowQr(false);
      } else {
        toast.error(res.message);
      }
    });
  };

  const handleSelect = (newStatus: string) => {
    if (newStatus === currentStatus) return;
    if (newStatus === qrTriggerStatus) {
      setIsOpen(false);
      setShowQr(true);
      return;
    }

    performUpdate(newStatus);
  };


  return (
    <>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <button
            disabled={isPending}
            className="group flex items-center gap-1 focus:outline-none"
          >
            <Badge
              variant={getBadgeVariant(currentStatus)}
              className={cn(
                "flex cursor-pointer items-center gap-1 pr-1 capitalize transition-all hover:opacity-80",
                isPending && "opacity-50",
              )}
            >
              {currentStatus}
              {isPending ? (
                <Spinner className="h-3 w-3" />
              ) : (
                <ChevronDown className="h-3 w-3 opacity-50 group-hover:opacity-100" />
              )}
            </Badge>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {options.map((option) => (
            <DropdownMenuItem
              key={option}
              onClick={() => handleSelect(option)}
              className="cursor-pointer capitalize"
              disabled={isPending}
            >
              {option}
              {option === currentStatus && (
                <span className="text-primary ml-2">✓</span>
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={showQr} onOpenChange={setShowQr}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Verifikasi Penyelesaian</DialogTitle>
            <DialogDescription>
              Minta pelanggan scan QR Code ini untuk menyelesaikan pesanan
              secara otomatis.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center gap-4 py-6">
            <div className="flex w-full justify-center rounded-xl border bg-white p-4 shadow-sm">
              <QRCode
                value={id}
                size={256}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                viewBox={`0 0 256 256`}
              />
            </div>
            <div className="text-center">
              <p className="text-muted-foreground mb-1 text-xs">ID Transaksi</p>
              <code className="bg-muted rounded px-2 py-1 font-mono text-xs">
                {id}
              </code>
            </div>
          </div>

          <DialogFooter className="flex-col gap-2 sm:justify-between sm:gap-0">
            <Button
              variant="secondary"
              onClick={() => setShowQr(false)}
              disabled={isPending}
              className="w-full sm:w-auto"
            >
              Tutup
            </Button>
            <Button
              onClick={() => performUpdate(qrTriggerStatus)}
              disabled={isPending}
              className="w-full sm:w-auto"
            >
              {isPending && <Spinner />}
              Selesaikan Manual
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
