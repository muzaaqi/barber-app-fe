"use client";

import Image from "next/image";
import { notFound, useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar24 } from "@/components/ui/calendar24";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Banknote, AlertCircle, QrCode } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "./ui/spinner";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./ui/card";
import { toast } from "sonner";
import { getHaircutById } from "@/actions/management/haircut-actions";
import { format } from "date-fns";
import { addNewHaircutTransaction } from "@/actions/management/haircut-transaction-actions";

type Haircut = {
  id: string;
  name: string;
  description: string;
  image_url: string;
  price?: number;
};

const HaircutDetail = () => {
  const { haircutId }: { haircutId: string } = useParams();
  const router = useRouter();

  const [haircut, setHaircut] = useState<Haircut | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string>("10:00");
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [isKeramas, setIsKeramas] = useState<string>("false");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    const fetchHaircutDetail = async () => {
      try {
        const { data } = await getHaircutById(haircutId);
        setHaircut(data);
        if (!data) {
          toast.error("Layanan tidak ditemukan.");
          router.push("/services?options=haircuts");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (haircutId) fetchHaircutDetail();
  }, [haircutId, router]);

  const handleReservation = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!paymentMethod || !date || !time) {
      setErrorMessage("Mohon lengkapi tanggal, jam, dan metode pembayaran.");
      return;
    }

    setIsSubmitting(true);

    try {
      const finalDateTime = new Date(date);
      const [hours, minutes] = time.split(":");
      finalDateTime.setHours(parseInt(hours), parseInt(minutes));

      const payload = {
        haircut_id: haircutId,
        reservation_time: format(finalDateTime, "yyyy-MM-dd HH:mm:ss"),
        payment_method: paymentMethod,
        payment_status: paymentMethod === "cash" ? "pending" : "paid",
        hairwash: isKeramas === "true",
        total_price: isKeramas === "true" ? 20000 : 15000,
      };

      const res = await addNewHaircutTransaction(payload);
      if (res.success) {
        toast.success(
          `Sukses! Booking untuk ${finalDateTime.toLocaleString("id-ID")}`,
        );
        setDate(undefined);
        setPaymentMethod("");
        setIsKeramas("false");
      }
      if (!res.success) {
        toast.error(
          res.message || "Gagal membuat reservasi. Silakan coba lagi.",
        );
      }
    } catch {
      setErrorMessage("Gagal membuat reservasi. Silakan coba lagi.");
      toast.error("Gagal membuat reservasi. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-background min-h-screen pt-6 pb-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <Skeleton className="mb-6 h-9 w-24" />
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
            <div className="space-y-6 lg:col-span-2">
              <Skeleton className="aspect-4/3 w-full rounded-2xl" />
              <div className="space-y-3">
                <Skeleton className="h-10 w-3/4 md:w-1/2" />
                <div className="space-y-2 pt-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              </div>
              <Skeleton className="my-6 h-px w-full" />
              <div className="space-y-2">
                <Skeleton className="mb-3 h-5 w-40" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="bg-card sticky top-6 space-y-6 rounded-xl border p-6">
                <div className="space-y-2">
                  <Skeleton className="h-6 w-1/2" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
                <div className="space-y-5">
                  <Skeleton className="h-[120px] w-full rounded-lg" />
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-1/3" />
                    <Skeleton className="h-14 w-full rounded-md" />
                    <Skeleton className="h-14 w-full rounded-md" />
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                  </div>
                </div>
                <Skeleton className="h-px w-full" />
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <Skeleton className="h-5 w-20" />
                    <Skeleton className="h-6 w-24" />
                  </div>
                  <Skeleton className="h-12 w-full rounded-md" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!haircut) {
    notFound();
  }

  return (
    <div className="bg-background min-h-screen pt-6 pb-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Button
          variant="ghost"
          className="mb-6 pl-0 transition-all hover:pl-2"
          onClick={() => router.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Kembali
        </Button>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
          <div className="space-y-6 lg:col-span-2">
            <div className="bg-muted relative w-full overflow-hidden rounded-xl border shadow-sm">
              <Image
                src={haircut.image_url}
                alt={haircut.name}
                width={800}
                height={600}
                className="aspect-4/3 h-auto w-full object-cover"
                priority
              />
            </div>

            <div className="space-y-2">
              <h1 className="text-foreground text-3xl font-bold tracking-tight md:text-4xl">
                {haircut.name}
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {haircut.description}
              </p>
            </div>

            <Separator className="my-6" />

            <div className="prose text-muted-foreground text-sm">
              <h3 className="text-foreground mb-2 font-semibold">
                Informasi Layanan
              </h3>
              <ul className="list-disc space-y-1 pl-5">
                <li>Durasi pengerjaan estimasi 45 - 60 menit.</li>
                <li>Sudah termasuk styling pomade (opsional).</li>
                <li>Konsultasi gaya rambut gratis dengan barber.</li>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-6 h-fit">
              <form onSubmit={handleReservation}>
                <Card className="border-border shadow-sm">
                  <CardHeader>
                    <CardTitle>Buat Reservasi</CardTitle>
                    <CardDescription>
                      Pilih jadwal kedatangan Anda.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
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
                    <FieldGroup>
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
                        <FieldLabel className="mb-3 block text-sm font-medium">
                          Metode Pembayaran
                        </FieldLabel>
                        <RadioGroup
                          value={paymentMethod}
                          onValueChange={setPaymentMethod}
                          className="grid grid-cols-1 gap-3"
                        >
                          <Label
                            htmlFor="pay-cash"
                            className={`hover:bg-accent flex cursor-pointer items-center justify-between rounded-md border p-3 transition-all ${
                              paymentMethod === "cash"
                                ? "border-primary bg-primary/5 ring-primary ring-1"
                                : "bg-transparent"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <RadioGroupItem value="cash" id="pay-cash" />
                              <div className="flex flex-col">
                                <span className="text-sm font-medium">
                                  Cash
                                </span>
                                <span className="text-muted-foreground text-xs">
                                  Bayar di kasir
                                </span>
                              </div>
                            </div>
                            <Banknote className="text-muted-foreground h-5 w-5" />
                          </Label>
                          <Label
                            htmlFor="pay-qris"
                            className={`hover:bg-accent flex cursor-pointer items-center justify-between rounded-md border p-3 transition-all ${
                              paymentMethod === "qris"
                                ? "border-primary bg-primary/5 ring-primary ring-1"
                                : "bg-transparent"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <RadioGroupItem value="qris" id="pay-qris" />
                              <div className="flex flex-col">
                                <span className="text-sm font-medium">
                                  QRIS
                                </span>
                                <span className="text-muted-foreground text-xs">
                                  Scan barcode / E-wallet
                                </span>
                              </div>
                            </div>
                            <QrCode className="text-muted-foreground h-5 w-5" />
                          </Label>
                        </RadioGroup>
                      </Field>

                      <Field>
                        <FieldLabel className="mb-3 block text-sm font-medium">
                          Layanan Tambahan
                        </FieldLabel>
                        <RadioGroup
                          value={isKeramas}
                          onValueChange={setIsKeramas}
                          className="grid grid-cols-1 gap-3"
                        >
                          <Label
                            htmlFor="r1"
                            className={`hover:bg-accent flex cursor-pointer items-center justify-between rounded-md border p-3 transition-colors ${
                              isKeramas === "false"
                                ? "border-primary bg-accent/50"
                                : ""
                            }`}
                          >
                            <span className="flex items-center gap-2">
                              <RadioGroupItem value="false" id="r1" />
                              <span>Potong Saja</span>
                            </span>
                            <span className="text-sm font-medium">
                              Rp15.000
                            </span>
                          </Label>

                          <Label
                            htmlFor="r2"
                            className={`hover:bg-accent flex cursor-pointer items-center justify-between rounded-md border p-3 transition-colors ${
                              isKeramas === "true"
                                ? "border-primary bg-accent/50"
                                : ""
                            }`}
                          >
                            <span className="flex items-center gap-2">
                              <RadioGroupItem value="true" id="r2" />
                              <span>Potong + Keramas</span>
                            </span>
                            <span className="text-sm font-medium">
                              Rp20.000
                            </span>
                          </Label>
                        </RadioGroup>
                      </Field>
                    </FieldGroup>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-4 border-t">
                    <div className="flex w-full items-center justify-between">
                      <span className="text-muted-foreground text-sm">
                        Total Estimasi
                      </span>
                      <span className="text-primary text-2xl font-bold">
                        {isKeramas === "true" ? "Rp20.000" : "Rp15.000"}
                      </span>
                    </div>
                    <Button
                      className="w-full py-6 text-base"
                      size="lg"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Spinner className="mr-2" /> Memproses...
                        </>
                      ) : (
                        "Konfirmasi Booking"
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HaircutDetail;
