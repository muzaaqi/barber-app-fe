"use server";

import { bergasAPI, jwtBergasAPI } from "@/lib/axios-instance";
import { ProductType } from "@/types/products";
import { revalidatePath } from "next/cache";

const getAllProducts = async (page: number, limit: number) => {
  try {
    const res = await bergasAPI.get(`/products?page=${page}&limit=${limit}`);
    if (res.status !== 200) {
      throw new Error("Failed to fetch products");
    }
    return {
      data: res.data.data.data as ProductType[],
      pagination: res.data.data.pagination,
      success: true,
      message: "Berhasil mengambil semua data produk",
    };
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return {
      success: false,
      message: "Gagal mengambil data produk",
    };
  }
};

const getProductById = async (id: string) => {
  try {
    const res = await bergasAPI.get(`/products/${id}`);
    if (res.status !== 200) {
      throw new Error("Failed to fetch product");
    }
    return {
      data: res.data.data,
      success: true,
      message: "Berhasil mengambil data produk",
    };
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return {
      success: false,
      message: "Gagal mengambil data produk",
    };
  }
};

const deleteProductById = async (id: string) => {
  try {
    const res = await jwtBergasAPI.delete(`/products/${id}`);
    if (res.status !== 200) {
      throw new Error("Failed to delete product");
    }
    revalidatePath("/dashboard/products");
    return { success: true, message: "Produk berhasil dihapus" };
  } catch (error) {
    console.error("Failed to delete product:", error);
    return { success: false, message: "Gagal menghapus produk" };
  }
};

export { getAllProducts, getProductById, deleteProductById };
