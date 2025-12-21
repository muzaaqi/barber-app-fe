"use client";

import { Suspense } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter, useSearchParams } from "next/navigation";
import HaircutHistory from "@/components/user/haircut-history";
import ProductHistory from "@/components/user/product-history";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock, Scissors, ShoppingBag } from "lucide-react";

function HistoryContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleTabChange = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");
    router.replace(`?${params.toString()}`);
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <div className="mb-8">
        <div className="flex gap-3 items-center">
          <Clock size={50}/>
          <h1 className="text-3xl font-bold tracking-tight">
            Riwayat Transaksi
          </h1>
        </div>
        <p className="text-muted-foreground mt-2">
          Lihat semua status pemesanan layanan dan pembelian produk Anda.
        </p>
      </div>
      <Tabs
        defaultValue="haircut"
        className="w-full"
        onValueChange={handleTabChange}
      >
        <TabsList className="mb-8 grid w-full grid-cols-2">
          <TabsTrigger value="haircut">
            <Scissors /> Potong
          </TabsTrigger>
          <TabsTrigger value="product">
            <ShoppingBag /> Produk
          </TabsTrigger>
        </TabsList>
        <TabsContent value="haircut" className="min-h-[400px]">
          <HaircutHistory />
        </TabsContent>
        <TabsContent value="product" className="min-h-[400px]">
          <ProductHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
}

const HistoryPageSkeleton = () => (
  <div className="container mx-auto max-w-4xl px-4 py-8 sm:px-6">
    <div className="mb-8 space-y-2">
      <Skeleton className="h-10 w-48" />
      <Skeleton className="h-5 w-96" />
    </div>
    <Skeleton className="mb-8 h-10 w-full" />
    <div className="space-y-4">
      <Skeleton className="h-40 w-full rounded-xl" />
      <Skeleton className="h-40 w-full rounded-xl" />
    </div>
  </div>
);

export default function HistoryPage() {
  return (
    <Suspense fallback={<HistoryPageSkeleton />}>
      <HistoryContent />
    </Suspense>
  );
}
