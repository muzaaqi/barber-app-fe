"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { Trash2, Minus, Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { updateCartQuantity, deleteCartItem } from "@/actions/management/cart";
import { CartItem } from "@/types/cart";
import { formatIDR } from "@/features/formatter";
import { toast } from "sonner";

export default function CartItemCard({ item }: { item: CartItem }) {
  const [isPending, startTransition] = useTransition();
  const [optimisticQty, setOptimisticQty] = useState(item.quantity);

  const handleUpdate = (newQty: number) => {
    if (newQty < 1 || newQty > item.max_stock) return;
    
    setOptimisticQty(newQty);

    startTransition(async () => {
      const res = await updateCartQuantity(item.cart_id, newQty);
      if (!res.success) {
        toast.error(res.message);
        setOptimisticQty(item.quantity);
      }
    });
  };

  const handleDelete = () => {
    startTransition(async () => {
      const res = await deleteCartItem(item.cart_id);
      if (res.success) {
        toast.success("Item dihapus dari keranjang");
      } else {
        toast.error(res.message);
      }
    });
  };

  return (
    <Card className="mb-4 overflow-hidden border shadow-sm">
      <CardContent className="sm:flex">
        <div className="relative h-32 w-full shrink-0 bg-muted sm:w-32">
          <Image
            src={item.product_image || "/placeholder.jpg"}
            alt={item.product_name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-1 flex-col justify-between p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-semibold text-lg line-clamp-1">{item.product_name}</h3>
              <p className="text-sm text-muted-foreground">
                Harga: {formatIDR(item.price)}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-destructive hover:bg-destructive/10"
              onClick={handleDelete}
              disabled={isPending}
            >
              {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
            </Button>
          </div>
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center gap-3 border rounded-lg px-2 py-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => handleUpdate(optimisticQty - 1)}
                disabled={optimisticQty <= 1 || isPending}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="text-sm font-medium w-4 text-center">
                {optimisticQty}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => handleUpdate(optimisticQty + 1)}
                disabled={optimisticQty >= item.max_stock || isPending}
              >
                <Plus className="h-3 w-3" />
              </Button>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Subtotal</p>
              <p className="font-bold text-primary">
                {formatIDR(item.price * optimisticQty)}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}