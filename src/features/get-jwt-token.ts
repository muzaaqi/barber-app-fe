"use server";
import { cookies } from "next/headers";

export default async function getAuthHeader() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token")?.value;
  if (!token) {
    return null;
  }
  return token;
}
