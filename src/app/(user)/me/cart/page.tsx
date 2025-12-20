import { getCartData } from "@/actions/management/cart";
import CartItemCard from "@/components/user/cart-item-card"; 
import CartSummary from "@/components/user/cart-summary"; 
import { AlertCircle, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata = {
  title: "Keranjang Belanja",
};

export default async function CartPage() {
  const cartData = await getCartData();

  if (!cartData || cartData.items.length === 0) {
    return (
      <div className="container max-w-4xl mx-auto py-20 px-4 text-center">
        <div className="flex justify-center mb-6">
          <div className="h-24 w-24 bg-muted rounded-full flex items-center justify-center">
            <ShoppingCart className="h-10 w-10 text-muted-foreground" />
          </div>
        </div>
        <h1 className="text-2xl font-bold mb-2">Keranjang Anda Kosong</h1>
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
    <div className="bg-background min-h-screen pb-20 pt-8">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl font-bold tracking-tight mb-8 flex items-center gap-2">
          <ShoppingCart className="h-8 w-8" />
          Keranjang Belanja
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartData.items.map((item) => (
              <CartItemCard key={item.cart_id} item={item} />
            ))}
          </div>
          <div className="lg:col-span-1">
            <CartSummary summary={cartData.summary} />
          </div>
        </div>
      </div>
    </div>
  );
}