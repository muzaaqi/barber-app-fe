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
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { formatIDR } from "@/features/formatter";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { addNewProcuctTransaction } from "@/actions/management/product-transaction-actions";
import { Spinner } from "../ui/spinner";
import { ProductType } from "@/types";
import { useRouter } from "next/navigation";

const ProductDialog = ({
  id,
  name,
  description,
  stock,
  price,
  image_url,
}: ProductType) => {
  const [isOpen, setIsOpen] = useState(false);
  const [quantity, setQuantity] = useState<number | string>(1);
  const [paymentMethod, setPaymentMethod] = useState<string>("qris");
  const [expeditionService, setExpeditionService] = useState<string>("JNE");
  const [expeditionCost, setExpeditionCost] = useState<number>(15000);
  const [address, setAddress] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const router = useRouter();

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
      payment_status: "unpaid",
      expedition_service: expeditionService,
      shipping_address: address,
      expedition_cost: expeditionCost,
      total_price: price * finalQty + expeditionCost,
    };

    try {
      const res = await addNewProcuctTransaction(payload);
      if (res.success) {
        toast.success("Pesanan berhasil dibuat!");
        setIsOpen(false);
        setQuantity(1);
        setPaymentMethod("");
        setAddress("");
        router.push(`/me/history/product/${res.data.id}`);
      }
    } catch {
      toast.error("Gagal memproses pesanan. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">
          <ShoppingBag className="mr-2 h-4 w-4" /> Beli{" "}
          <span className="hidden md:inline">Sekarang</span>
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
                <div className="flex items-start justify-between">
                  <h2 className="text-foreground text-xl font-bold">{name}</h2>
                  <span className="text-primary text-lg font-semibold">
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
                <Alert
                  variant="destructive"
                  className="animate-in fade-in zoom-in-95"
                >
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle className="ml-2 font-semibold">Gagal</AlertTitle>
                  <AlertDescription className="ml-2">
                    {errorMessage}
                  </AlertDescription>
                </Alert>
              )}
              <FieldGroup className="gap-5">
                <Field>
                  <FieldLabel className="mb-2 block text-sm font-medium">
                    Jumlah Pembelian
                  </FieldLabel>
                  <div className="bg-card flex items-center gap-3 rounded-lg border p-3">
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
                      className="h-9 [appearance:textfield] text-center font-semibold [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
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
                    <span className="text-muted-foreground ml-auto text-xs whitespace-nowrap">
                      Stok: {stock}
                    </span>
                  </div>
                </Field>
                <Field>
                  <FieldLabel className="mb-2 block text-sm font-medium">
                    Alamat Pengiriman
                  </FieldLabel>
                  <div className="relative">
                    <MapPin className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                    <Textarea
                      placeholder="Masukkan alamat lengkap pengiriman..."
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
                    value={expeditionService}
                    onValueChange={(value) => {
                      setExpeditionService(value);
                      setExpeditionCost(value === "JNE" ? 15000 : 20000);
                    }}
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
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">JNE</span>
                          <span className="text-muted-foreground text-xs">
                            {formatIDR(15000)}
                          </span>
                        </div>
                      </div>
                      <Truck className="text-muted-foreground h-4 w-4" />
                    </Label>
                    <Label
                      htmlFor="exp-j&t"
                      className={`hover:bg-accent flex cursor-pointer items-center justify-between rounded-md border p-3 transition-all ${
                        expeditionService === "J&T"
                          ? "border-primary bg-primary/5 ring-primary ring-1"
                          : "bg-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <RadioGroupItem value="J&T" id="exp-j&t" />
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">J&T</span>
                          <span className="text-muted-foreground text-xs">
                            {formatIDR(20000)}
                          </span>
                        </div>
                      </div>
                      <Truck className="text-muted-foreground h-4 w-4" />
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
                    <Label
                      htmlFor="prod-cod"
                      className={`hover:bg-accent flex cursor-pointer items-center justify-between rounded-md border p-3 transition-all ${
                        paymentMethod === "cod"
                          ? "border-primary bg-primary/5 ring-primary ring-1"
                          : "bg-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="cod" id="prod-cod" disabled/>
                        <div className="flex flex-col text-muted">
                          <span className="text-sm font-medium">
                            Belum Tersedia
                          </span>
                          <span className="text-muted text-xs">
                            Saat ini metode pembayaran belum tersedia.
                          </span>
                        </div>
                      </div>
                      <Banknote className="text-muted h-5 w-5" />
                    </Label>
                  </RadioGroup>
                </Field>
                <Separator />
                <div className="bg-muted/40 flex items-center justify-between rounded-lg border p-4">
                  <div className="flex flex-col">
                    <span className="text-muted-foreground text-sm font-medium">
                      Total Pembayaran
                    </span>
                    <span className="text-muted-foreground text-xs">
                      {getValidQuantity()} barang x {formatIDR(price)}
                    </span>
                  </div>
                  <span className="text-primary text-xl font-bold">
                    {formatIDR(estimatedTotal + expeditionCost)}
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
            <Button
              form="product-checkout-form"
              type="submit"
              disabled={isLoading}
              onClick={handlePurchase}
            >
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
};

export default ProductDialog;
