"use server";

import getAuthHeader from "@/features/get-jwt-token";
import { api } from "@/lib/axios-instance";

export async function getProfile() {
  const token = await getAuthHeader();

  if (!token) return null;
  const res = await api.get("/user/me", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (res.status !== 200) return null;

  return res.data.data;
}
