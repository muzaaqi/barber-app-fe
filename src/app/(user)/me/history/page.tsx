"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter, useSearchParams } from "next/navigation";
import HaircutHistory from "@/components/user/haircut-history";
import ProductHistory from "@/components/user/product-history";

export default function HistoryPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const handleTabChange = (val: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1"); 
    router.replace(`?${params.toString()}`);
  };

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Riwayat Transaksi</h1>
        <p className="text-muted-foreground mt-2">
          Lihat semua status pemesanan layanan dan pembelian produk Anda.
        </p>
      </div>

      <Tabs defaultValue="haircut" className="w-full" onValueChange={handleTabChange}>
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="haircut">Layanan Potong Rambut</TabsTrigger>
          <TabsTrigger value="product">Pembelian Produk</TabsTrigger>
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