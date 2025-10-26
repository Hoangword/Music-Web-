// src/Admin/types/User.ts
export type Role = "USER" | "ADMIN";
export interface RoleResponse {
  id?: string;
  name: string;
  description?: string;
}

export interface User {
  id: string;
  username: string;
  firstName?: string;
  lastName?: string;
  email: string;
  dob?: string;
  roles: RoleResponse[];
   enabled?: boolean;
}
