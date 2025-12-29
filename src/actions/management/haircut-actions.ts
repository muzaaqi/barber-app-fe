"use server";

import { bergasAPI, jwtBergasAPI } from "@/lib/axios-instance";
import { revalidatePath } from "next/cache";

const getAllHaircuts = async (page: number, limit: number) => {
  try {
    const res = await bergasAPI.get(`/haircuts?page=${page}&limit=${limit}`, {
      headers: {
        "Permission-Key": process.env.NEXT_PUBLIC_SECRET_API_KEY || "",
      },
    });
    if (res.status !== 200) {
      throw new Error("Failed to fetch haircuts");
    }
    return {
      data: res.data.data.data,
      pagination: res.data.data.pagination,
      success: true,
      message: "Berhasil mengambil semua data potong rambut",
    };
  } catch (error) {
    console.error("Failed to fetch haircuts:", error);
    return {
      success: false,
      message: "Gagal mengambil data potong rambut",
    };
  }
};

const getHaircutById = async (id: string) => {
  try {
    const res = await bergasAPI.get(`/haircuts/${id}`);
    if (res.status !== 200) {
      throw new Error("Failed to fetch haircut");
    }
    return {
      data: res.data.data,
      success: true,
      message: "Berhasil mengambil data potong rambut",
    };
  } catch (error) {
    console.error("Failed to fetch haircut:", error);
    return {
      success: false,
      message: "Gagal mengambil data potong rambut",
    };
  }
};

const deleteHaircutById = async (id: string) => {
  try {
    const res = await jwtBergasAPI.delete(`/haircuts/${id}`);
    if (res.status !== 200) {
      throw new Error("Failed to delete haircut");
    }
    revalidatePath("/dashboard/haircuts");
    return { success: true, message: "Berhasil menghapus data potong rambut" };
  } catch (error) {
    console.error("Failed to delete haircut:", error);
    return {
      success: false,
      message: "Gagal menghapus data potong rambut",
    };
  }
};

export { getAllHaircuts, getHaircutById, deleteHaircutById };
