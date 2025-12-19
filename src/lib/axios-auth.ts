import axios from "axios";

export const jwtAPI = (token?: string) => {
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
    withCredentials: true,
    validateStatus: () => true,
  });
};
