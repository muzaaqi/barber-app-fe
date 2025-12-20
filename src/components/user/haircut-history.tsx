"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { api } from "@/lib/axios-instance";
import { HaircutTransaction, PaginationMeta } from "@/types/transactions";
import GlobalPagination from "@/components/global-pagination";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { CalendarDays, Clock, Scissors } from "lucide-react";
import { formatIDR } from "@/features/formatter";
import getAuthHeader from "@/features/get-jwt-token";
import { toast } from "sonner";

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
        const res = await api.get(
          `/haircut-transactions/user?page=${page}&limit=5`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${await getAuthHeader()}`,
            },
          },
        );
        setData(res.data.data.data);
        setMeta(res.data.data.pagination);
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
      <div className="text-muted-foreground py-10 text-center">
        Belum ada riwayat booking.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {data.map((item) => (
        <Card
          key={item.id}
          className="hover:border-primary/50 overflow-hidden transition-colors"
        >
          <CardContent className="sm:flex">
            <div className="bg-muted relative h-48 w-full shrink-0 sm:h-auto sm:w-48 rounded-xl overflow-hidden">
              <Image
                src={item.haircut?.image_url || "/placeholder.jpg"}
                alt={item.haircut?.name || "Service"}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex w-full flex-col justify-between gap-3 p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold">{item.haircut?.name}</h3>
                  <div className="text-muted-foreground mt-1 flex items-center gap-2 text-sm">
                    <CalendarDays className="h-4 w-4" />
                    <span>
                      {new Date(item.reservation_time).toLocaleDateString(
                        "id-ID",
                        { dateStyle: "long" },
                      )}
                    </span>
                  </div>
                  <div className="text-muted-foreground mt-1 flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4" />
                    <span>
                      {new Date(item.reservation_time).toLocaleTimeString(
                        "id-ID",
                        { hour: "2-digit", minute: "2-digit" },
                      )}
                    </span>
                  </div>
                  {item.hairwash && (
                    <div className="mt-2 flex w-fit items-center gap-1 rounded bg-blue-50 px-2 py-1 text-xs font-medium text-blue-600">
                      <Scissors className="h-3 w-3" />
                      <span>+ Cuci Rambut</span>
                    </div>
                  )}
                </div>
                <div className="flex flex-col items-end gap-2">
                  <StatusBadge status={item.payment_status} type="payment" />
                  <Badge variant="secondary" className="text-xs capitalize">
                    {item.reservation_status}
                  </Badge>
                </div>
              </div>
              <div className="mt-auto flex items-end justify-between border-t border-dashed pt-2">
                <span className="text-muted-foreground font-mono text-xs">
                  #{item.id.substring(0, 8)}
                </span>
                <span className="text-primary text-lg font-bold">
                  {formatIDR(item.total_price)}
                </span>
              </div>
            </div>
          </CardContent>
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
  <div className="space-y-4">
    {[1, 2, 3].map((i) => (
      <div
        key={i}
        className="flex h-auto flex-col overflow-hidden rounded-xl border sm:h-40 sm:flex-row"
      >
        <Skeleton className="h-40 w-full sm:w-48" />
        <div className="flex-1 space-y-2 p-4">
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="mt-4 ml-auto h-6 w-1/4" />
        </div>
      </div>
    ))}
  </div>
);
