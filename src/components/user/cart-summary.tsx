"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatIDR } from "@/features/formatter";
import { CartSummary as SummaryType } from "@/types/cart";
import CartCheckoutDialog from "./cart-checkout-dialog";

export default function CartSummary({ summary }: { summary: SummaryType }) {
  return (
    <Card className="fixed right-4 bottom-5 left-4 z-50 h-fit w-auto shadow-sm lg:sticky lg:top-24 lg:right-auto lg:bottom-auto lg:left-auto lg:w-full">
      <CardHeader className="hidden md:block">
        <CardTitle className="text-primary text-lg md:text-2xl">
          Ringkasan Belanja
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 md:space-y-4">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Total Item</span>
          <span className="font-medium">{summary.total_items} barang</span>
        </div>
        <Separator />
        <div className="flex items-center justify-between">
          <span className="text-md md:text-lg font-bold">Total Harga</span>
          <span className="text-primary text-lg md:text-xl font-bold">
            {formatIDR(summary.grand_total)}
          </span>
        </div>
      </CardContent>
      <CardFooter className="">
        <CartCheckoutDialog
          totalItems={summary.total_items}
          grandTotal={summary.grand_total}
          disabled={summary.total_items === 0}
        />
      </CardFooter>
    </Card>
  );
}
