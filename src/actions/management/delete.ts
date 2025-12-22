"use server";
import getAuthHeader from "@/features/get-jwt-token";
import { api } from "@/lib/axios-instance";

const deleteItem = async (id: string, variant: string) => {
  try {
    const res = await api.delete(
      `/${variant === "haircut" ? "haircuts" : "products"}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${await getAuthHeader()}`,
          "Content-Type": "application/json",
          "Permission-Key": process.env.SECRET_API_KEY || "",
        },
      },
    );
    return res;
  } catch (error) {
    console.error("Error deleting item:", error);
    throw error;
  }
};

export { deleteItem };
