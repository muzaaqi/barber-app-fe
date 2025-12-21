"use server";

import getAuthHeader from "@/features/get-jwt-token";
import { api } from "@/lib/axios-instance";
import { HaircutPayload } from "@/types/transactions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const addNewHaircutTransaction = async (payload: HaircutPayload) => {
  try {
    const res = await api.post("/haircut-transactions", payload, {
      headers: { Authorization: `Bearer ${await getAuthHeader()}` },
    });
    if (res.status === 401) {
      return redirect("/login");
    }
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
    const res = await api.get("/haircut-transactions", {
      headers: { Authorization: `Bearer ${await getAuthHeader()}` },
    });
    if (res.status !== 200) {
      throw new Error("Failed to fetch haircut transactions");
    }
    return {
      data: res.data.data.data,
      pagination: res.data.data.pagination,
      success: true,
      message: "Berhasil mengambil data transaksi potong rambut",
    };
  } catch (error) {
    console.error("Failed to fetch haircut transactions:", error);
    return {
      success: false,
      message: "Gagal mengambil data transaksi potong rambut",
    };
  }
};

const getHaircutTransactionById = async (id: string) => {
  try {
    const res = await api.get(`/haircut-transactions/${id}`);
    if (res.status !== 200) {
      throw new Error("Failed to fetch haircut transaction");
    }
    return {
      data: res.data.data,
      success: true,
      message: "Berhasil mengambil data transaksi potong rambut",
    };
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
    const res = await api.get(
      `/haircut-transactions/user?page=${page}&limit=${limit}`,
      {
        headers: { Authorization: `Bearer ${await getAuthHeader()}` },
      },
    );
    if (res.status !== 200) {
      throw new Error("Failed to fetch user's haircut transactions");
    }
    return {
      data: res.data.data.data,
      pagination: res.data.data.pagination,
      success: true,
      message: "Berhasil mengambil data transaksi potong rambut user",
    };
  } catch (error) {
    console.error("Failed to fetch user's haircut transactions:", error);
    return {
      success: false,
      message: "Gagal mengambil data transaksi potong rambut user",
    };
  }
};

const updateHaircutTransactionStatus = async (
  id: string,
  field: "payment_status" | "reservation_status",
  status: string,
) => {
  try {
    const token = await getAuthHeader();
    const payload = { [field]: status };
    const res = await api.put(`/haircut-transactions/${id}`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.status !== 200) throw new Error("Gagal update status");
    revalidatePath("/dashboard/transactions/haircuts");

    return { success: true, message: `Berhasil mengubah ${field === "payment_status" ? "status pembayaran" : "status reservasi"}` };
  } catch {
    return {
      success: false,
      message: "Gagal mengubah status",
    };
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
    return { success: true, message: "Berhasil menghapus transaksi potong rambut" };
  } catch (error) {
    console.error("Failed to delete haircut transaction:", error);
    return { success: false, message: "Gagal menghapus transaksi potong rambut" };
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
