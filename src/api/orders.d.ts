import type { Order, OrderStatus } from "../types/order";

export class OrdersAPI {
  getUserOrders(userId: string): Promise<Order[]>;
  createOrder(orderData: Partial<Order>): Promise<Order>;
  updateOrderStatus(orderId: string, status: OrderStatus): Promise<Order>;
  getOrderById(orderId: string): Promise<Order>;
  cancelOrder(orderId: string): Promise<Order>;
  requestRefund(orderId: string, reason: string): Promise<Order>;
}

export const ordersAPI: OrdersAPI;
