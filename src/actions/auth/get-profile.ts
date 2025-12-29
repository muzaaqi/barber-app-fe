"use server";

import getAuthHeader from "@/features/get-jwt-token";
import { jwtBergasAPI } from "@/lib/axios-instance";
import { cookies } from "next/headers";

const getAllUsers = async (page: number, limit: number) => {
  const token = await getAuthHeader();

  if (!token) return null;

  try {
    const res = await jwtBergasAPI.get(`user?page=${page}&limit=${limit}`);

    if (res.status !== 200) return null;

    return { data: res.data.data.data, pagination: res.data.data.pagination };
  } catch {
    return null;
  }
};

const getProfile = async () => {
  const token = await getAuthHeader();

  if (!token) return null;
  const res = await jwtBergasAPI.get("/user/me");

  if (res.status !== 200) return null;

  return res.data.data;
};

const updateProfile = async (payload: { name: string }) => {
  const token = await getAuthHeader();
  if (!token) return { success: false, message: "Unauthorized" };

  try {
    const res = await jwtBergasAPI.put("/user/me", payload);
    if (res.status !== 200) {
      return { success: false, message: "Gagal memperbarui profil." };
    }
    return { success: true, message: "Profil berhasil diperbarui." };
  } catch {
    return { success: false, message: "Gagal memperbarui profil." };
  }
};

const changePassword = async (payload: {
  current_password: string;
  new_password: string;
}) => {
  const token = await getAuthHeader();

  if (!token) return { success: false, message: "Unauthorized" };

  try {
    const res = await jwtBergasAPI.put("/user/me/password", payload);
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
    return { success: true, message: "Berhasil logout." };
  } catch {
    return { success: false, message: "Gagal logout." };
  }
};

export { getAllUsers, getProfile, updateProfile, changePassword, logOutAction };
