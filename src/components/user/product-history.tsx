"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { api } from "@/lib/axios-instance";
import { ProductTransaction, PaginationMeta } from "@/types/transactions";
import GlobalPagination from "@/components/global-pagination";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { Truck } from "lucide-react";
import { formatIDR } from "@/features/formatter";
import { Separator } from "@/components/ui/separator";
import getAuthHeader from "@/features/get-jwt-token";
import { toast } from "sonner";

export default function ProductHistory() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const [data, setData] = useState<ProductTransaction[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await api.get(
          `/product-transactions/me?page=${page}&limit=5`, {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${await getAuthHeader()}`
            },
          }
        );
        setData(res.data.data.data);
        setMeta(res.data.data.pagination);
      } catch (error) {
        toast.error("Gagal memuat riwayat pembelian produk.", {
          description: String(error),
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  if (loading) return <HistorySkeleton />;

  if (!data || data.length === 0) {
    return (
      <div className="text-muted-foreground py-10 text-center">
        Belum ada riwayat pembelian produk.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {data.map((transaction) => (
        <Card key={transaction.id} className="border shadow-sm py-0">
          <CardHeader className="bg-muted/30 flex flex-row items-center justify-between border-b p-4">
            <div className="flex flex-col gap-2 text-sm sm:flex-row sm:items-center sm:gap-4">
              <span className="text-muted-foreground font-semibold">
                {new Date(transaction.created_at).toLocaleDateString("id-ID", {
                  dateStyle: "medium",
                })}
              </span>
              <span className="text-muted-foreground/30 hidden sm:inline">
                |
              </span>
              <span className="text-muted-foreground font-mono text-xs">
                #{transaction.id.substring(0, 8)}
              </span>
            </div>
            <div className="flex gap-2">
              <StatusBadge status={transaction.payment_status} />
            </div>
          </CardHeader>
          <CardContent className="space-y-4 p-4">
            <div className="text-muted-foreground mb-4 flex w-fit items-center gap-2 rounded border border-blue-100 bg-blue-50/50 p-2 text-sm">
              <Truck className="h-4 w-4 text-blue-600" />
              <span className="font-medium text-blue-900">
                {transaction.expedition_service}
              </span>
              <span className="text-blue-300">•</span>
              <span className="text-blue-700 capitalize">
                {transaction.expedition_status}
              </span>
            </div>
            {transaction.items.map((item) => (
              <div key={item.id} className="flex gap-4">
                <div className="bg-muted relative h-16 w-16 shrink-0 overflow-hidden rounded-md border">
                  <Image
                    src={item.product_image || "/placeholder-product.jpg"}
                    alt={item.product_name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4 className="line-clamp-2 font-medium">
                    {item.product_name}
                  </h4>
                  <div className="text-muted-foreground mt-1 text-sm">
                    {item.quantity} x {formatIDR(item.price_at_purchase)}
                  </div>
                </div>
                <div className="self-center text-sm font-semibold">
                  {formatIDR(item.subtotal)}
                </div>
              </div>
            ))}
          </CardContent>
          <Separator />
          <CardFooter className="bg-muted/10 flex items-center justify-between p-4">
            <span className="text-sm font-medium">Total Belanja</span>
            <span className="text-primary text-xl font-bold">
              {formatIDR(transaction.total_price)}
            </span>
          </CardFooter>
        </Card>
      ))}
      {meta && (
        <GlobalPagination
          currentPage={meta.page}
          totalPages={Math.ceil(meta.total / meta.limit)}
        />
      )}
    </div>
  );
}

const StatusBadge = ({ status }: { status: string }) => {
  const color =
    status === "paid"
      ? "bg-green-100 text-green-800 hover:bg-green-100 border-green-200"
      : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200";
  return (
    <Badge variant="outline" className={`capitalize shadow-none ${color}`}>
      {status}
    </Badge>
  );
};

const HistorySkeleton = () => (
  <div className="space-y-6">
    {[1, 2].map((i) => (
      <div key={i} className="h-64 space-y-4 rounded-xl border p-4">
        <Skeleton className="h-8 w-full" />
        <div className="flex gap-4">
          <Skeleton className="h-16 w-16" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/4" />
          </div>
        </div>
        <Skeleton className="mt-auto h-12 w-full" />
      </div>
    ))}
  </div>
);
