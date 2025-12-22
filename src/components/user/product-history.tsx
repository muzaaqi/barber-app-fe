"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ProductTransaction, PaginationMeta } from "@/types/transactions";
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
import { ShoppingBag, Truck } from "lucide-react";
import { formatIDR } from "@/features/formatter";
import { Separator } from "@/components/ui/separator";
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
        const res = await getProductTransactionsByUserId(page, 5);
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
      <div className="gap-4 space-y-5 md:grid md:grid-cols-2">
        {data.map((transaction) => (
          <Card key={transaction.id} className="border py-0 shadow-sm">
            <CardHeader className="bg-muted/30 flex flex-row items-center justify-between border-b p-4">
              <div className="flex flex-col gap-2 text-sm sm:flex-row sm:items-center sm:gap-4">
                <span className="text-muted-foreground font-semibold">
                  {new Date(transaction.created_at).toLocaleDateString(
                    "id-ID",
                    {
                      dateStyle: "medium",
                    },
                  )}
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
            <CardContent className="space-y-4 p-4 ">
              <div className="text-muted-foreground mb-4 flex w-fit items-center gap-2 rounded bg-primary p-2 text-sm">
                <Truck className="h-4 w-4 text-background" />
                <span className="font-medium text-background">
                  {transaction.expedition_service}
                </span>
                <span className="text-background">•</span>
                <span className="text-background capitalize">
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
              <span className="text-xl font-medium">Total Belanja</span>
              <span className="text-primary text-xl font-bold">
                {formatIDR(transaction.total_price)}
              </span>
            </CardFooter>
          </Card>
        ))}
      </div>
      {meta && meta.total > meta.limit && (
        <div className="flex justify-center py-4">
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
  const color =
    status === "paid"
      ? "bg-primary text-green-800 hover:bg-primary border-green-200"
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
