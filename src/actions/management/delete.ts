"use server";

import { jwtBergasAPI } from "@/lib/axios-instance";

const deleteItem = async (id: string, variant: string) => {
  try {
    const res = await jwtBergasAPI.delete(
      `/${variant === "haircut" ? "haircuts" : "products"}/${id}`,
    );
    return res;
  } catch (error) {
    console.error("Error deleting item:", error);
    throw error;
  }
};

export { deleteItem };
