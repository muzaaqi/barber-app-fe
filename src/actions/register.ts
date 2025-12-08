// "use server";

// import { api } from "@/lib/axios-instance";
// import axios from "axios";

// export async function registerAction(name: string, email: string, password: string) {
//   try {
//     const res = await api.post("user/register", {
//       name,
//       email,
//       password,
//     });

//     return { success: true, message: "Akun berhasil dibuat." };
//   } catch (err: unknown) {
//     return {
//       success: false,
//       message: axios.isAxiosError(err) ? err.response?.data?.message || "Registrasi gagal." : "Registrasi gagal.",
//     };
//   }
// }
