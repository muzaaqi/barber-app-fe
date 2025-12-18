"use server";

import { api } from "@/lib/axios-instance";
import { cookies } from "next/headers";

export async function getProfile() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token")?.value || "";

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
