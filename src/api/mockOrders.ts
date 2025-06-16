import type { Order, OrderStatus } from "../types/order";

const mockOrders: Order[] = [
  {
    id: "1",
    userId: "1747998951507",
    items: [
      {
        productId: "1",
        name: "iPhone 13 Pro",
        price: 999.99,
        quantity: 1,
        image: "https://example.com/iphone.jpg",
      },
    ],
    totalAmount: 999.99,
    status: "delivered" as OrderStatus,
    paymentStatus: "completed",
    paymentMethod: "credit_card",
    shippingAddress: {
      street: "123 Main St",
      city: "Cairo",
      state: "Cairo",
      country: "Egypt",
      zipCode: "12345",
      phone: "+201234567890",
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    trackingNumber: "TRK123456",
    estimatedDeliveryDate: new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000
    ).toISOString(),
  },
  {
    id: "2",
    userId: "1747998951507",
    items: [
      {
        productId: "2",
        name: "MacBook Pro",
        price: 1299.99,
        quantity: 1,
        image: "https://example.com/macbook.jpg",
      },
    ],
    totalAmount: 1299.99,
    status: "processing" as OrderStatus,
    paymentStatus: "completed",
    paymentMethod: "paypal",
    shippingAddress: {
      street: "123 Main St",
      city: "Cairo",
      state: "Cairo",
      country: "Egypt",
      zipCode: "12345",
      phone: "+201234567890",
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const mockOrdersAPI = {
  getUserOrders: async (userId: string): Promise<Order[]> => {
    return mockOrders.filter((order) => order.userId === userId);
  },

  getOrderById: async (orderId: string): Promise<Order> => {
    const order = mockOrders.find((order) => order.id === orderId);
    if (!order) throw new Error("Order not found");
    return order;
  },

  createOrder: async (orderData: Partial<Order>): Promise<Order> => {
    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9),
      userId: orderData.userId || "",
      items: orderData.items || [],
      totalAmount: orderData.totalAmount || 0,
      status: "pending",
      paymentStatus: "pending",
      paymentMethod: orderData.paymentMethod || "credit_card",
      shippingAddress: orderData.shippingAddress || {
        street: "",
        city: "",
        state: "",
        country: "",
        zipCode: "",
        phone: "",
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockOrders.push(newOrder);
    return newOrder;
  },

  updateOrderStatus: async (
    orderId: string,
    status: OrderStatus
  ): Promise<Order> => {
    const orderIndex = mockOrders.findIndex((order) => order.id === orderId);
    if (orderIndex === -1) throw new Error("Order not found");

    const updatedOrder = {
      ...mockOrders[orderIndex],
      status,
      updatedAt: new Date().toISOString(),
    };

    mockOrders[orderIndex] = updatedOrder;
    return updatedOrder;
  },

  cancelOrder: async (orderId: string): Promise<Order> => {
    const order = mockOrders.find((order) => order.id === orderId);
    if (!order) throw new Error("Order not found");
    order.status = "cancelled";
    order.updatedAt = new Date().toISOString();
    return order;
  },

  requestRefund: async (orderId: string, reason: string): Promise<Order> => {
    const order = mockOrders.find((order) => order.id === orderId);
    if (!order) throw new Error("Order not found");
    order.status = "refunded";
    order.paymentStatus = "refunded";
    order.notes = `Refund requested: ${reason}`;
    order.updatedAt = new Date().toISOString();
    return order;
  },
};
