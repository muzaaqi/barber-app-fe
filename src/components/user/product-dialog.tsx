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
  ShoppingBag,
  Loader2,
  Banknote,
  QrCode,
  AlertCircle,
  Truck,
  Minus,
  Plus,
  MapPin,
} from "lucide-react";
import Image from "next/image";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { api } from "@/lib/axios-instance";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { formatIDR } from "@/features/formatter";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

type Product = {
  id: string | number;
  name: string;
  description: string;
  stock: number;
  price: number;
  image_url: string;
};

const ProductDialog = ({
  id,
  name,
  description,
  stock,
  price,
  image_url,
}: Product) => {
  const [isOpen, setIsOpen] = useState(false);
  const [quantity, setQuantity] = useState<number | string>(1);
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [expeditionService, setExpeditionService] = useState<string>("JNE");
  const [address, setAddress] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const incrementQty = () => {
    const current = typeof quantity === "string" ? 0 : quantity;
    if (current < stock) setQuantity(current + 1);
  };

  const decrementQty = () => {
    const current = typeof quantity === "string" ? 0 : quantity;
    if (current > 1) setQuantity(current - 1);
  };

  const handleQtyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === "") {
      setQuantity("");
      return;
    }
    const num = parseInt(val);
    if (!isNaN(num)) {
      setQuantity(num);
    }
  };

  const handleQtyBlur = () => {
    const num = typeof quantity === "string" ? parseInt(quantity) : quantity;
    if (isNaN(num) || num < 1) {
      setQuantity(1);
    } else if (num > stock) {
      setQuantity(stock);
    } else {
      setQuantity(num);
    }
  };

  const getValidQuantity = () => (typeof quantity === "string" ? 1 : quantity);
  const estimatedTotal = price * getValidQuantity();

  const handlePurchase = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    if (!paymentMethod || !address.trim()) {
      setErrorMessage("Silakan lengkapi alamat dan metode pembayaran.");
      setIsLoading(false);
      return;
    }

    const finalQty = getValidQuantity();

    const payload = {
      product_id: id,
      quantity: finalQty,
      payment_method: paymentMethod,
      payment_status: paymentMethod === "qris" ? "paid" : "unpaid",
      expedition_service: expeditionService,
      shipping_address: address,
    };

    try {
      const res = await api.post("/product-transactions/checkout", payload);

      if (res.status === 200 || res.status === 201) {
        toast.success("Pesanan berhasil dibuat!");
        setIsOpen(false);
        setQuantity(1);
        setPaymentMethod("");
        setAddress("");
      }
    } catch {
      setErrorMessage("Gagal memproses pesanan. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">
          <ShoppingBag className="mr-2 h-4 w-4" /> Beli
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        <form id="product-checkout-form" onSubmit={handlePurchase}>
          <DialogHeader>
            <DialogTitle className="text-primary text-2xl font-bold">
              Checkout Produk
            </DialogTitle>
            <DialogDescription>
              Konfirmasi detail pesanan Anda.
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
              <div className="mt-4 space-y-2">
                <div className="flex justify-between items-start">
                  <h2 className="text-xl font-bold text-foreground">{name}</h2>
                  <span className="text-lg font-semibold text-primary">
                    {formatIDR(price)}
                  </span>
                </div>
                <Separator />
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {description}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {errorMessage && (
                <Alert variant="destructive" className="animate-in fade-in zoom-in-95">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle className="ml-2 font-semibold">Gagal</AlertTitle>
                  <AlertDescription className="ml-2">
                    {errorMessage}
                  </AlertDescription>
                </Alert>
              )}
              <FieldGroup className="gap-5">
                <Field>
                  <FieldLabel className="mb-2 block text-sm font-medium">Jumlah Pembelian</FieldLabel>
                  <div className="flex items-center gap-3 p-3 border rounded-lg bg-card">
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="icon" 
                      className="h-9 w-9 shrink-0"
                      onClick={decrementQty}
                      disabled={getValidQuantity() <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    
                    <Input 
                      type="number"
                      value={quantity}
                      onChange={handleQtyChange}
                      onBlur={handleQtyBlur}
                      className="h-9 text-center font-semibold [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      min={1}
                      max={stock}
                    />

                    <Button 
                      type="button" 
                      variant="outline" 
                      size="icon" 
                      className="h-9 w-9 shrink-0"
                      onClick={incrementQty}
                      disabled={getValidQuantity() >= stock}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <span className="text-xs text-muted-foreground ml-auto whitespace-nowrap">
                      Stok: {stock}
                    </span>
                  </div>
                </Field>

                <Field>
                  <FieldLabel className="mb-2 block text-sm font-medium">
                    Alamat Pengiriman
                  </FieldLabel>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Textarea
                      placeholder="Masukkan alamat lengkap pengiriman..."
                      className="min-h-[80px] pl-9 resize-none"
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
                    value={expeditionService}
                    onValueChange={setExpeditionService}
                    className="grid grid-cols-2 gap-3"
                  >
                    <Label
                      htmlFor="exp-jne"
                      className={`hover:bg-accent flex cursor-pointer items-center justify-between rounded-md border p-3 transition-all ${
                        expeditionService === "JNE"
                          ? "border-primary bg-primary/5 ring-primary ring-1"
                          : "bg-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="JNE" id="exp-jne" />
                        <span className="text-sm font-medium">JNE</span>
                      </div>
                      <Truck className="h-4 w-4 text-muted-foreground" />
                    </Label>
                    <Label
                      htmlFor="exp-jnt"
                      className={`hover:bg-accent flex cursor-pointer items-center justify-between rounded-md border p-3 transition-all ${
                        expeditionService === "JNT"
                          ? "border-primary bg-primary/5 ring-primary ring-1"
                          : "bg-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="JNT" id="exp-jnt" />
                        <span className="text-sm font-medium">J&T</span>
                      </div>
                      <Truck className="h-4 w-4 text-muted-foreground" />
                    </Label>
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
                      htmlFor="prod-transfer"
                      className={`hover:bg-accent flex cursor-pointer items-center justify-between rounded-md border p-3 transition-all ${
                        paymentMethod === "transfer"
                          ? "border-primary bg-primary/5 ring-primary ring-1"
                          : "bg-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="transfer" id="prod-transfer" />
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">Transfer Bank</span>
                          <span className="text-muted-foreground text-xs">
                            Cek otomatis
                          </span>
                        </div>
                      </div>
                      <Banknote className="text-muted-foreground h-5 w-5" />
                    </Label>
                    <Label
                      htmlFor="prod-qris"
                      className={`hover:bg-accent flex cursor-pointer items-center justify-between rounded-md border p-3 transition-all ${
                        paymentMethod === "qris"
                          ? "border-primary bg-primary/5 ring-primary ring-1"
                          : "bg-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="qris" id="prod-qris" />
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
                <Separator />
                <div className="bg-muted/40 flex items-center justify-between rounded-lg p-4 border">
                  <div className="flex flex-col">
                    <span className="text-muted-foreground text-sm font-medium">
                      Total Pembayaran
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {getValidQuantity()} barang x {formatIDR(price)}
                    </span>
                  </div>
                  <span className="text-primary text-xl font-bold">
                    {formatIDR(estimatedTotal)}
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
            <Button form="product-checkout-form" type="submit" disabled={isLoading}>
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

export default ProductDialog;