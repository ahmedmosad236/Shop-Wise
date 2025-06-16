import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import { getOrderById, updateOrderStatus } from "../store/orderSlice";
import { Button } from "../components/ui/Button";
import { toast } from "react-toastify";

export const OrderDetailPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const {
    currentOrder: order,
    loading,
    error,
  } = useSelector((state: RootState) => state.orders);

  useEffect(() => {
    if (orderId) {
      dispatch(getOrderById(orderId));
    }
  }, [dispatch, orderId]);

  const handleCancelOrder = async () => {
    if (!orderId) return;
    try {
      await dispatch(
        updateOrderStatus({ orderId, status: "cancelled" })
      ).unwrap();
      toast.success("Order cancelled successfully");
      navigate("/orders");
    } catch {
      toast.error("Failed to cancel order");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600">{error}</p>
          <Button onClick={() => navigate("/orders")} className="mt-4">
            Back to Orders
          </Button>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-600">Order not found</p>
          <Button onClick={() => navigate("/orders")} className="mt-4">
            Back to Orders
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Order #{order.id}</h1>
          <span
            className={`px-3 py-1 rounded-full text-sm font-medium ${
              order.status === "delivered"
                ? "bg-green-100 text-green-800"
                : order.status === "shipped"
                ? "bg-blue-100 text-blue-800"
                : order.status === "processing"
                ? "bg-yellow-100 text-yellow-800"
                : order.status === "cancelled"
                ? "bg-red-100 text-red-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">Shipping Address</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p>{order.shippingAddress.street}</p>
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state}
              </p>
              <p>
                {order.shippingAddress.country}, {order.shippingAddress.zipCode}
              </p>
              <p>Phone: {order.shippingAddress.phone}</p>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Order Information</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p>
                <span className="font-medium">Order Date:</span>{" "}
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <p>
                <span className="font-medium">Payment Method:</span>{" "}
                {order.paymentMethod}
              </p>
              <p>
                <span className="font-medium">Payment Status:</span>{" "}
                {order.paymentStatus}
              </p>
              {order.trackingNumber && (
                <p>
                  <span className="font-medium">Tracking Number:</span>{" "}
                  {order.trackingNumber}
                </p>
              )}
              {order.estimatedDeliveryDate && (
                <p>
                  <span className="font-medium">Estimated Delivery:</span>{" "}
                  {new Date(order.estimatedDeliveryDate).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Order Items</h2>
          <div className="bg-gray-50 rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {order.items.map((item) => (
                  <tr key={item.productId}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          className="h-10 w-10 object-cover rounded"
                          src={item.image}
                          alt={item.name}
                        />
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {item.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${item.price.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-xl font-bold">
            Total: ${order.totalAmount.toFixed(2)}
          </div>
          <div className="space-x-4">
            {order.status === "pending" && (
              <Button variant="outline" onClick={handleCancelOrder}>
                Cancel Order
              </Button>
            )}
            {order.status === "delivered" && (
              <Button
                variant="outline"
                onClick={() => {
                  // Handle request refund
                  toast.success("Refund request submitted");
                }}
              >
                Request Refund
              </Button>
            )}
            <Button onClick={() => navigate("/orders")}>Back to Orders</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
