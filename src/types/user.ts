export type UserRole = "user" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface UpdateUserPayload {
  name: string;
}

export interface ChangePasswordPayload {
  current_password: string;
  new_password: string;
}
