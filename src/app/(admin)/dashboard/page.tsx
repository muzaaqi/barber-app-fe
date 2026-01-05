import { getHaircutTransactions } from "@/actions/management/haircut-transaction-actions";
import { getProductTransactions } from "@/actions/management/product-transaction-actions";
import { RevenueChart } from "@/components/admin/dashboard-charts";
import { StatsCards } from "@/components/admin/stats-cards";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatIDR } from "@/features/formatter";
import { LayoutDashboardIcon } from "lucide-react";

interface HaircutTransaction {
  id: string;
  total_price: number;
  reservation_time?: string;
  created_at?: string;
  payment_status?: string;
  user?: {
    name?: string;
    image_url?: string;
  };
  haircut?: {
    name?: string;
  };
}

interface ProductTransaction {
  id: string;
  total_price: number;
  created_at?: string;
  payment_status?: string;
  user?: {
    name?: string;
    image_url?: string;
  };
}

export default async function DashboardPage() {
  const [haircutRes, productRes] = await Promise.all([
    getHaircutTransactions(undefined, 100),
    getProductTransactions(undefined, 100),
  ]);

  const haircuts = haircutRes?.data || [];
  const products = productRes?.data || [];
  const totalHaircutRevenue = haircuts.reduce(
    (acc: number, curr: HaircutTransaction) => acc + curr.total_price,
    0,
  );
  const totalProductRevenue = products.reduce(
    (acc: number, curr: ProductTransaction) => acc + curr.total_price,
    0,
  );

  const totalRevenue = totalHaircutRevenue + totalProductRevenue;
  const totalTxCount = haircuts.length + products.length;
  const allTransactions = [
    ...haircuts.map((h: HaircutTransaction) => ({
      date: new Date(h.reservation_time || h.created_at || new Date())
        .toISOString()
        .split("T")[0],
      amount: h.total_price,
    })),
    ...products.map((p: ProductTransaction) => ({
      date: new Date(p.created_at || new Date()).toISOString().split("T")[0],
      amount: p.total_price,
    })),
  ];
  const groupedData: Record<string, number> = {};
  allTransactions.forEach((trx) => {
    if (groupedData[trx.date]) {
      groupedData[trx.date] += trx.amount;
    } else {
      groupedData[trx.date] = trx.amount;
    }
  });
  const chartData = Object.keys(groupedData)
    .sort()
    .slice(-7)
    .map((date) => ({
      date: new Date(date).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
      }),
      total: groupedData[date],
    }));
  const recentSales = [
    ...haircuts.map((h: HaircutTransaction) => ({
      ...h,
      type: "Layanan" as const,
      date: h.reservation_time,
    })),
    ...products.map((p: ProductTransaction) => ({
      ...p,
      type: "Produk" as const,
      date: p.created_at || new Date().toISOString(),
    })),
  ]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <div className="flex-1 space-y-6 p-4 pt-6 md:p-8 max-w-screen mx-auto">
      <div className="flex items-center">
        <LayoutDashboardIcon className="mr-2 size-10" />
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <StatsCards
        totalRevenue={totalRevenue}
        totalHaircutOrders={haircuts.length}
        totalProductOrders={products.length}
        countAllTransactions={totalTxCount}
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <RevenueChart data={chartData} />
        <Card className="col-span-4 shadow-sm lg:col-span-3">
          <CardHeader>
            <CardTitle>Transaksi Terbaru</CardTitle>
            <CardDescription>
              5 transaksi terakhir yang masuk sistem.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {recentSales.map((sale, i: number) => (
                <div className="flex items-center" key={i}>
                  <Avatar className="h-9 w-9 border">
                    <AvatarImage src={sale.user?.image_url} alt="Avatar" />
                    <AvatarFallback>
                      {sale.user?.name?.[0] || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm leading-none font-medium">
                      {sale.user?.name}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {sale.type === "Layanan"
                        ? sale.haircut?.name
                        : "Pembelian Produk"}
                    </p>
                  </div>
                  <div className="ml-auto text-sm font-medium">
                    +{formatIDR(sale.total_price)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
