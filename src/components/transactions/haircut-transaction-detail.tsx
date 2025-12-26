"use client";

import { formatIDR } from "@/features/formatter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import {
  CalendarDays,
  CreditCard,
  CheckCircle,
  Scissors,
  Sparkles,
  FileImage,
  UploadCloud,
  X,
  Clock,
  ScanLine,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import Image from "next/image";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { PaymentQRIS } from "./payment-qris";
import { jwtBergasAPI } from "@/lib/axios-instance";
import { Scanner } from "@yudiel/react-qr-scanner";
import { updateHaircutTransactionStatus } from "@/actions/management/haircut-transaction-actions";
import { Spinner } from "../ui/spinner";

interface TransactionDetailProps {
  data: {
    id: string;
    created_at: string;
    updated_at: string;
    haircut_id: string;
    hairwash: boolean;
    payment_method: "cash" | "qris";
    payment_status: "unpaid" | "received" | "paid";
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

export const HaircutTransactionDetail = ({ data }: TransactionDetailProps) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // State Scanner
  const [isScanOpen, setIsScanOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanKey, setScanKey] = useState(0); // Key untuk me-reset scanner

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProofFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleRemoveFile = () => {
    setProofFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handlePaymentClick = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!proofFile) return toast.error("Mohon upload bukti pembayaran.");
    try {
      setIsUpdating(true);
      const res = await jwtBergasAPI.post(
        `/haircut-transactions/receipt/${data.id}`,
        {
          receipt: proofFile,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      if (res.status !== 200) {
        throw new Error("Gagal mengunggah bukti pembayaran.");
      }
      toast.success("Bukti pembayaran berhasil diunggah!");
      window.location.reload();
    } catch {
      toast.error("Gagal mengunggah bukti pembayaran. Silakan coba lagi.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleScanSuccess = async (result: string) => {
    if (result !== data.id) {
      toast.error("QR Code tidak valid! Silakan scan QR yang benar.");
      setTimeout(() => {
        setScanKey((prev) => prev + 1);
      }, 2000);
      return;
    }

    setIsScanning(true);
    toast.info("QR Code terdeteksi, memproses...");

    try {
      const res = await updateHaircutTransactionStatus(
        data.id,
        data.payment_method === "qris" ? "both" : "reservation_status",
        data.payment_method === "qris"
          ? { reservation_status: "completed", payment_status: "paid" }
          : "completed",
      );

      if (res.success) {
        toast.success("Pesanan berhasil diselesaikan!");
        setIsScanOpen(false); // Tutup dialog hanya jika SUKSES
        window.location.reload();
      } else {
        throw new Error("Gagal menyelesaikan pesanan");
      }
    } catch {
      toast.error("Gagal memproses QR Code. Coba lagi.");
      setTimeout(() => setScanKey((prev) => prev + 1), 2000);
    } finally {
      setIsScanning(false);
    }
  };

  const getStatusBadge = (status: string, type: "payment" | "reservation") => {
    if (status === "paid" || status === "completed" || status === "confirmed") {
      return (
        <Badge className="bg-primary hover:bg-primary/80 px-3 py-1 text-sm">
          {type === "payment" ? "Lunas" : "Terkonfirmasi"}
        </Badge>
      );
    }
    if (status === "pending" || status === "received") {
      return (
        <Badge
          variant="secondary"
          className="bg-yellow-100 px-3 py-1 text-sm text-yellow-800 hover:bg-yellow-200"
        >
          {type === "payment" ? "Menunggu Verifikasi" : "Menunggu Konfirmasi"}
        </Badge>
      );
    }
    if (status === "unpaid") {
      return <Badge variant="destructive">Belum Bayar</Badge>;
    }
    return <Badge variant="destructive">{status}</Badge>;
  };

  const isPendingQRIS =
    data.payment_method === "qris" &&
    data.payment_status === "unpaid" &&
    data.qris_payload;
  const canScanToComplete = data.reservation_status === "confirmed";

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
        <div className="flex items-center gap-2">
          {getStatusBadge(data.reservation_status, "reservation")}
          {getStatusBadge(data.payment_status, "payment")}
          {canScanToComplete && (
            <Button
              onClick={() => {
                setIsScanOpen(true);
                setScanKey(0);
              }}
              className="ml-2 gap-2 bg-green-600 hover:bg-green-700"
            >
              <ScanLine className="h-4 w-4" />
              Scan Selesai
            </Button>
          )}
        </div>
      </div>
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-5 xl:col-span-4">
          <Card className="h-fit overflow-hidden border-none py-0 shadow-lg">
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
          <Card>
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
          {isPendingQRIS ? (
            <Card className="border-primary/20 bg-muted/10 overflow-hidden border-2 py-0">
              <div className="bg-primary/10 text-primary border-primary/10 border-b p-3 text-center text-xs font-semibold tracking-wider uppercase">
                Selesaikan Pembayaran
              </div>
              <CardContent className="p-6">
                <div className="grid gap-8 md:grid-cols-2">
                  <div className="flex flex-col items-center gap-4 text-center">
                    <PaymentQRIS
                      qrString={data.qris_payload || ""}
                      fileName={`QRIS-${data.id.substring(0, 8)}`}
                    />
                    <div className="w-full space-y-1">
                      <p className="text-muted-foreground text-xs">
                        Total Tagihan
                      </p>
                      <p className="text-primary text-2xl font-bold">
                        {formatIDR(data.total_price)}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col justify-center">
                    <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold">
                      <FileImage className="text-primary h-4 w-4" />
                      Upload Bukti Transfer
                    </h4>
                    <form onSubmit={handlePaymentClick} className="space-y-4">
                      <div
                        className={`relative flex h-60 w-full flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors ${
                          previewUrl
                            ? "border-primary/50 bg-primary/5"
                            : "border-muted-foreground/25 hover:bg-muted/50"
                        }`}
                      >
                        {previewUrl ? (
                          <div className="relative h-full w-full p-2">
                            <Image
                              src={previewUrl}
                              alt="Preview"
                              fill
                              className="rounded-md object-contain"
                            />
                            <button
                              type="button"
                              onClick={handleRemoveFile}
                              className="bg-destructive hover:bg-destructive/90 absolute top-1 right-1 rounded-full p-1 text-white transition"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </div>
                        ) : (
                          <label className="flex h-full w-full cursor-pointer flex-col items-center justify-center">
                            <UploadCloud className="text-muted-foreground mb-2 h-8 w-8" />
                            <p className="text-muted-foreground text-xs">
                              Klik untuk upload gambar
                            </p>
                            <span className="text-muted-foreground/70 mt-1 text-[10px]">
                              JPG, PNG max 2MB
                            </span>
                            <input
                              ref={fileInputRef}
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleFileChange}
                            />
                          </label>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Button
                          type="submit"
                          disabled={isUpdating || !proofFile}
                          className="w-full gap-2 shadow-md"
                        >
                          {isUpdating ? (
                            <Spinner />
                          ) : (
                            <CheckCircle className="h-4 w-4" />
                          )}
                          Konfirmasi Pembayaran
                        </Button>
                        <p className="text-muted-foreground text-center text-[10px]">
                          Pastikan nominal transfer sesuai dengan total tagihan.
                        </p>
                      </div>
                    </form>
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
                {data.payment_status === "received" && (
                  <>
                    <Separator className="bg-primary/10" />
                    <div className="flex items-center gap-2 rounded-lg border border-yellow-100 bg-yellow-50 p-3 text-sm font-medium text-yellow-700">
                      <Clock className="h-5 w-5" />
                      Pembayaran sedang diverifikasi. Terima kasih!
                    </div>
                  </>
                )}
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
      <Dialog open={isScanOpen} onOpenChange={setIsScanOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Scan QR Code</DialogTitle>
            <DialogDescription>
              Scan QR Code toko untuk menyelesaikan pesanan Anda.
            </DialogDescription>
          </DialogHeader>
          <div className="flex aspect-square items-center justify-center overflow-hidden rounded-lg bg-black p-4">
            {isScanOpen && (
              <Scanner
                key={scanKey}
                onScan={(result) => {
                  if (result && result.length > 0) {
                    handleScanSuccess(result[0].rawValue);
                  }
                }}
                styles={{ container: { width: "100%", height: "100%" } }}
              />
            )}
          </div>
          {isScanning && (
            <div className="text-primary flex animate-pulse items-center justify-center gap-2 text-sm">
              <Spinner />
              Memproses QR Code...
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
