"use server";

import getAuthHeader from "@/features/get-jwt-token";
import { api } from "@/lib/axios-instance";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const getProfile = async () => {
  const token = await getAuthHeader();

  if (!token) return null;
  const res = await api.get("/user/me", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "Permission-Key": process.env.SECRET_API_KEY || "",
    },
  });

  if (res.status !== 200) return null;

  return res.data.data;
};

const changePassword = async (payload: {
  current_password: string;
  new_password: string;
}) => {
  const token = await getAuthHeader();

  if (!token) return { success: false, message: "Unauthorized" };

  try {
    const res = await api.post("/me/password", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "Permission-Key": process.env.SECRET_API_KEY || "",
      },
    });
    if (res.status !== 200) {
      return { success: false, message: "Gagal mengubah password." };
    }
    return { success: true, message: "Password berhasil diubah." };
  } catch {
    return { success: false, message: "Gagal mengubah password." };
  }
};

const logOutAction = async () => {
  const cookieStore = await cookies();
  if (!cookieStore.get("token"))
    return { success: false, message: "Unauthorized" };
  try {
    cookieStore.delete("token");
    return redirect("/login");
  } catch {
    return { success: false, message: "Gagal logout." };
  }
};

export { getProfile, changePassword, logOutAction };
