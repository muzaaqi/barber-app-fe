"use client";

import { Suspense } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter, useSearchParams } from "next/navigation";
import HaircutHistory from "@/components/user/haircut-history";
import ProductHistory from "@/components/user/product-history";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock, Scissors, ShoppingBag } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function HistoryContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleTabChange = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");
    router.replace(`?${params.toString()}`);
  };

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto max-w-6xl px-4 pt-5 sm:px-6">
        <div className="flex justify-between item-center mb-5">
          <div className="flex items-center gap-3">
            <Clock size={50} />
            <h1 className="text-xl font-bold tracking-tight md:text-3xl">
              Riwayat Transaksi
            </h1>
          </div>
          <div className="flex items-center">
            <Link href="/services">
              <Button>Lihat Katalog</Button>
            </Link>
          </div>
        </div>
        <Separator className="mb-8" />
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
