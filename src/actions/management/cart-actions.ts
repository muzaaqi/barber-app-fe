"use server";

import { api } from "@/lib/axios-instance";
import { revalidatePath } from "next/cache";
import { CartCheckoutPayload, CartResponse } from "@/types/cart";
import getAuthHeader from "@/features/get-jwt-token";

const getCartData = async (): Promise<CartResponse | null> => {
  try {
    const res = await api.get("/carts/", {
      headers: { Authorization: `Bearer ${await getAuthHeader()}` },
    });
    if (res.status !== 200) {
      return { success: false, message: "Gagal mengambil data troli" };
    }
    return {
      data: res.data.data,
      success: true,
      message: "Berhasil mengambil data troli",
    };
  } catch (error) {
    console.error("Failed to fetch cart:", error);
    return {
      success: false,
      message: "Gagal mengambil data troli",
    }
  }
};

const addToCart = async (productId: string, quantity: number) => {
  try {
    const res = await api.post(
      "/carts",
      { product_id: productId, quantity },
      { headers: { Authorization: `Bearer ${await getAuthHeader()}` } },
    );
    if (res.status !== 200) {
      throw new Error("Failed to add to cart");
    }
    revalidatePath("/cart");
    return { success: true, message: "Berhasil menambahkan ke troli" };
  } catch {
    return { success: false, message: "Gagal menambahkan ke troli" };
  }
};

const updateCartQuantity = async (cartId: string, quantity: number) => {
  try {
    const res = await api.put(
      `/carts/${cartId}`,
      { quantity },
      { headers: { Authorization: `Bearer ${await getAuthHeader()}` } },
    );
    if (res.status !== 200) {
      throw new Error("Failed to update cart quantity");
    }
    revalidatePath("/cart");
    return { success: true, message: "Berhasil update quantity" };
  } catch {
    return { success: false, message: "Gagal update quantity" };
  }
};

const deleteCartItem = async (cartId: string) => {
  try {
    const res = await api.delete(`/carts/${cartId}`, {
      headers: { Authorization: `Bearer ${await getAuthHeader()}` },
    });
    if (res.status !== 200) {
      throw new Error("Failed to delete cart item");
    }
    revalidatePath("/cart");
    return { success: true };
  } catch {
    return { success: false, message: "Gagal menghapus item" };
  }
};

const checkoutCart = async (payload: CartCheckoutPayload) => {
  try {
    const res = await api.post("/product-transactions", payload, {
      headers: { Authorization: `Bearer ${await getAuthHeader()}` },
    });
    if (res.status !== 200) {
      throw new Error("Failed to checkout cart");
    }
    revalidatePath("/cart");
    return { success: true };
  } catch {
    return { success: false, message: "Gagal checkout troli" };
  }
};

export {
  getCartData,
  addToCart,
  updateCartQuantity,
  deleteCartItem,
  checkoutCart,
};
