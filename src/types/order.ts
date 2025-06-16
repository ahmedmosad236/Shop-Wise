export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";

export type ShippingAddress = {
  street: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  phone: string;
};

export type OrderItem = {
  productId: string;
  quantity: number;
  price: number;
  name: string;
  image: string;
};

export type Order = {
  id: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  status: OrderStatus;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  paymentStatus: "pending" | "completed" | "failed" | "refunded";
  createdAt: string;
  updatedAt: string;
  trackingNumber?: string;
  estimatedDeliveryDate?: string;
  notes?: string;
};
