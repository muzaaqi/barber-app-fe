"use server";

import getAuthHeader from "@/features/get-jwt-token";
import { jwtBergasAPI } from "@/lib/axios-instance";
import { HaircutPayload } from "@/types/transactions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const addNewHaircutTransaction = async (payload: HaircutPayload) => {
  const token = await getAuthHeader();
  if (!token) {
    return redirect("/login");
  }
  try {
    const res = await jwtBergasAPI.post("/haircut-transactions/", payload);
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

const getHaircutTransactions = async (page?: number, limit?: number) => {
  try {
    const res = await jwtBergasAPI.get(
      `/haircut-transactions${page !== undefined && limit !== undefined ? `?page=${page}&limit=${limit}` : ""}`,
    );
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
    const res = await jwtBergasAPI.get(`/haircut-transactions/${id}`);
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
    const res = await jwtBergasAPI.get(
      `/haircut-transactions/user?page=${page}&limit=${limit}`,
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
    const res = await jwtBergasAPI.put(`/haircut-transactions/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Permission-Key": process.env.SECRET_API_KEY || "",
      },
    });

    if (res.status !== 200) throw new Error("Gagal update status");
    revalidatePath("/dashboard/transactions/haircuts");

    return {
      success: true,
      message: `Berhasil mengubah ${field === "payment_status" ? "status pembayaran" : "status reservasi"}`,
    };
  } catch {
    return {
      success: false,
      message: "Gagal mengubah status",
    };
  }
};

const deleteHaircutTransaction = async (id: string) => {
  try {
    const res = await jwtBergasAPI.delete(`/haircut-transactions/${id}`);
    if (res.status !== 200) {
      throw new Error("Failed to delete haircut transaction");
    }
    revalidatePath("/dashboard/transactions/haircuts");
    return {
      success: true,
      message: "Berhasil menghapus transaksi potong rambut",
    };
  } catch (error) {
    console.error("Failed to delete haircut transaction:", error);
    return {
      success: false,
      message: "Gagal menghapus transaksi potong rambut",
    };
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
