"use server";

import getAuthHeader from "@/features/get-jwt-token";
import { api } from "@/lib/axios-instance";
import { ProductsType } from "@/types/products";

const getAllProducts = async (page: number, limit: number) => {
  try {
    const res = await api.get(`/products?page=${page}&limit=${limit}`);
    if (res.status !== 200) {
      throw new Error("Failed to fetch products");
    }
    return {
      data: res.data.data.data as ProductsType[],
      pagination: res.data.data.pagination,
      message: "Berhasil mengambil semua data produk",
    };
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return null;
  }
};

const getProductById = async (id: string) => {
  try {
    const res = await api.get(`/products/${id}`);
    if (res.status !== 200) {
      throw new Error("Failed to fetch product");
    }
    return { data: res.data.data, message: "Berhasil mengambil data produk" };
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return null;
  }
};

const deleteProductById = async (id: string) => {
  try {
    const res = await api.delete(`/products/${id}`, {
      headers: { Authorization: `Bearer ${await getAuthHeader()}` },
    });
    if (res.status !== 200) {
      throw new Error("Failed to delete product");
    }
    return { success: true, message: "Produk berhasil dihapus" };
  } catch (error) {
    console.error("Failed to delete product:", error);
    return { success: false, message: "Gagal menghapus produk" };
  }
};

export { getAllProducts, getProductById, deleteProductById };
