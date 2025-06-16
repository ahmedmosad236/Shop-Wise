import React from "react";

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gray-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">About Our Store</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We are dedicated to providing the best shopping experience with
              quality products and exceptional customer service.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Our Mission
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-6">
                <div className="text-indigo-600 text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Quality First
                </h3>
                <p className="text-gray-600">
                  We carefully select each product to ensure the highest quality
                  for our customers.
                </p>
              </div>
              <div className="p-6">
                <div className="text-indigo-600 text-4xl mb-4">💡</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Innovation
                </h3>
                <p className="text-gray-600">
                  We constantly strive to bring you the latest and most
                  innovative products.
                </p>
              </div>
              <div className="p-6">
                <div className="text-indigo-600 text-4xl mb-4">🤝</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Customer Satisfaction
                </h3>
                <p className="text-gray-600">
                  Your satisfaction is our top priority. We're here to help you
                  find exactly what you need.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Team member"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    John Doe
                  </h3>
                  <p className="text-gray-600">CEO & Founder</p>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                  alt="Team member"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Ahmed Mosaad
                  </h3>
                  <p className="text-gray-600">Head of Operations</p>
                </div>
              </div>
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Team member"
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Mike Johnson
                  </h3>
                  <p className="text-gray-600">Customer Support Lead</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Our Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Sustainability
                </h3>
                <p className="text-gray-600">
                  We are committed to sustainable practices and reducing our
                  environmental impact through responsible sourcing and
                  packaging.
                </p>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Community
                </h3>
                <p className="text-gray-600">
                  We believe in giving back to our community and supporting
                  local initiatives that make a positive impact.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="py-16 bg-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-2">Address</h3>
                <p className="text-indigo-200">
                  123 Store Street
                  <br />
                  City, State 12345
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Contact</h3>
                <p className="text-indigo-200">
                  Phone: (123) 456-7890
                  <br />
                  Email: info@store.com
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Hours</h3>
                <p className="text-indigo-200">
                  Monday - Friday: 9am - 6pm
                  <br />
                  Saturday: 10am - 4pm
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
