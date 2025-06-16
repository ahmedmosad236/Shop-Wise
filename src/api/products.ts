import axios from "axios";
import type { Product } from "../types/product";
import { AppError } from "../types/error";

const API_URL = "https://fakestoreapi.com";

// API response type for Fake Store API
interface APIProduct {
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

// Helper function to transform API response to our Product type
const transformProduct = (apiProduct: APIProduct): Product => ({
  id: apiProduct.id.toString(),
  name: apiProduct.title,
  description: apiProduct.description,
  price: apiProduct.price,
  category: apiProduct.category,
  image: apiProduct.image,
  rating: apiProduct.rating.rate,
  stock: apiProduct.rating.count,
});

export const productsAPI = {
  getAll: async (): Promise<Product[]> => {
    try {
      const response = await axios.get<APIProduct[]>(`${API_URL}/products`);
      return response.data.map(transformProduct);
    } catch (error: unknown) {
      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
        };
        throw new AppError(
          axiosError.response?.data?.message || "Failed to fetch products"
        );
      }
      throw new AppError("Failed to fetch products");
    }
  },

  getById: async (id: string): Promise<Product> => {
    try {
      const response = await axios.get<APIProduct>(`${API_URL}/products/${id}`);
      return transformProduct(response.data);
    } catch (error: unknown) {
      if (error && typeof error === "object" && "response" in error) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
        };
        throw new AppError(
          axiosError.response?.data?.message || "Failed to fetch product"
        );
      }
      throw new AppError("Failed to fetch product");
    }
  },

  getByCategory: async (category: string): Promise<Product[]> => {
    try {
      const response = await axios.get<APIProduct[]>(
        `${API_URL}/products/category/${category}`
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

  getCategories: async (): Promise<string[]> => {
    try {
      const response = await axios.get<string[]>(
        `${API_URL}/products/categories`
      );
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
};
