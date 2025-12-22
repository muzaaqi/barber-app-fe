"use server";

import getAuthHeader from "@/features/get-jwt-token";
import { api } from "@/lib/axios-instance";
import { ProductPayload } from "@/types/transactions";
import { revalidatePath } from "next/dist/server/web/spec-extension/revalidate";
import { redirect } from "next/navigation";

const addNewProcuctTransaction = async (payload: ProductPayload) => {
  const token = await getAuthHeader();
  if (!token) {
    return redirect("/login");
  }
  try {
    const res = await api.post("/product-transactions/checkout/", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Permission-Key": process.env.SECRET_API_KEY || "",
      },
    });
    if (res.status === 401) {
      return redirect("/login");
    }
    if (res.status !== 201) {
      throw new Error("Failed to add product transaction");
    }
    return {
      data: res.data.data.data,
      success: true,
      message: "Berhasil menambahkan transaksi produk",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Gagal menambahkan transaksi produk",
    };
  }
};

const getProductTransactions = async () => {
  try {
    const res = await api.get("/product-transactions/", {
      headers: {
        Authorization: `Bearer ${await getAuthHeader()}`,
        "Permission-Key": process.env.SECRET_API_KEY || "",
      },
    });
    if (res.status !== 200) {
      throw new Error("Failed to fetch product transactions");
    }
    return {
      data: res.data.data.data,
      pagination: res.data.data.pagination,
      success: true,
      message: "Berhasil mengambil data transaksi produk",
    };
  } catch (error) {
    console.error("Failed to fetch product transactions:", error);
    return {
      success: false,
      message: "Gagal mengambil data transaksi produk",
    };
  }
};

const getProductTransactionById = async (id: string) => {
  try {
    const res = await api.get(`/product-transactions/${id}`);
    if (res.status !== 200) {
      throw new Error("Failed to fetch product transaction");
    }
    return {
      data: res.data.data.data,
      success: true,
      message: "Berhasil mengambil data transaksi produk",
    };
  } catch (error) {
    console.error("Failed to fetch product transaction:", error);
    return {
      success: false,
      message: "Gagal mengambil data transaksi produk",
    };
  }
};

const updateProductTransactionStatus = async (
  id: string,
  field: "payment_status" | "expedition_status",
  status: string,
) => {
  try {
    const payload = { [field]: status };

    const res = await api.put(`/product-transactions/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${await getAuthHeader()}`,
        "Permission-Key": process.env.SECRET_API_KEY || "",
      },
    });

    if (res.status !== 200) throw new Error("Gagal update status");

    revalidatePath("/dashboard/transactions/products");

    return {
      success: true,
      message: `Berhasil mengubah ${field === "payment_status" ? "status pembayaran" : "status pengiriman"}`,
    };
  } catch {
    return {
      success: false,
      message: "Gagal mengubah status",
    };
  }
};

const getProductTransactionsByUserId = async (page: number, limit: number) => {
  try {
    const res = await api.get(
      `/product-transactions/me?page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${await getAuthHeader()}`,
          "Permission-Key": process.env.SECRET_API_KEY || "",
        },
      },
    );
    if (res.status !== 200) {
      throw new Error("Failed to fetch product transactions by user");
    }
    return {
      data: res.data.data.data,
      pagination: res.data.data.pagination,
      success: true,
      message: "Berhasil mengambil data transaksi produk",
    };
  } catch (error) {
    console.error("Failed to fetch product transactions by user:", error);
    return {
      success: false,
      message: "Gagal mengambil data transaksi produk",
    };
  }
};

const deleteHaircutTransaction = async (id: string) => {
  try {
    const res = await api.delete(`/haircut-transactions/${id}`, {
      headers: {
        Authorization: `Bearer ${await getAuthHeader()}`,
        "Permission-Key": process.env.SECRET_API_KEY || "",
      },
    });
    if (res.status !== 200) {
      throw new Error("Failed to delete haircut transaction");
    }
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
  addNewProcuctTransaction,
  getProductTransactions,
  getProductTransactionById,
  getProductTransactionsByUserId,
  updateProductTransactionStatus,
  deleteHaircutTransaction,
};
