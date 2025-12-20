"use server";

import { api } from "@/lib/axios-instance";
import { revalidatePath } from "next/cache";
import { CartResponse } from "@/types/cart";
import getAuthHeader from "@/features/get-jwt-token";

export async function getCartData(): Promise<CartResponse | null> {
  try {
    const token = await getAuthHeader();
    const res = await api.get("/carts/", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.data;
  } catch (error) {
    console.error("Failed to fetch cart:", error);
    return null;
  }
}

export async function updateCartQuantity(cartId: string, quantity: number) {
  try {
    const token = await getAuthHeader();
    await api.put(
      `/carts/${cartId}`,
      { quantity },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    revalidatePath("/cart");
    return { success: true };
  } catch {
    return { success: false, message: "Gagal update quantity" };
  }
}

export async function deleteCartItem(cartId: string) {
  try {
    const token = await getAuthHeader();
    await api.delete(`/carts/${cartId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    revalidatePath("/cart");
    return { success: true };
  } catch {
    return { success: false, message: "Gagal menghapus item" };
  }
}