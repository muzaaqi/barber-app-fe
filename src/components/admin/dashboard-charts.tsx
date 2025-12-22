"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { formatIDR } from "@/features/formatter";

const chartConfig = {
  total: {
    label: "Pendapatan",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

type ChartData = {
  date: string;
  total: number;
};

export const RevenueChart = ({ data }: { data: ChartData[] }) => {
  return (
    <Card className="col-span-4 shadow-sm max-w-md md:max-w-full">
      <CardHeader>
        <CardTitle>Pendapatan 7 Hari Terakhir</CardTitle>
        <CardDescription>
          Analisis gabungan transaksi layanan dan produk.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
          <BarChart accessibilityLayer data={data} >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value}
            />
            <ChartTooltip
              cursor={{ fill: "hsl(var(--muted)/0.4)" }}
              content={
                <ChartTooltipContent
                  hideLabel
                  formatter={(value) => (
                    <div className="text-muted-foreground flex min-w-[130px] items-center gap-2 text-xs">
                      Total
                      <span className="text-foreground ml-auto font-mono font-medium">
                        {formatIDR(Number(value))}
                      </span>
                    </div>
                  )}
                />
              }
            />
            <Bar
              dataKey="total"
              fill="var(--color-total)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
