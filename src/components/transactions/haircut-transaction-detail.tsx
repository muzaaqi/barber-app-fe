"use client";

import { formatIDR } from "@/features/formatter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card"; // Import Card
import {
  CalendarDays,
  CreditCard,
  CheckCircle,
  Scissors,
  Sparkles,
  Loader2,
} from "lucide-react";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { PaymentQRIS } from "./payment-qris";

interface TransactionDetailProps {
  data: {
    id: string;
    created_at: string;
    updated_at: string;
    haircut_id: string;
    hairwash: boolean;
    payment_method: "cash" | "qris";
    payment_status: "pending" | "paid";
    reservation_status: "pending" | "confirmed" | "completed";
    reservation_time: string;
    total_price: number;
    qris_payload?: string;
    haircut: {
      name: string;
      image_url: string;
    };
  };
  onConfirmPayment?: (id: string) => Promise<void>;
}

export const HaircutTransactionDetail = ({
  data,
}: TransactionDetailProps) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const handlePaymentClick = async () => {
      toast.info("Fitur konfirmasi pembayaran belum dihubungkan.");
    try {
      setIsUpdating(true);
      toast.success("Pembayaran berhasil dikonfirmasi!");
    } catch {
      toast.error("Gagal mengupdate status pembayaran.");
    } finally {
      setIsUpdating(false);
    }
  };
  const getStatusBadge = (status: string, type: "payment" | "reservation") => {
    if (status === "paid" || status === "completed" || status === "confirmed") {
      return (
        <Badge className="bg-primary px-3 py-1 text-sm hover:bg-primary/80">
          {type === "payment" ? "Lunas" : "Terkonfirmasi"}
        </Badge>
      );
    }
    if (status === "pending") {
      return (
        <Badge
          variant="secondary"
          className="bg-yellow-100 px-3 py-1 text-sm text-yellow-800 hover:bg-yellow-200"
        >
          {type === "payment" ? "Menunggu Bayar" : "Menunggu Konfirmasi"}
        </Badge>
      );
    }
    return <Badge variant="destructive">{status}</Badge>;
  };

  const isPendingQRIS =
    data.payment_method === "qris" && data.payment_status === "pending";
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 mx-auto w-full max-w-5xl duration-700">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-primary text-3xl font-bold tracking-tight">
            Detail Reservasi
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            ID Pesanan: <span className="font-mono">{data.id}</span>
          </p>
        </div>
        <div className="flex gap-2">
          {getStatusBadge(data.reservation_status, "reservation")}
          {getStatusBadge(data.payment_status, "payment")}
        </div>
      </div>
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-5 xl:col-span-4">
          <Card className="h-fit overflow-hidden border-none shadow-lg py-0">
            <CardContent className="relative aspect-3/4 w-full p-0">
              <Image
                src={data.haircut.image_url}
                alt={data.haircut.name}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <p className="text-sm font-light opacity-90">Model Pilihan</p>
                <h3 className="text-2xl font-bold">{data.haircut.name}</h3>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="flex flex-col gap-6 lg:col-span-7 xl:col-span-8">
          <Card >
            <CardContent className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-1">
                <h4 className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
                  <CalendarDays className="text-primary h-4 w-4" />
                  Tanggal & Waktu
                </h4>
                <p className="text-lg font-semibold">
                  {format(
                    new Date(data.reservation_time),
                    "EEEE, d MMMM yyyy",
                    {
                      locale: idLocale,
                    },
                  )}
                </p>
                <p className="text-muted-foreground text-sm">
                  Pukul{" "}
                  {format(new Date(data.reservation_time), "HH:mm", {
                    locale: idLocale,
                  })}{" "}
                  WIB
                </p>
              </div>
              <div className="space-y-1">
                <h4 className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
                  <Scissors className="text-primary h-4 w-4" />
                  Detail Layanan
                </h4>
                <p className="text-lg font-semibold">Potong Rambut</p>
                {data.hairwash && (
                  <Badge
                    variant="outline"
                    className="mt-1 gap-1 border-blue-200 bg-blue-50 text-blue-700"
                  >
                    <Sparkles className="h-3 w-3" />
                    Termasuk Cuci Rambut
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
          {isPendingQRIS && data.qris_payload ? (
            <Card className="border-primary/20 bg-muted/10 border-2">
              <CardContent>
                <div className="flex flex-col items-center gap-8 md:flex-row md:items-start">
                  <div className="w-full max-w-[250px] shrink-0">
                    <PaymentQRIS
                      qrString={data.qris_payload}
                      fileName={`QRIS-${data.id.substring(0, 8)}`}
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between space-y-6 md:text-right">
                    <div>
                      <h3 className="text-foreground text-lg font-bold">
                        Menunggu Pembayaran
                      </h3>
                      <p className="text-muted-foreground mt-1 text-sm">
                        Silakan scan QRIS tersebut. Nominal akan otomatis
                        muncul.
                      </p>
                    </div>
                    <div className="bg-background rounded-lg border border-dashed p-4 shadow-sm">
                      <p className="text-muted-foreground mb-1 text-xs">
                        Total Tagihan
                      </p>
                      <p className="text-primary text-3xl font-bold">
                        {formatIDR(data.total_price)}
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 pt-2">
                      <Button
                        size="lg"
                        onClick={handlePaymentClick}
                        disabled={isUpdating}
                        className="shadow-primary/20 w-full gap-2 shadow-lg md:w-auto md:self-end"
                      >
                        {isUpdating ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <CheckCircle className="h-4 w-4" />
                        )}
                        Konfirmasi Pembayaran
                      </Button>
                      <p className="text-muted-foreground text-xs">
                        Klik tombol di atas jika sudah berhasil transfer.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-primary/5 border-primary/1 py-0">
              <CardContent className="flex flex-col gap-4 p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
                      <CreditCard className="h-4 w-4" />
                      Metode Pembayaran
                    </h4>
                    <p className="text-xl font-bold uppercase">
                      {data.payment_method}
                    </p>
                  </div>
                  <div className="text-right">
                    <h4 className="text-muted-foreground text-sm font-medium">
                      Total Tagihan
                    </h4>
                    <p className="text-primary text-3xl font-bold">
                      {formatIDR(data.total_price)}
                    </p>
                  </div>
                </div>
                {data.payment_status === "paid" && (
                  <>
                    <Separator className="bg-primary/10" />
                    <div className="flex items-center gap-2 rounded-lg border border-green-100 bg-green-50 p-3 text-sm font-medium text-green-700">
                      <CheckCircle className="h-5 w-5" />
                      Pembayaran Lunas. Terima kasih!
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
