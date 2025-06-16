import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../store/store";
import { removeFromCart, updateQuantity, clearCart } from "../store/cartSlice";
import { createOrder } from "../store/orderSlice";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const CartPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { items, total } = useSelector((state: RootState) => state.cart);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleQuantityChange = (id: string, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleCheckout = async () => {
    if (!user) {
      toast.error("Please login to checkout");
      return;
    }

    setIsCheckingOut(true);
    try {
      const orderData = {
        userId: user.id,
        items: items.map((item) => ({
          productId: item.product.id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          image: item.product.image,
        })),
        totalAmount: total,
        paymentMethod: "credit_card", // You might want to add a payment method selection
        shippingAddress: {
          street: "123 Main St", // You might want to add a shipping address form
          city: "Cairo",
          state: "Cairo",
          country: "Egypt",
          zipCode: "12345",
          phone: "+201234567890",
        },
      };

      await dispatch(createOrder(orderData)).unwrap();
      dispatch(clearCart());
      toast.success("Order placed successfully!");
      navigate("/orders");
    } catch {
      toast.error("Failed to place order. Please try again.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-500 text-center">Your cart is empty</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.product.id}
              className="flex items-center justify-between border-b pb-4"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-20 h-20 object-contain"
                />
                <div>
                  <h3 className="font-semibold">{item.product.name}</h3>
                  <p className="text-gray-600">${item.product.price}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() =>
                      handleQuantityChange(item.product.id, item.quantity - 1)
                    }
                    className="px-2 py-1 border rounded"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleQuantityChange(item.product.id, item.quantity + 1)
                    }
                    className="px-2 py-1 border rounded"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => handleRemoveItem(item.product.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-between items-center">
          <div className="text-xl font-semibold">
            Total: ${total.toFixed(2)}
          </div>
          <button
            onClick={handleCheckout}
            disabled={isCheckingOut}
            className={`bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 ${
              isCheckingOut ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isCheckingOut ? "Processing..." : "Checkout"}
          </button>
        </div>
      </div>
    </div>
  );
};
