"use server";

import { jwtBergasAPI } from "@/lib/axios-instance";
import { revalidatePath } from "next/cache";
import { CartCheckoutPayload, CartResponse } from "@/types";
import getAuthHeader from "@/features/get-jwt-token";
import { redirect } from "next/navigation";

const getCartData = async (): Promise<CartResponse | null> => {
  const token = await getAuthHeader();
  if (!token) {
    return null;
  }
  try {
    const res = await jwtBergasAPI.get("/carts");
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
    };
  }
};

const addToCart = async (productId: string, quantity: number) => {
  const token = await getAuthHeader();
  if (!token) {
    redirect("/login");
  }
  try {
    const res = await jwtBergasAPI.post("/carts", {
      product_id: productId,
      quantity,
    });
    if (res.status !== 200) {
      throw new Error("Failed to add to cart");
    }
    revalidatePath("/me/cart");
    return { success: true, message: "Berhasil menambahkan ke troli" };
  } catch {
    return { success: false, message: "Gagal menambahkan ke troli" };
  }
};

const updateCartQuantity = async (cartId: string, quantity: number) => {
  try {
    const res = await jwtBergasAPI.put(`/carts/${cartId}`, { quantity });
    if (res.status !== 200) {
      throw new Error("Failed to update cart quantity");
    }
    revalidatePath("/me/cart");
    return { success: true, message: "Berhasil update quantity" };
  } catch {
    return { success: false, message: "Gagal update quantity" };
  }
};

const deleteCartItem = async (cartId: string) => {
  try {
    const res = await jwtBergasAPI.delete(`/carts/${cartId}`);
    if (res.status !== 200) {
      throw new Error("Failed to delete cart item");
    }
    revalidatePath("/me/cart");
    return { success: true };
  } catch {
    return { success: false, message: "Gagal menghapus item" };
  }
};

const checkoutCart = async (payload: CartCheckoutPayload) => {
  try {
    const res = await jwtBergasAPI.post(
      "/product-transactions/checkout",
      payload,
    );
    if (res.status !== 201) {
      throw new Error("Failed to checkout cart");
    }
    revalidatePath("/me/cart");
    return {
      success: true,
      data: res.data.data,
      message: "Berhasil checkout troli",
    };
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
