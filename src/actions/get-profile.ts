"use server";

import { cookies } from "next/headers";
import { jwtAPI } from "@/lib/axios-auth";

export async function getProfile() {
  const token = (await cookies()).get("token")?.value;

  if (!token) return null;

  const api = jwtAPI(token);
  const res = await api.get("/user/me");

  if (res.status !== 200) return null;

  return res.data.data;
}
