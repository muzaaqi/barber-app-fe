"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  updateCartQuantity,
  deleteCartItem,
} from "@/actions/management/cart-actions";
import { CartItem } from "@/types/cart";
import { formatIDR } from "@/features/formatter";
import { toast } from "sonner";
import ConfirmationDialog from "../confirmation-dialog";

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

  console.log("Rendering CartItemCard for item:", item);

  return (
    <Card className="mb-4 overflow-hidden border shadow-sm">
      <CardContent className="flex gap-3">
        <div className="bg-muted relative h-25 w-25 md:h-32 md:w-32 shrink-0">
          <Image
            src={item.product_image || "/placeholder.jpg"}
            alt={item.product_name}
            fill
            className="object-cover"
          />
        </div>
        <div className="flex flex-1 flex-col justify-between">
          <div className="mb-2 flex items-start justify-between">
            <div>
              <h3 className="line-clamp-1 md:text-lg font-semibold">
                {item.product_name}
              </h3>
              <p className="text-muted-foreground text-xs md:text-sm">
                Harga: {formatIDR(item.price)}
              </p>
            </div>
            <ConfirmationDialog
              onConfirm={() => deleteCartItem(item.cart_id)}
              title="Hapus Item"
              description="Apakah Anda yakin ingin menghapus item ini dari keranjang?"
              confirmText="Hapus"
              cancelText="Batal"
              successText="Item berhasil dihapus dari keranjang."
              errorText="Gagal menghapus item dari keranjang."
              variant="destructive"
              trigger={
                <Button variant="ghost" className="text-destructive">
                  <Trash2  />  
                </Button>
              }
            />
          </div>
          <div className="mt-auto flex items-center justify-between">
            <div className="flex items-center gap-3 rounded-lg border px-2 py-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={() => handleUpdate(optimisticQty - 1)}
                disabled={optimisticQty <= 1 || isPending}
              >
                <Minus className="h-3 w-3" />
              </Button>
              <span className="w-4 text-center text-sm font-medium">
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
              <p className="text-muted-foreground text-xs">Subtotal</p>
              <p className="text-primary font-bold">
                {formatIDR(item.price * optimisticQty)}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
