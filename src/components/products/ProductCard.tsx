import React, { useState } from "react";
import { Link } from "react-router-dom";
import type { Product } from "../../types";
import { Card, CardBody } from "../ui/Card";
import { Button } from "../ui/Button";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product, quantity: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [showQuantityControls, setShowQuantityControls] = useState(false);

  const handleIncreaseQuantity = () => {
    if (quantity < product.stock) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      onAddToCart?.(product, 1); // Add 1 more to cart
    }
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onAddToCart?.(product, -1); // Remove 1 from cart
    }
  };

  const handleAddToCartClick = () => {
    setShowQuantityControls(true);
    onAddToCart?.(product, 1); // Add initial item to cart
  };

  const handleRemoveFromCart = () => {
    setShowQuantityControls(false);
    setQuantity(1);
    onAddToCart?.(product, -quantity); // Remove all items of this product
  };

  return (
    <Card className="h-full flex flex-col">
      <div className="relative pb-[56.25%] overflow-hidden group">
        <img
          src={product.image}
          alt={product.name}
          className="absolute top-0 left-0 w-full h-full object-cover transition-transform group-hover:scale-105"
        />
        <Link
          to={`/products/${product.id}`}
          className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100"
        >
          <span className="text-white font-medium bg-black bg-opacity-50 px-4 py-2 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            View Details
          </span>
        </Link>
      </div>
      <CardBody className="flex-grow flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {product.name}
          </h3>
          {product.rating !== undefined && (
            <span className="flex items-center bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
              <svg
                className="w-3 h-3 mr-1 text-yellow-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {product.rating.toFixed(1)}
            </span>
          )}
        </div>
        <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
        <div className="mt-auto">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            <span
              className={`text-sm ${
                product.stock > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
            </span>
          </div>
          <div className="flex gap-2">
            {!showQuantityControls ? (
              <Button
                variant="primary"
                className="flex-1"
                onClick={handleAddToCartClick}
                disabled={product.stock <= 0}
              >
                Add to Cart
              </Button>
            ) : (
              <div className="flex-1 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDecreaseQuantity}
                    disabled={quantity <= 1 || product.stock <= 0}
                    className="w-8 h-8 p-0 flex items-center justify-center"
                  >
                    -
                  </Button>
                  <span className="w-8 text-center font-medium">
                    {quantity}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleIncreaseQuantity}
                    disabled={quantity >= product.stock || product.stock <= 0}
                    className="w-8 h-8 p-0 flex items-center justify-center"
                  >
                    +
                  </Button>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRemoveFromCart}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
};
