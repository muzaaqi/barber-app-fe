import Link from "next/link";
import { getCartData } from "@/actions/management/cart-actions";
import CartItemCard from "@/components/user/cart-item-card";
import CartSummary from "@/components/user/cart-summary";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

export const metadata = {
  title: "Keranjang Belanja",
};

export default async function CartPage() {
  const cartData = await getCartData();

  if (!cartData || cartData.items.length === 0) {
    return (
      <div className="container max-w-4xl mx-auto py-20 px-4">
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <ShoppingCart className="h-12 w-12 text-muted-foreground" />
            </EmptyMedia>
            <EmptyTitle>Keranjang Belanja Kosong</EmptyTitle>
            <EmptyDescription>
              Sepertinya Anda belum menambahkan produk apapun. Yuk isi keranjangmu!
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button size="lg" asChild>
              <Link href="/services?options=products">Lihat Katalog Produk</Link>
            </Button>
          </EmptyContent>
        </Empty>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen pt-8 pb-20">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        <h1 className="mb-8 flex items-center gap-4 text-3xl font-bold tracking-tight">
          <ShoppingCart className="h-8 w-8" />
          Keranjang Belanja
        </h1>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {cartData.items.map((item) => (
              <CartItemCard key={item.cart_id} item={item} />
            ))}
          </div>
          <div className="relative lg:col-span-1">
            <CartSummary summary={cartData.summary} />
          </div>
        </div>
      </div>
    </div>
  );
}
