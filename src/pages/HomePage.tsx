import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import { productsAPI } from "../api/products";
import type { Product } from "../types/product";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export const HomePage: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [products, categoryNames] = await Promise.all([
          productsAPI.getAll(),
          productsAPI.getCategories(),
        ]);
        setFeaturedProducts(products.slice(0, 4));
        setCategories(categoryNames);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Category images mapping
  const categoryImages: Record<string, string> = {
    electronics:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    jewelery:
      "https://images.unsplash.com/photo-1515405295579-ba7b45403062?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80",
    "men's clothing":
      "https://images.unsplash.com/photo-1617137968427-85924c800a22?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80",
    "women's clothing":
      "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=686&q=80",
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="relative bg-gray-900 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
            alt="Hero Background"
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Shop the Latest Trends
          </h1>
          <p className="mt-6 text-xl max-w-3xl">
            Discover our curated collection of high-quality products at
            competitive prices. From electronics to fashion, we have everything
            you need.
          </p>
          <div className="mt-10 flex gap-4">
            <Link to="/products">
              <Button size="lg">Shop Now</Button>
            </Link>
            <Link to="/categories">
              <Button variant="outline" size="lg">
                Browse Categories
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Categories */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center">
            Featured Categories
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 text-center mx-auto">
            Explore our most popular product categories
          </p>

          {loading ? (
            <div className="mt-12 flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="mt-12">
              <Swiper
                modules={[Autoplay]}
                spaceBetween={30}
                slidesPerView={1}
                loop
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                  },
                  1024: {
                    slidesPerView: 3,
                  },
                }}
                className="h-[400px]"
              >
                {categories.map((category) => (
                  <SwiperSlide key={category}>
                    <div className="group relative rounded-lg overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow h-full">
                      <div className="relative h-80 w-full overflow-hidden">
                        <img
                          src={
                            categoryImages[category] ||
                            "https://placehold.co/600x400"
                          }
                          alt={category}
                          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-80"></div>
                        <div className="absolute bottom-0 left-0 p-6">
                          <h3 className="text-xl font-semibold text-white capitalize">
                            {category}
                          </h3>
                          <Link
                            to={`/categories/${category}`}
                            className="mt-3 inline-block text-white text-sm font-medium"
                          >
                            Shop now →
                          </Link>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </div>
      </div>

      {/* Featured Products */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center">
            Featured Products
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 text-center mx-auto">
            Check out our most popular products
          </p>

          {loading ? (
            <div className="mt-12 flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="mt-12 space-y-8 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 lg:grid-cols-4">
              {featuredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group relative bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full"
                >
                  <div className="relative h-64 w-full overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-lg font-medium text-gray-900">
                      {product.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 line-clamp-2 mb-4">
                      {product.description}
                    </p>
                    <div className="mt-auto flex justify-between items-center pt-4 border-t">
                      <span className="text-lg font-bold text-gray-900">
                        ${product.price.toFixed(2)}
                      </span>
                      <Link to={`/products/${product.id}`}>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Newsletter Subscription */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Subscribe to our newsletter
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Get the latest updates on new products and special offers
            </p>
            <div className="mt-8 max-w-md mx-auto">
              <form className="sm:flex">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full px-5 py-3 border border-gray-300 shadow-sm placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:max-w-xs rounded-md"
                  placeholder="Enter your email"
                />
                <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                  <Button type="submit" className="w-full">
                    Subscribe
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
