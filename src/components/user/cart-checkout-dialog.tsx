"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"; // Asumsi component field custom anda
import {
  ShoppingBag,
  MapPin,
  Truck,
  Banknote,
  QrCode,
  AlertCircle,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { formatIDR } from "@/features/formatter";
import { checkoutCart } from "@/actions/management/cart-actions";
import { Spinner } from "../ui/spinner";
type Props = {
  totalItems: number;
  grandTotal: number;
  disabled?: boolean;
};

export default function CartCheckoutDialog({
  totalItems,
  grandTotal,
  disabled,
}: Props) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [address, setAddress] = useState("");
  const [expedition, setExpedition] = useState("JNE");
  const [expeditionCost, setExpeditionCost] = useState(15000);
  const [paymentMethod, setPaymentMethod] = useState("qris");

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!address.trim() || !paymentMethod) {
      setErrorMessage("Mohon lengkapi alamat dan metode pembayaran.");
      return;
    }

    setIsLoading(true);

    const payload = {
      shipping_address: address,
      expedition_service: expedition,
      expedition_cost: expeditionCost,
      payment_method: paymentMethod,
      payment_status: "unpaid",
    };

    try {
      const res = await checkoutCart(payload);
      if (res.success) {
        toast.success("Checkout Berhasil!", {
          description: "Silakan lakukan pembayaran.",
        });
        setIsOpen(false);
        router.push(`/me/history/product/${res.data.id}`);
      }
    } catch {
      const msg = "Gagal memproses checkout.";
      setErrorMessage(msg);
      toast.error("Gagal Checkout");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full py-6 text-base" size="lg" disabled={disabled}>
          <ShoppingBag className="mr-2 h-5 w-5" />
          Checkout ({totalItems})
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-xl">
        <form onSubmit={handleCheckout}>
          <DialogHeader>
            <DialogTitle>Konfirmasi Checkout</DialogTitle>
            <DialogDescription>
              Lengkapi detail pengiriman untuk {totalItems} barang di troli.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            {errorMessage && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}
            <FieldGroup>
              <Field>
                <FieldLabel className="mb-2 block text-sm font-medium">
                  Alamat Pengiriman
                </FieldLabel>
                <div className="relative">
                  <MapPin className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                  <Textarea
                    placeholder="Jl. Mawar No. 123, Jakarta Selatan..."
                    className="min-h-[80px] resize-none pl-9"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </Field>
              <Field>
                <FieldLabel className="mb-2 block text-sm font-medium">
                  Jasa Ekspedisi
                </FieldLabel>
                <RadioGroup
                  value={expedition}
                  onValueChange={(value) => {
                    setExpedition(value);
                    setExpeditionCost(value === "JNE" ? 15000 : 20000);
                  }}
                  className="grid grid-cols-2 gap-3"
                >
                  {[
                    {
                      label: "JNE",
                      price: 15000,
                    },
                    {
                      label: "J&T",
                      price: 20000,
                    },
                  ].map(({ label, price }) => (
                    <Label
                      key={label}
                      className={`hover:bg-accent flex cursor-pointer items-center justify-between rounded-md border p-3 ${
                        expedition === label
                          ? "border-primary bg-primary/5 ring-primary ring-1"
                          : ""
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value={label} id={`exp-${label}`} />
                        <div className="flex flex-col">
                          <span className="font-medium">{label}</span>
                          <span className="text-muted-foreground text-xs">
                            {formatIDR(price)}
                          </span>
                        </div>
                      </div>
                      <Truck className="text-muted-foreground h-4 w-4" />
                    </Label>
                  ))}
                </RadioGroup>
              </Field>
              <Field>
                <FieldLabel className="mb-2 block text-sm font-medium">
                  Metode Pembayaran
                </FieldLabel>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className="grid grid-cols-1 gap-3"
                >
                  <Label
                    className={`hover:bg-accent flex cursor-pointer items-center justify-between rounded-md border p-3 ${
                      paymentMethod === "qris"
                        ? "border-primary bg-primary/5 ring-primary ring-1"
                        : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="qris" id="pay-qris" />
                      <div>
                        <div className="text-sm font-medium">QRIS</div>
                        <div className="text-muted-foreground text-xs">
                          Scan barcode
                        </div>
                      </div>
                    </div>
                    <QrCode className="text-muted-foreground h-5 w-5" />
                  </Label>
                  <Label
                    className={`hover:bg-accent flex cursor-pointer items-center justify-between rounded-md border p-3 ${
                      paymentMethod === "cod"
                        ? "border-primary bg-primary/5 ring-primary ring-1"
                        : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="cod" id="pay-cod" disabled/>
                      <div>
                        <div className="text-sm font-medium text-muted">Belum Tersedia</div>
                        <div className="text-muted text-xs">
                          Metode pembayaran belum tersedia
                        </div>
                      </div>
                    </div>
                    <Banknote className="text-muted h-5 w-5" />
                  </Label>
                </RadioGroup>
              </Field>
            </FieldGroup>
            <div className="bg-muted/30 flex items-center justify-between rounded-lg border p-4">
              <span className="text-muted-foreground text-sm font-medium">
                Total Tagihan
              </span>
              <span className="text-primary text-xl font-bold">
                {formatIDR(grandTotal + expeditionCost)}
              </span>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              disabled={isLoading}
            >
              Batal
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Spinner /> Memproses...
                </>
              ) : (
                "Bayar Sekarang"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
