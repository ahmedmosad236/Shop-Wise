import axios from "axios";
import { AppError } from "../types/error";

const API_URL = "https://fakestoreapi.com";

interface LoginResponse {
  token: string;
}

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface Category {
  id: number;
  name: string;
  image: string;
}

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      throw new AppError(
        error.response.data.message || "An error occurred",
        error.response.status
      );
    }
    throw new AppError("Network error occurred");
  }
);

export const authAPI = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>("/auth/login", {
      username: email,
      password,
    });
    return response.data;
  },
  register: async (
    name: string,
    email: string,
    password: string
  ): Promise<LoginResponse> => {
    // Fake Store API doesn't have a registration endpoint
    // We'll simulate a successful registration
    return {
      token: `dummy_token_${name}_${email}_${password.substring(
        0,
        3
      )}_${Math.random().toString(36).substring(7)}`,
    };
  },
};

export const productsAPI = {
  getAll: async (): Promise<Product[]> => {
    const response = await api.get<Product[]>("/products");
    return response.data;
  },
  getById: async (id: number): Promise<Product> => {
    const response = await api.get<Product>(`/products/${id}`);
    return response.data;
  },
  getByCategory: async (category: string): Promise<Product[]> => {
    const response = await api.get<Product[]>(`/products/category/${category}`);
    return response.data;
  },
  getCategories: async (): Promise<string[]> => {
    const response = await api.get<string[]>("/products/categories");
    return response.data;
  },
};

export const categoriesAPI = {
  getAll: async (): Promise<Category[]> => {
    const response = await api.get<Category[]>("/products/categories");
    return response.data;
  },
  getById: async (id: number): Promise<Category> => {
    const response = await api.get<Category>(`/products/categories/${id}`);
    return response.data;
  },
};

export default api;
