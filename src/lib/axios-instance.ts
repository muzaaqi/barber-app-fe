import getAuthHeader from "@/features/get-jwt-token";
import axios from "axios";

const bergasAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  validateStatus: () => true,
  headers: {
    "Permission-Key": process.env.NEXT_PUBLIC_SECRET_API_KEY || "",
  },
});

const jwtBergasAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  validateStatus: () => true,
  headers: {
    "Permission-Key": process.env.NEXT_PUBLIC_SECRET_API_KEY || "",
  },
});

jwtBergasAPI.interceptors.request.use(async (config) => {
  try {
    const token = await getAuthHeader();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch {
  }
  return config;
});

export { bergasAPI, jwtBergasAPI };
