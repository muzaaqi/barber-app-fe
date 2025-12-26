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
  Copy,
  MapPin,
  FileImage,
  UploadCloud,
  X,
  QrCode,
  Clock,
} from "lucide-react";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import Image from "next/image";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { PaymentQRIS } from "./payment-qris";
import { cn } from "@/lib/utils";
import { jwtBergasAPI } from "@/lib/axios-instance";
import { Spinner } from "../ui/spinner";

interface ProductTransactionDetailProps {
  data: {
    id: string;
    created_at: string;
    updated_at: string;
    payment_status: "unpaid" | "received" | "paid";
    payment_method: string;
    total_price: number;
    qris_payload?: string;
    expedition_service: string;
    expedition_status:
      | "pending"
      | "processed"
      | "shipped"
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
}

export const ProductTransactionDetail = ({
  data,
}: ProductTransactionDetailProps) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} berhasil disalin`);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 1 * 1024 * 1024) {
        toast.error("Ukuran file maksimal 5MB");
        return;
      }
      setProofFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleRemoveFile = () => {
    setProofFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!proofFile) return toast.error("Mohon upload bukti pembayaran.");

    try {
      setIsUpdating(true);
      const res = await jwtBergasAPI.post(
        `/product-transactions/receipt/${data.id}`,
        { receipt: proofFile },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      if (res.status !== 200) throw new Error("Failed to upload payment proof");
      toast.success(
        "Bukti pembayaran berhasil diunggah! Menunggu verifikasi admin.",
      );
    } catch {
      toast.error("Gagal mengunggah bukti pembayaran. Silakan coba lagi.");
    } finally {
      setIsUpdating(false);
    }
  };
  const isPendingPayment = data.payment_status === "unpaid";

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 mx-auto w-full max-w-5xl pb-10 duration-700">
      <div className="bg-card mb-6 flex flex-col gap-4 rounded-xl border p-6 shadow-sm md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <div className="text-muted-foreground flex items-center gap-2 text-sm">
            <span>No. Invoice</span>
            <span className="text-foreground font-mono font-medium">
              #{data.id.substring(0, 8)}
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
              <CardTitle className="flex items-center gap-2 text-sm font-medium">
                <Truck className="h-4 w-4" /> Informasi Pengiriman
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
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
                    Alamat Tujuan
                  </p>
                  <div className="flex gap-1 sm:justify-end">
                    <MapPin className="text-primary mt-0.5 h-3 w-3" />
                    <p className="max-w-[200px] truncate text-sm font-medium">
                      {data.shipping_address || "-"}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="pt-0">
            <CardHeader className="bg-muted/20 border-b pt-7 pb-3">
              <CardTitle className="flex items-center gap-2 text-sm font-medium">
                <Package className="h-4 w-4" /> Rincian Barang
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
          {isPendingPayment && data.qris_payload ? (
            <Card className="border-primary/20 bg-muted/10 overflow-hidden border-2 py-0">
              <div className="bg-primary/10 text-primary border-primary/10 border-b p-3 text-center text-xs font-semibold tracking-wider uppercase">
                Selesaikan Pembayaran
              </div>
              <CardContent className="p-6">
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col items-center gap-2">
                    <PaymentQRIS
                      qrString={data.qris_payload}
                      fileName={`QRIS-${data.id.substring(0, 8)}`}
                    />
                    <div className="text-center">
                      <p className="text-muted-foreground text-xs">
                        Total Tagihan
                      </p>
                      <p className="text-primary text-2xl font-bold">
                        {formatIDR(data.total_price)}
                      </p>
                    </div>
                  </div>
                  <Separator className="bg-primary/20" />
                  <div>
                    <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold">
                      <FileImage className="text-primary h-4 w-4" />
                      Upload Bukti Transfer
                    </h4>
                    <form onSubmit={handlePaymentSubmit} className="space-y-4">
                      <div
                        className={`relative flex h-60 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-all ${
                          previewUrl
                            ? "border-primary/50 bg-primary/5"
                            : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50"
                        }`}
                        onClick={() =>
                          !previewUrl && fileInputRef.current?.click()
                        }
                      >
                        {previewUrl ? (
                          <div className="group relative h-full w-full p-2">
                            <Image
                              src={previewUrl}
                              alt="Preview"
                              fill
                              className="rounded-md object-contain"
                            />
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveFile();
                              }}
                              className="bg-destructive absolute top-1 right-1 rounded-full p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center justify-center text-center">
                            <UploadCloud className="text-muted-foreground mb-1 h-6 w-6" />
                            <p className="text-muted-foreground text-xs">
                              Upload bukti di sini
                            </p>
                          </div>
                        )}
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleFileChange}
                        />
                      </div>
                      <Button
                        type="submit"
                        disabled={isUpdating || !proofFile}
                        className="w-full gap-2 shadow-sm"
                      >
                        {isUpdating ? (
                          <Spinner />
                        ) : (
                          <CheckCircle className="h-4 w-4" />
                        )}
                        Konfirmasi Pembayaran
                      </Button>
                    </form>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-primary/20 bg-muted/10 overflow-hidden border-2 py-0">
              <CardHeader className="bg-muted/20 border-b pb-3">
                <CardTitle className="text-sm font-medium">
                  Info Pembayaran
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Metode</span>
                  <div className="flex items-center gap-2">
                    <QrCode className="text-muted-foreground h-4 w-4" />
                    <span className="font-medium uppercase">QRIS</span>
                  </div>
                </div>
                {data.payment_status === "received" && (
                  <div className="flex items-center gap-2 rounded-md border border-yellow-100 bg-yellow-50 p-3 text-xs text-yellow-700">
                    <Clock className="h-4 w-4" /> Lunas:{" "}
                    {format(new Date(data.updated_at), "d MMM yyyy")}
                  </div>
                )}
                {data.payment_status === "paid" && (
                  <div className="flex items-center gap-2 rounded-md border border-green-100 bg-green-50 p-3 text-xs text-green-700">
                    <CheckCircle className="h-4 w-4" /> Lunas:{" "}
                    {format(new Date(data.updated_at), "d MMM yyyy")}
                  </div>
                )}
              </CardContent>
            </Card>
          )}
          <Card className="py-0">
            <CardHeader className="bg-muted/20 border-b pt-6 pb-3">
              <CardTitle className="text-sm font-medium">
                Rincian Biaya
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 p-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Harga</span>
                <span>
                  {formatIDR(data.total_price - (data.expedition_cost || 0))}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Ongkos Kirim</span>
                <span>{formatIDR(data.expedition_cost || 0)}</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between pt-1">
                <span className="text-base font-bold">Total Bayar</span>
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
    unpaid: "bg-yellow-100 text-yellow-800 border-yellow-200",
    cancelled: "bg-gray-100 text-gray-800 border-gray-200",
  } as Record<string, string>;

  return (
    <Badge
      variant="outline"
      className={`capitalize shadow-none ${styles[status] || ""}`}
    >
      {status === "unpaid" ? "Belum Bayar" : status}
    </Badge>
  );
};

const ExpeditionTimeline = ({ status }: { status: string }) => {
  const steps = [
    { key: "pending", label: "Dipesan" },
    { key: "processed", label: "Diproses" },
    { key: "shipped", label: "Dikirim" },
    { key: "delivered", label: "Sampai" },
  ];

  let activeIndex = 0;
  if (status === "processed") activeIndex = 1;
  if (status === "shipped") activeIndex = 2;
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
