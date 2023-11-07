export type Role = "ROLE_USER" | "ROLE_ADMIN"

export interface User {
    id: number;
    fullName: string;
    email: string;
    role: Role;
}