import { getCartData } from "@/actions/management/cart-actions";
import CartItemCard from "@/components/user/cart-item-card";
import CartSummary from "@/components/user/cart-summary";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
  title: "Keranjang Belanja",
};

export default async function CartPage() {
  const cartData = await getCartData();

  if (!cartData || cartData.items.length === 0) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-20 text-center">
        <div className="mb-6 flex justify-center">
          <div className="bg-muted flex h-24 w-24 items-center justify-center rounded-full">
            <ShoppingCart className="text-muted-foreground h-10 w-10" />
          </div>
        </div>
        <h1 className="mb-2 text-2xl font-bold">Keranjang Anda Kosong</h1>
        <p className="text-muted-foreground mb-8">
          Sepertinya Anda belum menambahkan produk apapun.
        </p>
        <Link href="/services?options=products">
          <Button size="lg">Mulai Belanja</Button>
        </Link>
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
