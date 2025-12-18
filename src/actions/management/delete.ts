"use server";
import { api } from "@/lib/axios-instance";
import { cookies } from "next/headers";

const deleteItem = async (id: string, variant: string) => {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token")?.value || "";
  try {
    const res = await api.delete(`/${variant === "haircut" ? "haircuts" : "products"}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    });
    return res;
  } catch (error) {
    console.error("Error deleting item:", error);
    throw error;
  }
};

export { deleteItem };