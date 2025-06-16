import axios from "axios";
import { AppError } from "../types/error";
import type { Product } from "../types/product";

const API_URL = "https://api.escuelajs.co/api/v1";

// Category type definition
export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
}

// Create category request type
export interface CreateCategoryRequest {
  name: string;
  image: string;
}

// Update category request type
export interface UpdateCategoryRequest {
  name?: string;
  image?: string;
}

// API response type for products
interface APIProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  category: {
    id: number;
    name: string;
    image: string;
  };
  images: string[];
  rating?: number;
  stock?: number;
}

// Helper function to transform API response to our Product type
const transformProduct = (apiProduct: APIProduct): Product => ({
  id: apiProduct.id.toString(),
  name: apiProduct.title,
  description: apiProduct.description,
  price: apiProduct.price,
  category: apiProduct.category.id.toString(),
  image: apiProduct.images[0],
  rating: apiProduct.rating || 0,
  stock: apiProduct.stock || 0,
});

export const categoriesAPI = {
  // Get all categories
  getAll: async (): Promise<Category[]> => {
    try {
      const response = await axios.get<Category[]>(`${API_URL}/categories`);
      return response.data;
    } catch (error: unknown) {
      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
        };
        throw new AppError(
          axiosError.response?.data?.message || "Failed to fetch categories"
        );
      }
      throw new AppError("Failed to fetch categories");
    }
  },

  // Get category by ID
  getById: async (id: number): Promise<Category> => {
    try {
      const response = await axios.get<Category>(`${API_URL}/categories/${id}`);
      return response.data;
    } catch (error: unknown) {
      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
        };
        throw new AppError(
          axiosError.response?.data?.message || "Failed to fetch category"
        );
      }
      throw new AppError("Failed to fetch category");
    }
  },

  // Get category by slug
  getBySlug: async (slug: string): Promise<Category> => {
    try {
      const response = await axios.get<Category>(
        `${API_URL}/categories/slug/${slug}`
      );
      return response.data;
    } catch (error: unknown) {
      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
        };
        throw new AppError(
          axiosError.response?.data?.message || "Failed to fetch category"
        );
      }
      throw new AppError("Failed to fetch category");
    }
  },

  // Create new category
  create: async (category: CreateCategoryRequest): Promise<Category> => {
    try {
      const response = await axios.post<Category>(
        `${API_URL}/categories`,
        category
      );
      return response.data;
    } catch (error: unknown) {
      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
        };
        throw new AppError(
          axiosError.response?.data?.message || "Failed to create category"
        );
      }
      throw new AppError("Failed to create category");
    }
  },

  // Update category
  update: async (
    id: number,
    category: UpdateCategoryRequest
  ): Promise<Category> => {
    try {
      const response = await axios.put<Category>(
        `${API_URL}/categories/${id}`,
        category
      );
      return response.data;
    } catch (error: unknown) {
      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
        };
        throw new AppError(
          axiosError.response?.data?.message || "Failed to update category"
        );
      }
      throw new AppError("Failed to update category");
    }
  },

  // Delete category
  delete: async (id: number): Promise<boolean> => {
    try {
      const response = await axios.delete<boolean>(
        `${API_URL}/categories/${id}`
      );
      return response.data;
    } catch (error: unknown) {
      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
        };
        throw new AppError(
          axiosError.response?.data?.message || "Failed to delete category"
        );
      }
      throw new AppError("Failed to delete category");
    }
  },

  // Get products by category ID
  getProducts: async (id: number): Promise<Product[]> => {
    try {
      const response = await axios.get<APIProduct[]>(
        `${API_URL}/categories/${id}/products`
      );
      return response.data.map(transformProduct);
    } catch (error: unknown) {
      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
        };
        throw new AppError(
          axiosError.response?.data?.message ||
            "Failed to fetch category products"
        );
      }
      throw new AppError("Failed to fetch category products");
    }
  },
};
