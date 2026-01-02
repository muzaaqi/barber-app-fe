"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ProductTransaction, PaginationMeta } from "@/types";
import GlobalPagination from "@/components/global-pagination";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { ArrowRight, ShoppingBag, Truck } from "lucide-react";
import { formatIDR } from "@/features/formatter";
import { toast } from "sonner";
import { getProductTransactionsByUserId } from "@/actions/management/product-transaction-actions";

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
        const res = await getProductTransactionsByUserId(page, 6); // Limit genap agar grid rapi
        setData(res.data);
        setMeta(res.pagination);
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
      <div className="py-10">
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <ShoppingBag className="text-muted-foreground h-10 w-10" />
            </EmptyMedia>
            <EmptyTitle>Belum Ada Riwayat Belanja</EmptyTitle>
            <EmptyDescription>
              Riwayat pembelian produk perawatan rambut Anda akan muncul di
              sini.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button asChild>
              <Link href="/services?options=products">Mulai Belanja</Link>
            </Button>
          </EmptyContent>
        </Empty>
      </div>
    );
  }

  return (
    <>
      <div className="gap-4 space-y-4 md:grid md:grid-cols-2 md:space-y-0">
        {data.map((transaction) => (
          <Card
            key={transaction.id}
            className="group hover:border-primary/50 flex flex-col justify-between overflow-hidden border py-0 transition-all hover:shadow-md"
          >
            <CardHeader className="bg-muted/30 flex flex-row items-start justify-between border-b p-4">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold">
                  {new Date(transaction.created_at).toLocaleDateString(
                    "id-ID",
                    {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    },
                  )}
                </span>
                <span className="text-muted-foreground font-mono text-[10px]">
                  #{transaction.id.substring(0, 8)}
                </span>
              </div>
              <StatusBadge status={transaction.payment_status} />
            </CardHeader>
            <CardContent className="flex-1 space-y-4 p-4">
              <div className="flex w-fit items-center gap-2 rounded bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                <Truck className="h-3 w-3" />
                <span>{transaction.expedition_service}</span>
                <span className="text-blue-300">•</span>
                <span className="capitalize">
                  {transaction.expedition_status}
                </span>
              </div>
              <div className="space-y-3">
                {transaction.items.slice(0, 2).map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="bg-muted relative h-12 w-12 shrink-0 overflow-hidden rounded-md border">
                      <Image
                        src={item.product_image || "/placeholder-product.jpg"}
                        alt={item.product_name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <h4 className="truncate text-sm font-medium">
                        {item.product_name}
                      </h4>
                      <p className="text-muted-foreground text-xs">
                        {item.quantity} x {formatIDR(item.price_at_purchase)}
                      </p>
                    </div>
                  </div>
                ))}
                {transaction.items.length > 2 && (
                  <p className="text-muted-foreground pt-1 text-xs">
                    + {transaction.items.length - 2} produk lainnya...
                  </p>
                )}
              </div>
            </CardContent>
            <CardFooter className="bg-muted/10 flex flex-row gap-3 border-t p-4 sm:justify-between">
              <div className="flex w-full flex-col items-start justify-center">
                <span className="text-muted-foreground text-xs">
                  Total Belanja
                </span>
                <span className="text-primary text-lg font-bold">
                  {formatIDR(transaction.total_price)}
                </span>
              </div>
              <Link href={`/me/history/product/${transaction.id}`}>
                <Button size="sm" className="w-full gap-2 sm:w-auto">
                  Detail
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
      {meta && meta.total > meta.limit && (
        <div className="flex justify-center py-6">
          <GlobalPagination
            currentPage={meta.page}
            totalPages={Math.ceil(meta.total / meta.limit)}
          />
        </div>
      )}
    </>
  );
}

const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    paid: "bg-green-100 text-green-800 border-green-200",
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    unpaid: "bg-red-100 text-red-800 border-red-200",
    shipping: "bg-blue-100 text-blue-800 border-blue-200",
    completed: "bg-primary/20 text-primary border-primary/20",
    cancelled: "bg-gray-100 text-gray-800 border-gray-200",
  };

  return (
    <Badge
      variant="outline"
      className={`capitalize shadow-none ${styles[status] || ""}`}
    >
      {status === "unpaid" ? "Belum Bayar" : status}
    </Badge>
  );
};

const HistorySkeleton = () => (
  <div className="gap-4 space-y-4 md:grid md:grid-cols-2 md:space-y-0">
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="rounded-xl border shadow-sm">
        <div className="flex justify-between border-b p-4">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-5 w-16" />
        </div>
        <div className="space-y-4 p-4">
          <Skeleton className="h-6 w-32 rounded-md" />
          <div className="flex gap-3">
            <Skeleton className="h-12 w-12 rounded-md" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
        </div>
        <div className="bg-muted/10 flex items-center justify-between border-t p-4">
          <div className="space-y-1">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-6 w-28" />
          </div>
          <Skeleton className="h-9 w-24" />
        </div>
      </div>
    ))}
  </div>
);
