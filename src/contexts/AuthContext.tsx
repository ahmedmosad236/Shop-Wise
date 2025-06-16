import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import type { User, Address } from "../types/user";
import { authAPI } from "../api/auth.js";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<User>;
  updateAddress: (addressId: string, data: Partial<Address>) => Promise<User>;
  addAddress: (address: Address) => Promise<User>;
  removeAddress: (addressId: string) => Promise<User>;
  requestPasswordReset: (email: string) => Promise<void>;
  resetPassword: (token: string) => Promise<void>;
  verifyEmail: (token: string) => Promise<void>;
  resendVerificationEmail: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const validateStoredToken = async () => {
      const token = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      console.log("Validating stored token:", token);
      console.log("Stored user:", storedUser);

      if (token && storedUser) {
        try {
          const userData = await authAPI.validateToken(token);
          console.log("Token validation successful, user data:", userData);
          setUser(userData);
          localStorage.setItem("user", JSON.stringify(userData));
          localStorage.setItem("token", token);
        } catch (error) {
          console.error("Token validation error:", error);
          try {
            const existingUser = JSON.parse(storedUser);
            setUser(existingUser);
            localStorage.setItem("token", token);
          } catch (e) {
            console.error("Error parsing stored user:", e);
          }
        }
      }
      setLoading(false);
    };

    validateStoredToken();
  }, []);

  const login = async (email: string) => {
    try {
      setError(null);
      const { token, user } = await authAPI.login(email);
      console.log("Login successful, token:", token);
      console.log("Login successful, user:", user);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      toast.success("Login successful!");
    } catch (error) {
      console.error("Login error:", error);
      setError("Invalid email or password");
      throw error;
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      setError(null);
      const { token, user } = await authAPI.register(email, password, name);
      console.log("Registration successful, token:", token);
      console.log("Registration successful, user:", user);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      toast.success("Registration successful!");
    } catch (error) {
      console.error("Registration error:", error);
      setError("Registration failed");
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    toast.info("Logged out successfully");
    navigate("/register");
  };

  const updateProfile = async (data: Partial<User>) => {
    try {
      setError(null);
      console.log("Updating profile with data:", data);
      const updatedUser = await authAPI.updateProfile(data);
      console.log("Profile update response:", updatedUser);
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return updatedUser;
    } catch (error) {
      console.error("Profile update error in context:", error);
      setError(
        error instanceof Error ? error.message : "Failed to update profile"
      );
      throw error;
    }
  };

  const updateAddress = async (addressId: string, data: Partial<Address>) => {
    try {
      setError(null);
      console.log("Updating address:", { addressId, data });
      const updatedUser = await authAPI.updateAddress(addressId, data);
      console.log("Address update response:", updatedUser);
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return updatedUser;
    } catch (error) {
      console.error("Address update error in context:", error);
      setError(
        error instanceof Error ? error.message : "Failed to update address"
      );
      throw error;
    }
  };

  const addAddress = async (address: Address) => {
    try {
      setError(null);
      console.log("Adding address:", address);
      const updatedUser = await authAPI.addAddress(address);
      console.log("Add address response:", updatedUser);
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return updatedUser;
    } catch (error) {
      console.error("Add address error in context:", error);
      setError(
        error instanceof Error ? error.message : "Failed to add address"
      );
      throw error;
    }
  };

  const removeAddress = async (addressId: string) => {
    try {
      setError(null);
      console.log("Removing address:", addressId);
      const updatedUser = await authAPI.removeAddress(addressId);
      console.log("Remove address response:", updatedUser);
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      return updatedUser;
    } catch (error) {
      console.error("Remove address error in context:", error);
      setError(
        error instanceof Error ? error.message : "Failed to remove address"
      );
      throw error;
    }
  };

  const requestPasswordReset = async (email: string) => {
    try {
      setError(null);
      await authAPI.requestPasswordReset(email);
    } catch (error) {
      setError("Failed to request password reset");
      throw error;
    }
  };

  const resetPassword = async (token: string) => {
    try {
      setError(null);
      await authAPI.resetPassword(token);
    } catch (error) {
      setError("Failed to reset password");
      throw error;
    }
  };

  const verifyEmail = async (token: string) => {
    try {
      setError(null);
      const updatedUser = await authAPI.verifyEmail(token);
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (error) {
      setError("Failed to verify email");
      throw error;
    }
  };

  const resendVerificationEmail = async () => {
    try {
      setError(null);
      await authAPI.resendVerificationEmail();
    } catch (error) {
      setError("Failed to resend verification email");
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        updateProfile,
        updateAddress,
        addAddress,
        removeAddress,
        requestPasswordReset,
        resetPassword,
        verifyEmail,
        resendVerificationEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
