"use server";

import getAuthHeader from "@/features/get-jwt-token";
import { api } from "@/lib/axios-instance";
import { HaircutPayload } from "@/types/transactions";

const addNewHaircutTransaction = async (payload: HaircutPayload) => {
  try {
    const res = await api.post("/haircut-transactions", payload, {
      headers: { Authorization: `Bearer ${await getAuthHeader()}` },
    });
    if (res.status !== 201) {
      throw new Error("Failed to add haircut transaction");
    }
    return {
      data: res.data.data.data,
      success: true,
      message: "Berhasil menambahkan transaksi potong rambut",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Gagal menambahkan transaksi potong rambut",
    };
  }
};

const getHaircutTransactions = async () => {
  try {
    const res = await api.get("/haircut-transactions");
    if (res.status !== 200) {
      throw new Error("Failed to fetch haircut transactions");
    }
    return {
      data: res.data.data.data,
      pagination: res.data.data.pagination,
      message: "Berhasil mengambil data transaksi potong rambut",
    };
  } catch (error) {
    console.error("Failed to fetch haircut transactions:", error);
    return {
      success: false,
      message: "Gagal mengambil data transaksi potong rambut",
    }
  }
};

const getHaircutTransactionById = async (id: string) => {
  try {
    const res = await api.get(`/haircut-transactions/${id}`);
    if (res.status !== 200) {
      throw new Error("Failed to fetch haircut transaction");
    }
    return res.data.data;
  } catch (error) {
    console.error("Failed to fetch haircut transaction:", error);
    return {
      success: false,
      message: "Gagal mengambil data transaksi potong rambut",
    };
  }
};

const getHaircutTransactionsByUserId = async (page: number, limit: number) => {
  try {
    const res = await api.get(`/haircut-transactions/user?page=${page}&limit=${limit}`, {
      headers: { Authorization: `Bearer ${await getAuthHeader()}` },
    });
    if (res.status !== 200) {
      throw new Error("Failed to fetch user's haircut transactions");
    }
    return {
      data: res.data.data.data,
      pagination: res.data.data.pagination,
      message: "Berhasil mengambil data transaksi potong rambut user",
    }
  } catch (error) {
    console.error("Failed to fetch user's haircut transactions:", error);
    return {
      success: false,
      message: "Gagal mengambil data transaksi potong rambut user",
    }
  }
};

const updateHaircutTransactionStatus = async (id: string, status: string) => {
  try {
    const res = await api.put(
      `/haircut-transactions/${id}`,
      { status },
      { headers: { Authorization: `Bearer ${await getAuthHeader()}` } },
    );
    if (res.status !== 200) {
      throw new Error("Failed to update haircut transaction status");
    }
    return { success: true };
  } catch (error) {
    console.error("Failed to update haircut transaction status:", error);
    return { success: false, message: "Gagal mengupdate status transaksi" };
  }
};

const deleteHaircutTransaction = async (id: string) => {
  try {
    const res = await api.delete(`/haircut-transactions/${id}`, {
      headers: { Authorization: `Bearer ${await getAuthHeader()}` },
    });
    if (res.status !== 200) {
      throw new Error("Failed to delete haircut transaction");
    }
    return { success: true };
  } catch (error) {
    console.error("Failed to delete haircut transaction:", error);
    return { success: false, message: "Gagal menghapus transaksi" };
  }
};

export {
  addNewHaircutTransaction,
  getHaircutTransactions,
  getHaircutTransactionById,
  getHaircutTransactionsByUserId,
  updateHaircutTransactionStatus,
  deleteHaircutTransaction,
};
