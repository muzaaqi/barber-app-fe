"use server";

import getAuthHeader from "@/features/get-jwt-token";
import { api } from "@/lib/axios-instance";
import { ProductType } from "@/types/products";

const getAllProducts = async (page: number, limit: number) => {
  try {
    const res = await api.get(`/products?page=${page}&limit=${limit}`, {
      headers: {
        "Permission-Key": process.env.SECRET_API_KEY || "",
      },
    });
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
    const res = await api.get(`/products/${id}`, {
      headers: {
        "Permission-Key": process.env.SECRET_API_KEY || "",
      },
    });
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
    const res = await api.delete(`/products/${id}`, {
      headers: {
        Authorization: `Bearer ${await getAuthHeader()}`,
        "Permission-Key": process.env.SECRET_API_KEY || "",
      },
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
