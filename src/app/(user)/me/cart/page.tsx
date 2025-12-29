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
import { ShoppingBag, ShoppingCart } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export const metadata = {
  title: "Troli Belanja",
};

export default async function CartPage() {
  const cartData = await getCartData();

  console.log("Cart Data:", cartData);
  
  if (!cartData || !cartData.data || cartData.data.items.length === 0) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-20">
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <ShoppingCart className="text-muted-foreground h-12 w-12" />
            </EmptyMedia>
            <EmptyTitle>Troli Belanja Kosong</EmptyTitle>
            <EmptyDescription>
              Sepertinya Anda belum menambahkan produk apapun. Yuk isi
              trolimu!
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button size="lg" asChild>
              <Link href="/services?options=products">
                Lihat Katalog Produk
              </Link>
            </Button>
          </EmptyContent>
        </Empty>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto max-w-6xl px-4 pt-5 sm:px-6">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShoppingCart className="size-10 md:size-15" />
            <h1 className="text-xl font-bold tracking-tight md:text-3xl">
              Troli Belanja
            </h1>
          </div>
          <div>
            <Link href="/services?options=products">
              <Button>
                <ShoppingBag /> Lihat Katalog Produk
              </Button>
            </Link>
          </div>
        </div>
        <Separator className="mb-8" />
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 max-w-svw">
          <div className="space-y-4 lg:col-span-2">
            {cartData.data.items.map((item) => (
              <CartItemCard key={item.cart_id} item={item} />
            ))}
          </div>
          <div className="relative lg:col-span-1">
            <CartSummary summary={cartData.data.summary} />
          </div>
        </div>
      </div>
    </div>
  );
}
