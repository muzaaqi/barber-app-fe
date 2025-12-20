"use client";

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatIDR } from "@/features/formatter";
import { CartSummary as SummaryType } from "@/types/cart";
import CartCheckoutDialog from "./cart-checkout-dialog"; 

export default function CartSummary({ summary }: { summary: SummaryType }) {
  return (
    <Card className="sticky top-24 h-fit border shadow-sm">
      <CardHeader className="bg-muted/20 pb-4">
        <CardTitle className="text-lg">Ringkasan Belanja</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 pt-6">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Total Item</span>
          <span className="font-medium">{summary.total_items} barang</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Total Harga</span>
          <span className="font-medium">{formatIDR(summary.grand_total)}</span>
        </div>
        <Separator />
        <div className="flex justify-between items-center">
          <span className="font-bold text-lg">Grand Total</span>
          <span className="font-bold text-xl text-primary">
            {formatIDR(summary.grand_total)}
          </span>
        </div>
      </CardContent>
      <CardFooter className="p-4 bg-muted/10">
        <CartCheckoutDialog 
            totalItems={summary.total_items} 
            grandTotal={summary.grand_total}
            disabled={summary.total_items === 0} 
        />
      </CardFooter>
    </Card>
  );
}