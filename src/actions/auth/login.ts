"use server";

import { cookies } from "next/headers";
import axios from "axios";
import { api } from "../../lib/axios-instance";

export async function loginAction(email: string, password: string) {
  try {
    const res = await api.post("/user/login", {
      email,
      password,
    }, {
      headers: {
        "Content-Type": "application/json",
        "Permission-Key": process.env.SECRET_API_KEY || "",
      },
    });
    if (res.status !== 200) {
      return { success: false, message: "Login error" };
    }
    
    const token = res.data.data.token;
    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      expires: new Date(Date.now() + 60 * 60 * 1000),
    });

    return { success: true };
  } catch (err: unknown) {
    return {
      success: false,
      message: axios.isAxiosError(err)
        ? err.response?.data?.message || "Login error"
        : "Login error",
    };
  }
}
