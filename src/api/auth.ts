import type { User, Address } from "../types/user";
import { jwtDecode } from "jwt-decode";

const JWT_SECRET = "your-secret-key"; // في التطبيق الحقيقي، يجب أن يكون هذا متغير بيئي

// Mock users data
let mockUsers: User[] = [
  {
    id: "1",
    email: "user@example.com",
    name: "Test User",
    isEmailVerified: true,
    addresses: [
      {
        id: "1",
        street: "123 Main St",
        city: "Cairo",
        state: "Cairo",
        country: "Egypt",
        zipCode: "12345",
        phone: "+201234567890",
        isDefault: true,
      },
    ],
    phone: "+201234567890",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Simple token generation (in a real app, this would be done by the backend)
const generateToken = (payload: { userId: string; email: string }): string => {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payloadStr = btoa(JSON.stringify(payload));
  const signature = btoa(JWT_SECRET);
  const token = `${header}.${payloadStr}.${signature}`;
  console.log("Generated token:", token);
  return token;
};

export const authAPI = {
  login: async (email: string): Promise<{ token: string; user: User }> => {
    const user = mockUsers.find((u) => u.email === email);
    if (!user) throw new Error("User not found");

    const token = generateToken({ userId: user.id, email: user.email });
    console.log("Login - Generated token:", token);
    return { token, user };
  },

  register: async (
    email: string,
    password: string,
    name: string
  ): Promise<{ token: string; user: User }> => {
    const existingUser = mockUsers.find((u) => u.email === email);
    if (existingUser) throw new Error("User already exists");

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name,
      isEmailVerified: false,
      addresses: [],
      phone: "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockUsers = [...mockUsers, newUser];
    const token = generateToken({ userId: newUser.id, email: newUser.email });
    console.log("Register - Generated token:", token);
    return { token, user: newUser };
  },

  validateToken: async (token: string): Promise<User> => {
    try {
      console.log("Validating token:", token);
      if (!token) {
        console.error("No token provided");
        throw new Error("Invalid token");
      }

      const decoded = jwtDecode<{ userId: string; email: string }>(token);
      console.log("Decoded token:", decoded);

      if (!decoded || !decoded.userId) {
        console.error("Invalid token structure");
        throw new Error("Invalid token");
      }

      // Get user from localStorage first
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          if (parsedUser && parsedUser.id === decoded.userId) {
            // Add to mockUsers if not exists
            if (!mockUsers.find((u) => u.id === parsedUser.id)) {
              mockUsers.push(parsedUser);
            }
            return parsedUser;
          }
        } catch (e) {
          console.error("Error parsing stored user:", e);
        }
      }

      // Fallback to mockUsers
      const user = mockUsers.find((u) => u.id === decoded.userId);
      if (!user) {
        console.error("User not found for token");
        throw new Error("Invalid token");
      }

      return user;
    } catch (error) {
      console.error("Token validation error:", error);
      throw new Error("Invalid token");
    }
  },

  updateProfile: async (data: Partial<User>): Promise<User> => {
    const token = localStorage.getItem("token");
    console.log("Update profile - Using token:", token);
    if (!token) throw new Error("Not authenticated");

    try {
      const decoded = jwtDecode<{ userId: string }>(token);
      console.log("Update profile - Decoded token:", decoded);
      const userIndex = mockUsers.findIndex((u) => u.id === decoded.userId);
      console.log("Update profile - User index:", userIndex);
      if (userIndex === -1) throw new Error("User not found");

      const updatedUser = {
        ...mockUsers[userIndex],
        ...data,
        updatedAt: new Date().toISOString(),
      };

      mockUsers[userIndex] = updatedUser;
      console.log("Update profile - Updated user:", updatedUser);
      return updatedUser;
    } catch (error) {
      console.error("Update profile error:", error);
      throw new Error("Invalid token");
    }
  },

  updateAddress: async (
    addressId: string,
    data: Partial<Address>
  ): Promise<User> => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Not authenticated");

    try {
      const decoded = jwtDecode<{ userId: string }>(token);
      const userIndex = mockUsers.findIndex((u) => u.id === decoded.userId);
      if (userIndex === -1) throw new Error("User not found");

      const addressIndex = mockUsers[userIndex].addresses.findIndex(
        (a: Address) => a.id === addressId
      );
      if (addressIndex === -1) throw new Error("Address not found");

      const updatedAddress = {
        ...mockUsers[userIndex].addresses[addressIndex],
        ...data,
      };

      mockUsers[userIndex].addresses[addressIndex] = updatedAddress;
      mockUsers[userIndex].updatedAt = new Date().toISOString();

      return mockUsers[userIndex];
    } catch {
      throw new Error("Invalid token");
    }
  },

  addAddress: async (address: Address): Promise<User> => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Not authenticated");

    try {
      const decoded = jwtDecode<{ userId: string }>(token);
      const userIndex = mockUsers.findIndex((u) => u.id === decoded.userId);
      if (userIndex === -1) throw new Error("User not found");

      if (address.isDefault) {
        mockUsers[userIndex].addresses.forEach(
          (a: Address) => (a.isDefault = false)
        );
      }

      mockUsers[userIndex].addresses.push(address);
      mockUsers[userIndex].updatedAt = new Date().toISOString();

      return mockUsers[userIndex];
    } catch {
      throw new Error("Invalid token");
    }
  },

  removeAddress: async (addressId: string): Promise<User> => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Not authenticated");

    try {
      const decoded = jwtDecode<{ userId: string }>(token);
      const userIndex = mockUsers.findIndex((u) => u.id === decoded.userId);
      if (userIndex === -1) throw new Error("User not found");

      const addressIndex = mockUsers[userIndex].addresses.findIndex(
        (a: Address) => a.id === addressId
      );
      if (addressIndex === -1) throw new Error("Address not found");

      const wasDefault = mockUsers[userIndex].addresses[addressIndex].isDefault;
      mockUsers[userIndex].addresses.splice(addressIndex, 1);

      if (wasDefault && mockUsers[userIndex].addresses.length > 0) {
        mockUsers[userIndex].addresses[0].isDefault = true;
      }

      mockUsers[userIndex].updatedAt = new Date().toISOString();
      return mockUsers[userIndex];
    } catch {
      throw new Error("Invalid token");
    }
  },

  requestPasswordReset: async (email: string): Promise<void> => {
    const user = mockUsers.find((u) => u.email === email);
    if (!user) throw new Error("User not found");
  },

  resetPassword: async (token: string): Promise<void> => {
    try {
      const decoded = jwtDecode<{ userId: string }>(token);
      const user = mockUsers.find((u) => u.id === decoded.userId);
      if (!user) throw new Error("User not found");
    } catch {
      throw new Error("Invalid token");
    }
  },

  verifyEmail: async (token: string): Promise<User> => {
    try {
      const decoded = jwtDecode<{ userId: string }>(token);
      const userIndex = mockUsers.findIndex((u) => u.id === decoded.userId);
      if (userIndex === -1) throw new Error("User not found");

      mockUsers[userIndex].isEmailVerified = true;
      mockUsers[userIndex].updatedAt = new Date().toISOString();

      return mockUsers[userIndex];
    } catch {
      throw new Error("Invalid token");
    }
  },

  resendVerificationEmail: async (): Promise<void> => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Not authenticated");

    try {
      const decoded = jwtDecode<{ userId: string }>(token);
      const user = mockUsers.find((u) => u.id === decoded.userId);
      if (!user) throw new Error("User not found");
      if (user.isEmailVerified) throw new Error("Email already verified");
    } catch {
      throw new Error("Invalid token");
    }
  },
};
