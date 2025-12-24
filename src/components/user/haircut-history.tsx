"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { HaircutTransaction, PaginationMeta } from "@/types/transactions";
import GlobalPagination from "@/components/global-pagination";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
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
import Image from "next/image";
import {
  ArrowRight,
  CalendarDays,
  CalendarX,
  Clock,
  Scissors,
} from "lucide-react";
import { formatIDR } from "@/features/formatter";
import { toast } from "sonner";
import { getHaircutTransactionsByUserId } from "@/actions/management/haircut-transaction-actions";

export default function HaircutHistory() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const [data, setData] = useState<HaircutTransaction[]>([]);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await getHaircutTransactionsByUserId(page, 5);
        setData(res.data);
        setMeta(res.pagination);
      } catch (error) {
        toast.error("Gagal memuat riwayat booking.", {
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
              <CalendarX className="text-muted-foreground h-10 w-10" />
            </EmptyMedia>
            <EmptyTitle>Belum Ada Riwayat Booking</EmptyTitle>
            <EmptyDescription>
              Anda belum pernah melakukan reservasi layanan potong rambut di
              sini.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button asChild>
              <Link href="/services?options=haircuts">Buat Reservasi Baru</Link>
            </Button>
          </EmptyContent>
        </Empty>
      </div>
    );
  }

  return (
    <>
      <div className="gap-4 space-y-4 md:grid md:grid-cols-2">
        {data.map((item) => (
          <Card
            key={item.id}
            className="group border-muted hover:border-primary/50 overflow-hidden py-0 transition-all hover:shadow-md"
          >
            <CardContent className="p-0 sm:flex">
              <div className="bg-muted relative h-48 w-full shrink-0 overflow-hidden sm:h-auto sm:w-48">
                <Image
                  src={item.haircut?.image_url || "/placeholder.jpg"}
                  alt={item.haircut?.name || "Service"}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-2 right-2 sm:hidden">
                  <StatusBadge status={item.payment_status} type="payment" />
                </div>
              </div>
              <div className="flex w-full flex-col justify-between p-4">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="line-clamp-1 text-lg font-bold">
                        {item.haircut?.name}
                      </h3>
                      <div className="text-muted-foreground mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                        <div className="flex items-center gap-1.5">
                          <CalendarDays className="h-3.5 w-3.5" />
                          <span>
                            {new Date(item.reservation_time).toLocaleDateString(
                              "id-ID",
                              {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              },
                            )}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5" />
                          <span>
                            {new Date(item.reservation_time).toLocaleTimeString(
                              "id-ID",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              },
                            )}
                          </span>
                        </div>
                      </div>
                      {item.hairwash && (
                        <div className="mt-2 flex w-fit items-center gap-1 rounded-md bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-600 ring-1 ring-blue-500/10">
                          <Scissors className="h-3 w-3" />
                          <span>+ Cuci Rambut</span>
                        </div>
                      )}
                    </div>
                    <div className="flex-col items-end gap-2 sm:flex">
                      <div className="hidden sm:block">
                        <StatusBadge
                          status={item.payment_status}
                          type="payment"
                        />
                      </div>
                      <Badge
                        variant="secondary"
                        className="text-[10px] capitalize"
                      >
                        {item.reservation_status}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex flex-col gap-3 border-t border-dashed pt-3 sm:flex-row sm:items-end sm:justify-between">
                  <div className="flex items-center justify-between sm:flex-col sm:items-start sm:gap-0">
                    <span className="text-muted-foreground font-mono text-[10px]">
                      #{item.id.substring(0, 8)}
                    </span>
                    <span className="text-primary text-lg font-bold">
                      {formatIDR(item.total_price)}
                    </span>
                  </div>
                  <Link href={`/me/history/haircut/${item.id}`}>
                    <Button size="sm" className="w-full gap-2 sm:w-auto">
                      Detail
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
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

const StatusBadge = ({
  status,
}: {
  status: string;
  type: "payment" | "reservation";
}) => {
  const styles: Record<string, string> = {
    paid: "bg-green-100 text-green-800 border-green-200",
    pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
    unpaid: "bg-red-100 text-red-800 border-red-200",
    completed: "bg-blue-100 text-blue-800 border-blue-200",
  };
  return (
    <Badge
      variant="outline"
      className={`capitalize shadow-none ${styles[status] || ""}`}
    >
      {status}
    </Badge>
  );
};

const HistorySkeleton = () => (
  <div className="gap-4 space-y-4 md:grid md:grid-cols-2">
    {[1, 2, 3, 4].map((i) => (
      <div
        key={i}
        className="bg-card overflow-hidden rounded-xl border shadow-sm"
      >
        <div className="flex flex-col sm:flex-row">
          <Skeleton className="h-48 w-full shrink-0 sm:h-auto sm:w-48" />
          <div className="flex flex-1 flex-col justify-between p-4">
            <div className="space-y-2">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
            <div className="mt-4 flex flex-col gap-3 border-t border-dashed pt-3 sm:flex-row sm:items-end sm:justify-between">
              <div className="space-y-1">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-7 w-32" />
              </div>
              <Skeleton className="h-9 w-full rounded-md sm:w-24" />
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);
