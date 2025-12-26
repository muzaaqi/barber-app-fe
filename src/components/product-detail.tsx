"use client";

import Image from "next/image";
import { notFound, useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowLeft,
  Banknote,
  AlertCircle,
  QrCode,
  MapPin,
  Truck,
  Minus,
  Plus,
  ShoppingBag,
} from "lucide-react";
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
import { formatIDR } from "@/features/formatter";
import { addNewProcuctTransaction } from "@/actions/management/product-transaction-actions";
import { getProductById } from "@/actions/management/product-actions";

type Product = {
  id: string;
  name: string;
  description: string;
  image_url: string;
  price: number;
  stock?: number;
};

const ProductDetail = () => {
  const { productId }: { productId: string } = useParams();
  const router = useRouter();

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quantity, setQuantity] = useState<number | string>(1);
  const [address, setAddress] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("qris");
  const [expeditionService, setExpeditionService] = useState<string>("JNE");
  const [expeditionCost, setExpeditionCost] = useState<number>(15000);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const stock = product?.stock || 0;

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
    if (!isNaN(num)) setQuantity(num);
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
  const estimatedTotal = (product?.price || 0) * getValidQuantity();

  const handlePurchase = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!paymentMethod || !address.trim()) {
      setErrorMessage(
        "Mohon lengkapi alamat pengiriman dan metode pembayaran.",
      );
      return;
    }

    setIsSubmitting(true);
    const payload = {
      product_id: productId,
      quantity: getValidQuantity(),
      payment_method: paymentMethod,
      payment_status: "unpaid",
      expedition_service: expeditionService,
      shipping_address: address,
      expedition_cost: expeditionCost,
      total_price: estimatedTotal + expeditionCost,
    };

    try {
      const res = await addNewProcuctTransaction(payload);
      if (res.success) {
        toast.success("Pesanan berhasil dibuat!");
        router.push(`/me/history/product/${res.data.id}`);
      }
      if (!res.success) {
        toast.error(
          res.message || "Gagal memproses pesanan. Silakan coba lagi.",
        );
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Gagal memproses pesanan. Silakan coba lagi.");
      toast.error("Gagal checkout.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const res = await getProductById(productId);
        setProduct(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (productId) fetchProductDetail();
  }, [productId]);

  if (isLoading) {
    return <ProductDetailSkeleton />;
  }

  if (!product) {
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
                src={product.image_url}
                alt={product.name}
                width={800}
                height={600}
                className="aspect-square h-auto w-full object-cover lg:aspect-4/3"
                priority
              />
            </div>
            <div className="space-y-4">
              <div className="flex flex-row justify-between gap-2 md:items-start">
                <h1 className="text-foreground text-3xl font-bold tracking-tight md:text-4xl">
                  {product.name}
                </h1>
                <span className="text-primary text-2xl font-bold">
                  {formatIDR(product.price)}
                </span>
              </div>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-6 h-fit">
              <form onSubmit={handlePurchase}>
                <Card className="border-border shadow-sm">
                  <CardHeader>
                    <CardTitle>Checkout Pesanan</CardTitle>
                    <CardDescription>
                      Lengkapi detail pengiriman.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {errorMessage && (
                      <Alert
                        variant="destructive"
                        className="animate-in fade-in slide-in-from-top-1"
                      >
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Gagal Checkout</AlertTitle>
                        <AlertDescription>{errorMessage}</AlertDescription>
                      </Alert>
                    )}
                    <FieldGroup>
                      <Field>
                        <FieldLabel className="mb-2 block text-sm font-medium">
                          Jumlah Pembelian
                        </FieldLabel>
                        <div className="flex items-center justify-between rounded-lg border p-3">
                          <div className="text-muted-foreground text-sm">
                            Stok:{" "}
                            <span className="text-foreground font-medium">
                              {stock}
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
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
                              className="h-9 w-16 [appearance:textfield] text-center font-bold [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
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
                          </div>
                        </div>
                      </Field>
                      <Field>
                        <FieldLabel className="mb-2 block text-sm font-medium">
                          Alamat Pengiriman
                        </FieldLabel>
                        <div className="relative">
                          <MapPin className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                          <Textarea
                            placeholder="Jl. Contoh No. 123, Kota..."
                            className="min-h-[100px] resize-none pl-9"
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
                        <FieldLabel className="mb-3 block text-sm font-medium">
                          Metode Pembayaran
                        </FieldLabel>
                        <RadioGroup
                          value={paymentMethod}
                          onValueChange={setPaymentMethod}
                          className="grid grid-cols-1 gap-3"
                        >
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
                                  Scan barcode
                                </span>
                              </div>
                            </div>
                            <QrCode className="text-muted-foreground h-5 w-5" />
                          </Label>
                          <Label
                            htmlFor="pay-cod"
                            className={`hover:bg-accent flex cursor-pointer items-center justify-between rounded-md border p-3 transition-all ${
                              paymentMethod === "cod"
                                ? "border-primary bg-primary/5 ring-primary ring-1"
                                : "bg-transparent"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <RadioGroupItem
                                value="cod"
                                id="pay-cod"
                                disabled
                              />
                              <div className="flex flex-col">
                                <span className="text-muted text-sm font-medium">
                                  Belum Tersedia
                                </span>
                                <span className="text-muted text-xs">
                                  Metode pembayaran belum tersedia
                                </span>
                              </div>
                            </div>
                            <Banknote className="text-muted h-5 w-5" />
                          </Label>
                        </RadioGroup>
                      </Field>
                    </FieldGroup>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-4 border-t">
                    <div className="flex w-full items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-muted-foreground text-sm">
                          Total Pembayaran
                        </span>
                        <span className="text-muted-foreground text-xs">
                          {getValidQuantity()} x {formatIDR(product.price)}
                        </span>
                      </div>
                      <span className="text-primary text-2xl font-bold">
                        {formatIDR(estimatedTotal + expeditionCost)}
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
                        <>
                          <ShoppingBag className="mr-2 h-5 w-5" /> Bayar
                          Sekarang
                        </>
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

const ProductDetailSkeleton = () => (
  <div className="bg-background min-h-screen pt-6 pb-20">
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <Skeleton className="mb-6 h-9 w-24" />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
        <div className="space-y-6 lg:col-span-2">
          <Skeleton className="aspect-square w-full rounded-2xl lg:aspect-4/3" />
          <div className="space-y-3">
            <Skeleton className="h-10 w-3/4 md:w-1/2" />
            <div className="space-y-2 pt-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="bg-card sticky top-6 space-y-6 rounded-xl border p-6">
            <div className="space-y-2">
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-4 w-2/3" />
            </div>
            <div className="space-y-5">
              <Skeleton className="h-12 w-full rounded-lg" />{" "}
              <div className="space-y-2">
                <Skeleton className="h-5 w-1/3" />
                <Skeleton className="h-14 w-full rounded-md" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-5 w-1/3" />
                <Skeleton className="h-14 w-full rounded-md" />
                <Skeleton className="h-14 w-full rounded-md" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-5 w-1/3" />
                <Skeleton className="h-14 w-full rounded-md" />
                <Skeleton className="h-14 w-full rounded-md" />
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

export default ProductDetail;
