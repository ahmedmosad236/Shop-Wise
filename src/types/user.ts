import { z } from "zod";

// Zod schema for user validation
export const UserSchema = z.object({
  id: z.string(),
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(["user", "admin"]).default("user"),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

// Zod schema for user login
export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

// Zod schema for user registration
export const RegisterSchema = z
  .object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

// TypeScript types derived from the Zod schemas
export type UserSchemaType = z.infer<typeof UserSchema>;
export type LoginCredentials = z.infer<typeof LoginSchema>;
export type RegisterData = z.infer<typeof RegisterSchema>;

export interface User {
  id: string;
  email: string;
  name: string;
  isEmailVerified: boolean;
  addresses: Address[];
  phone?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  phone: string;
  isDefault: boolean;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}
