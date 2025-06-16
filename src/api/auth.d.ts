import type { User, Address } from "../types/user";

export const authAPI: {
  login: (
    email: string,
    password: string
  ) => Promise<{ token: string; user: User }>;
  register: (
    email: string,
    password: string,
    name: string
  ) => Promise<{ token: string; user: User }>;
  validateToken: (token: string) => Promise<User>;
  updateProfile: (data: Partial<User>) => Promise<User>;
  updateAddress: (addressId: string, data: Partial<Address>) => Promise<User>;
  addAddress: (address: Address) => Promise<User>;
  removeAddress: (addressId: string) => Promise<User>;
  requestPasswordReset: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  verifyEmail: (token: string) => Promise<User>;
  resendVerificationEmail: () => Promise<void>;
};
