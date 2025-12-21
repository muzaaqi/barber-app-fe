import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatIDR } from "@/features/formatter";
import { CreditCard, Scissors, ShoppingBag, Wallet } from "lucide-react";

type StatsProps = {
  totalRevenue: number;
  totalHaircutOrders: number;
  totalProductOrders: number;
  countAllTransactions: number;
};

export const StatsCards = ({
  totalRevenue,
  totalHaircutOrders,
  totalProductOrders,
  countAllTransactions,
}: StatsProps) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Pendapatan
          </CardTitle>
          <Wallet className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatIDR(totalRevenue)}</div>
          <p className="text-muted-foreground text-xs">
            Dari {countAllTransactions} transaksi terakhir
          </p>
        </CardContent>
      </Card>
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Layanan Potong</CardTitle>
          <Scissors className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalHaircutOrders}</div>
          <p className="text-muted-foreground text-xs">
            Total reservasi selesai/aktif
          </p>
        </CardContent>
      </Card>
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Penjualan Produk
          </CardTitle>
          <ShoppingBag className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalProductOrders}</div>
          <p className="text-muted-foreground text-xs">Total produk terjual</p>
        </CardContent>
      </Card>
      <Card className="shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Rata-rata Order</CardTitle>
          <CreditCard className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {countAllTransactions > 0
              ? formatIDR(totalRevenue / countAllTransactions)
              : formatIDR(0)}
          </div>
          <p className="text-muted-foreground text-xs">
            Nilai rata-rata per transaksi
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
