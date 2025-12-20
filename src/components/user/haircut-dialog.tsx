"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  BookCheck,
  Loader2,
  Banknote,
  QrCode,
  AlertCircle,
} from "lucide-react"; // Tambah Icon
import Image from "next/image";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Calendar24 } from "../ui/calendar24";
import { Separator } from "@/components/ui/separator";
import { api } from "@/lib/axios-instance";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

type Haircut = {
  id: string | number;
  name: string;
  description: string;
  image_url: string;
};

const HaircutDialog = ({ id, name, image_url, description }: Haircut) => {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string>("10:00");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [isKeramas, setIsKeramas] = useState<string>("false");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleReservation = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!paymentMethod || !date || !time) {
      setErrorMessage("Harap lengkapi semua bidang sebelum melanjutkan.");
      setIsLoading(false);
      return;
    }

    const finalDateTime = new Date(date);
    const [hours, minutes] = time.split(":");
    finalDateTime.setHours(parseInt(hours), parseInt(minutes));

    const payload = {
      haircut_id: id,
      reservation_time: finalDateTime.toISOString(),
      payment_method: paymentMethod,
      payment_status: paymentMethod === "cash" ? "pending" : "paid",
      hairwash: isKeramas === "true",
      total_price: isKeramas === "true" ? 50000 : 35000,
    };

    try {
      const res = await api.post("/haircut-transactions", payload);
      if (res.status === 201) {
        toast.success(
          `Sukses! Booking untuk ${finalDateTime.toLocaleString("id-ID")}`,
        );
        setIsOpen(false);
        setDate(undefined);
        setPaymentMethod("");
        setIsKeramas("false");
      }
    } catch {
      toast.error("Gagal membuat reservasi. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">
          <BookCheck className="mr-2 h-4 w-4" /> Pilih
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        <form id="reservation-form" onSubmit={handleReservation}>
          <DialogHeader>
            <DialogTitle className="text-primary text-4xl">
              Reservasi
            </DialogTitle>
            <DialogDescription>
              Lengkapi detail di bawah untuk booking.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 gap-6 py-4 md:grid-cols-2">
            <div>
              <div className="bg-muted relative aspect-square w-full overflow-hidden rounded-xl border shadow-sm">
                <Image
                  src={image_url}
                  alt={name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="mt-4 text-2xl font-bold">{name}</h2>
                <Separator className="my-2" />
                <p className="text-muted-foreground text-sm">{description}</p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              {errorMessage && (
                <Alert
                  variant="destructive"
                  className="animate-in fade-in slide-in-from-top-1 mb-6"
                >
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Gagal Booking</AlertTitle>
                  <AlertDescription>{errorMessage}</AlertDescription>
                </Alert>
              )}
              <FieldGroup className="gap-5">
                <Field>
                  <div className="rounded-lg border p-3">
                    <Calendar24
                      date={date}
                      setDate={setDate}
                      time={time}
                      setTime={setTime}
                    />
                  </div>
                </Field>
                <Field>
                  <FieldLabel className="mb-2 block text-sm font-medium">
                    Metode Pembayaran
                  </FieldLabel>
                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={setPaymentMethod}
                    className="grid grid-cols-2 gap-3"
                  >
                    <Label
                      htmlFor="dialog-pay-cash"
                      className={`hover:bg-accent flex cursor-pointer items-center justify-between rounded-md border p-3 transition-all ${
                        paymentMethod === "cash"
                          ? "border-primary bg-primary/5 ring-primary ring-1"
                          : "bg-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="cash" id="dialog-pay-cash" />
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">Cash</span>
                          <span className="text-muted-foreground text-xs">
                            Bayar di kasir
                          </span>
                        </div>
                      </div>
                      <Banknote className="text-muted-foreground h-5 w-5" />
                    </Label>
                    <Label
                      htmlFor="dialog-pay-qris"
                      className={`hover:bg-accent flex cursor-pointer items-center justify-between rounded-md border p-3 transition-all ${
                        paymentMethod === "qris"
                          ? "border-primary bg-primary/5 ring-primary ring-1"
                          : "bg-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="qris" id="dialog-pay-qris" />
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">QRIS</span>
                          <span className="text-muted-foreground text-xs">
                            Scan barcode
                          </span>
                        </div>
                      </div>
                      <QrCode className="text-muted-foreground h-5 w-5" />
                    </Label>
                  </RadioGroup>
                </Field>
                <Field>
                  <FieldLabel className="mb-2 block text-sm font-medium">
                    Add-ons
                  </FieldLabel>
                  <RadioGroup
                    value={isKeramas}
                    onValueChange={setIsKeramas}
                    className="grid grid-cols-1 gap-3"
                  >
                    <Label
                      htmlFor="dialog-r1"
                      className={`hover:bg-accent flex cursor-pointer items-center justify-between rounded-md border p-3 transition-colors ${
                        isKeramas === "false"
                          ? "border-primary bg-accent/50"
                          : ""
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <RadioGroupItem value="false" id="dialog-r1" />
                        <span className="text-sm">Potong Saja</span>
                      </span>
                      <span className="text-sm font-medium">Rp35.000</span>
                    </Label>

                    <Label
                      htmlFor="dialog-r2"
                      className={`hover:bg-accent flex cursor-pointer items-center justify-between rounded-md border p-3 transition-colors ${
                        isKeramas === "true"
                          ? "border-primary bg-accent/50"
                          : ""
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <RadioGroupItem value="true" id="dialog-r2" />
                        <span className="text-sm">Potong + Keramas</span>
                      </span>
                      <span className="text-sm font-medium">Rp50.000</span>
                    </Label>
                  </RadioGroup>
                </Field>
                <div className="bg-muted/40 flex items-center justify-between rounded-lg p-4">
                  <span className="text-muted-foreground text-sm font-medium">
                    Total Estimasi
                  </span>
                  <span className="text-primary text-xl font-bold">
                    {isKeramas === "true" ? "Rp50.000" : "Rp35.000"}
                  </span>
                </div>
              </FieldGroup>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={isLoading}>
                Batal
              </Button>
            </DialogClose>
            <Button form="reservation-form" type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Memproses...
                </>
              ) : (
                "Konfirmasi Booking"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default HaircutDialog;
