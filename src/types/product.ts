import { z } from "zod";

// Zod schema for product validation
export const ProductSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number().positive(),
  category: z.string(),
  image: z.string().url(),
  rating: z.number().min(0).max(5).optional(),
  stock: z.number().int().nonnegative(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

// TypeScript type derived from the Zod schema
export type Product = z.infer<typeof ProductSchema>;

// Type for product filters
export type ProductFilters = {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: "price" | "rating" | "newest";
  sortOrder?: "asc" | "desc";
};

// Type for cart items
export type CartItem = {
  product: Product;
  quantity: number;
};
