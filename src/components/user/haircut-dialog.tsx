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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { BookCheck, Loader2 } from "lucide-react"; 
import Image from "next/image";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Calendar24 } from "../ui/calendar24"; // Import komponen yang baru diedit

type Haircut = {
  id: string | number;
  name: string;
  description: string;
  image_url: string;
};

const HaircutDialog = ({ id, name, image_url, description }: Haircut) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // 1. State Terpisah untuk Tanggal dan Jam
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string>("10:00"); // Default jam
  
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [isKeramas, setIsKeramas] = useState<string>("false");
  const [isLoading, setIsLoading] = useState(false);

  const handleReservation = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!paymentMethod || !date || !time) {
      alert("Mohon lengkapi tanggal, jam, dan metode pembayaran.");
      setIsLoading(false);
      return;
    }

    // 2. Menggabungkan Tanggal dan Jam menjadi satu objek Date/ISO String
    // Buat copy dari objek date
    const finalDateTime = new Date(date);
    const [hours, minutes] = time.split(':');
    finalDateTime.setHours(parseInt(hours), parseInt(minutes));

    const payload = {
      haircut_id: id,
      haircut_name: name,
      booking_datetime: finalDateTime.toISOString(), // Hasil: "2023-10-25T14:30:00.000Z"
      payment_method: paymentMethod,
      add_on_keramas: isKeramas === "true",
      total_price: isKeramas === "true" ? 50000 : 35000,
    };

    try {
      console.log("Payload Reservasi:", payload);
      await new Promise((resolve) => setTimeout(resolve, 1500)); 
      
      alert(`Sukses! Booking untuk ${finalDateTime.toLocaleString('id-ID')}`);
      setIsOpen(false);
    } catch (error) {
      console.error(error);
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
      
      <DialogContent className="sm:max-w-2xl">
        <form onSubmit={handleReservation}>
          <DialogHeader>
            <DialogTitle>Reservasi: {name}</DialogTitle>
            <DialogDescription>Lengkapi detail booking Anda.</DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            <div className="flex flex-col gap-4">
              <div className="relative aspect-square w-full overflow-hidden rounded-md border">
                <Image src={image_url} alt={name} fill className="object-cover" />
              </div>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>

            <div className="flex flex-col gap-4">
              <FieldGroup>
                <Field>
                  {/* 3. Masukkan Calendar24 dengan Props */}
                  <div className="border rounded-md p-3">
                     <Calendar24 
                        date={date}
                        setDate={setDate}
                        time={time}
                        setTime={setTime}
                     /> 
                  </div>
                </Field>

                <Field>
                  <FieldLabel className="mb-2 block mt-4">Metode Pembayaran</FieldLabel>
                  <Select onValueChange={setPaymentMethod} value={paymentMethod}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih metode pembayaran" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cash">Cash</SelectItem>
                      <SelectItem value="qris">Qris</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>

                <Field>
                  <FieldLabel className="mb-2 block mt-4">Add-ons</FieldLabel>
                  <RadioGroup value={isKeramas} onValueChange={setIsKeramas} className="flex flex-col gap-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="false" id="r1" />
                      <Label htmlFor="r1">Potong Saja</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="true" id="r2" />
                      <Label htmlFor="r2">Potong + Keramas</Label>
                    </div>
                  </RadioGroup>
                </Field>
              </FieldGroup>
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">Batal</Button>
            </DialogClose>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? <Loader2 className="animate-spin mr-2" /> : "Konfirmasi"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default HaircutDialog;