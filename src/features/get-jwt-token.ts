"use server";
import { cookies } from "next/headers";

export default async function getAuthHeader() {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("token")?.value;
  return token;
}
