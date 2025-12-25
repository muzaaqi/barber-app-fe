"use client";

import { formatIDR } from "@/features/formatter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CheckCircle,
  Package,
  Truck,
  Loader2,
  Copy,
  MapPin,
} from "lucide-react";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { PaymentQRIS } from "./payment-qris";
import { cn } from "@/lib/utils";

interface ProductTransactionDetailProps {
  data: {
    id: string;
    created_at: string;
    updated_at: string;
    payment_status: "unpaid" | "pending" | "paid" | "cancelled";
    payment_method: "cash" | "qris" | "transfer";
    total_price: number;
    qris_payload?: string;
    expedition_service: string;
    expedition_status:
      | "pending"
      | "processed"
      | "sent"
      | "delivered"
      | "cancelled";
    shipping_address?: string;
    expedition_cost?: number;
    items: Array<{
      id: string;
      product_id: string;
      product_name: string;
      product_image: string;
      price_at_purchase: number;
      quantity: number;
      subtotal: number;
    }>;
  };
  onConfirmPayment?: (id: string) => Promise<void>;
}

export const ProductTransactionDetail = ({
  data,
  onConfirmPayment,
}: ProductTransactionDetailProps) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} berhasil disalin`);
  };

  const handlePaymentClick = async () => {
    if (!onConfirmPayment) return toast.info("Fitur belum tersedia.");
    try {
      setIsUpdating(true);
      await onConfirmPayment(data.id);
      toast.success("Pembayaran berhasil dikonfirmasi!");
    } catch {
      toast.error("Gagal update status.");
    } finally {
      setIsUpdating(false);
    }
  };

  const isPendingQRIS =
    data.payment_method === "qris" &&
    (data.payment_status === "pending" || data.payment_status === "unpaid");

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 mx-auto w-full max-w-4xl pb-10 duration-700">
      <div className="bg-card mb-6 flex flex-col gap-4 rounded-xl border p-6 shadow-sm md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <div className="text-muted-foreground flex items-center gap-2 text-sm">
            <span>No. Invoice</span>
            <span className="text-foreground font-mono font-medium">
              {data.id}
            </span>
            <button onClick={() => copyToClipboard(data.id, "No. Invoice")}>
              <Copy className="hover:text-primary h-3 w-3" />
            </button>
          </div>
          <p className="text-muted-foreground text-xs">
            Dibuat:{" "}
            {format(new Date(data.created_at), "d MMM yyyy, HH:mm", {
              locale: idLocale,
            })}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <StatusBadge status={data.payment_status} />
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card className="pt-0">
            <CardHeader className="bg-muted/20 border-b pt-7 pb-3">
              <CardTitle className="flex items-center gap-2 text-xl font-medium">
                <Truck className="h-4 w-4" /> Status Pengiriman
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ExpeditionTimeline status={data.expedition_status} />
              <div className="bg-muted/30 mt-6 flex flex-col gap-4 rounded-lg p-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-1">
                  <p className="text-muted-foreground text-xs font-medium">
                    Kurir
                  </p>
                  <p className="flex items-center gap-2 font-semibold uppercase">
                    {data.expedition_service}
                    <Badge
                      variant="outline"
                      className="h-5 text-[10px] font-normal"
                    >
                      Reguler
                    </Badge>
                  </p>
                </div>
                <div className="space-y-1 sm:text-right">
                  <p className="text-muted-foreground text-xs font-medium">
                    No. Resi
                  </p>
                  <p className="font-mono text-sm">Waiting...</p>{" "}
                </div>
              </div>
              {data.shipping_address && (
                <div className="mt-4 border-t border-dashed pt-4">
                  <p className="text-muted-foreground mb-1 text-xs font-medium">
                    Alamat Pengiriman
                  </p>
                  <div className="flex gap-2">
                    <MapPin className="text-primary mt-0.5 h-4 w-4 shrink-0" />
                    <p className="text-sm leading-snug">
                      {data.shipping_address}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          <Card className="pt-0">
            <CardHeader className="bg-muted/20 border-b pt-7 pb-3">
              <CardTitle className="flex items-center gap-2 text-xl font-medium">
                <Package className="h-4 w-4" /> Rincian Produk
              </CardTitle>
            </CardHeader>
            <CardContent className="divide-y">
              {data.items.map((item) => (
                <div key={item.id} className="flex gap-4 py-4 last:pb-0">
                  <div className="bg-muted relative h-16 w-16 shrink-0 overflow-hidden rounded-md border">
                    <Image
                      src={item.product_image}
                      alt={item.product_name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="line-clamp-2 text-sm font-medium">
                      {item.product_name}
                    </h4>
                    <p className="text-muted-foreground mt-1 text-xs">
                      {item.quantity} barang x{" "}
                      {formatIDR(item.price_at_purchase)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">Total Harga</p>
                    <p className="text-primary text-sm font-bold">
                      {formatIDR(item.subtotal)}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          {isPendingQRIS && data.qris_payload ? (
            <Card className="border-primary overflow-hidden border-2">
              <div className="bg-primary/10 text-primary border-primary/20 border-b p-3 text-center text-xs font-medium">
                Selesaikan Pembayaran Dalam 24 Jam
              </div>
              <CardContent className="flex flex-col items-center gap-4 p-6">
                <PaymentQRIS
                  qrString={data.qris_payload}
                  fileName={`QRIS-${data.id}`}
                />
                <div className="w-full space-y-3">
                  <p className="text-muted-foreground text-center text-xs">
                    Scan QRIS di atas atau download untuk membayar.
                  </p>
                  <Button
                    className="w-full gap-2"
                    onClick={handlePaymentClick}
                    disabled={isUpdating}
                  >
                    {isUpdating ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <CheckCircle className="h-4 w-4" />
                    )}
                    Saya Sudah Bayar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="pt-0">
              <CardHeader className="bg-muted/20 border-b pt-7 pb-3">
                <CardTitle className="text-xl font-medium">
                  Info Pembayaran
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Metode</span>
                  <span className="font-medium uppercase">
                    {data.payment_method}
                  </span>
                </div>
                {data.payment_status === "paid" && (
                  <div className="border-primary bg-popover text-primary flex items-center gap-2 rounded-md border p-3 text-xs">
                    <CheckCircle className="h-4 w-4" /> Lunas:{" "}
                    {format(new Date(data.updated_at), "d MMM yyyy")}
                  </div>
                )}
              </CardContent>
            </Card>
          )}
          <Card className="pt-0">
            <CardHeader className="bg-muted/20 border-b pt-7 pb-3">
              <CardTitle className="text-xl font-medium">
                Rincian Tagihan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  Total Harga ({data.items.length} barang)
                </span>
                <span>{formatIDR(data.total_price - (data.expedition_cost || 0))}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  Total Ongkos Kirim
                </span>
                <span>
                  {formatIDR(data.expedition_cost || 0)}
                </span>
              </div>
              <Separator />
              <div className="flex items-center justify-between pt-1">
                <span className="text-base font-bold">Total Belanja</span>
                <span className="text-primary text-lg font-bold">
                  {formatIDR(data.total_price)}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const StatusBadge = ({ status }: { status: string }) => {
  const styles = {
    paid: "bg-green-100 text-green-800 border-green-200",
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    unpaid: "bg-red-100 text-red-800 border-red-200",
    cancelled: "bg-gray-100 text-gray-800 border-gray-200",
  } as Record<string, string>;

  return (
    <Badge variant="outline" className={`capitalize ${styles[status] || ""}`}>
      {status === "unpaid" ? "Belum Bayar" : status}
    </Badge>
  );
};

const ExpeditionTimeline = ({ status }: { status: string }) => {
  const steps = [
    { key: "pending", label: "Dipesan" },
    { key: "processed", label: "Diproses" },
    { key: "sent", label: "Dikirim" },
    { key: "delivered", label: "Sampai" },
  ];
  let activeIndex = 0;
  if (status === "processed") activeIndex = 1;
  if (status === "sent") activeIndex = 2;
  if (status === "delivered" || status === "completed") activeIndex = 3;

  return (
    <div className="relative flex justify-between">
      <div className="bg-muted absolute top-2.5 left-0 -z-10 h-0.5 w-full" />
      <div
        className="bg-primary absolute top-2.5 left-0 -z-10 h-0.5 transition-all duration-500"
        style={{ width: `${(activeIndex / (steps.length - 1)) * 100}%` }}
      />
      {steps.map((step, idx) => {
        const isActive = idx <= activeIndex;
        const isCurrent = idx === activeIndex;
        return (
          <div
            key={step.key}
            className="bg-card flex flex-col items-center gap-2 px-2"
          >
            <div
              className={cn(
                "flex h-6 w-6 items-center justify-center rounded-full border-2 text-[10px] font-bold transition-colors",
                isActive
                  ? "bg-primary border-primary text-primary-foreground"
                  : "bg-background border-muted text-muted-foreground",
              )}
            >
              {isActive ? <CheckCircle className="h-3 w-3" /> : idx + 1}
            </div>
            <span
              className={cn(
                "text-xs font-medium",
                isCurrent ? "text-primary" : "text-muted-foreground",
              )}
            >
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};
