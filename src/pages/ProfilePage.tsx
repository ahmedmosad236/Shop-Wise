import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";
import type { Address } from "../types/user";

export const ProfilePage: React.FC = () => {
  const { user, updateProfile, updateAddress, addAddress, removeAddress } =
    useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
  });

  const [newAddress, setNewAddress] = useState<Partial<Address>>({
    street: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    phone: "",
    isDefault: false,
  });

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("Current user:", user);
      console.log("Form data:", formData);

      const updateData = {
        name: formData.name,
        phone: formData.phone,
      };

      console.log("Update data:", updateData);
      const updatedUser = await updateProfile(updateData);
      console.log("Updated user:", updatedUser);

      toast.success("Profile updated successfully");
      setIsEditing(false);
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to update profile"
      );
    }
  };

  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("Current user:", user);
      console.log("New address data:", newAddress);

      const newAddressWithId = {
        ...newAddress,
        id: Math.random().toString(36).substr(2, 9),
      } as Address;

      console.log("Address with ID:", newAddressWithId);
      const updatedUser = await addAddress(newAddressWithId);
      console.log("Updated user after adding address:", updatedUser);

      setNewAddress({
        street: "",
        city: "",
        state: "",
        country: "",
        zipCode: "",
        phone: "",
        isDefault: false,
      });
      toast.success("Address added successfully");
    } catch (error) {
      console.error("Add address error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to add address"
      );
    }
  };

  const handleRemoveAddress = async (addressId: string) => {
    try {
      await removeAddress(addressId);
      toast.success("Address removed successfully");
    } catch {
      toast.error("Failed to remove address");
    }
  };

  const handleSetDefaultAddress = async (addressId: string) => {
    try {
      await updateAddress(addressId, { isDefault: true });
      toast.success("Default address updated");
    } catch {
      toast.error("Failed to update default address");
    }
  };

  if (!user) {
    return <div>Please login to view your profile</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>

      {/* Profile Information */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
        {isEditing ? (
          <form onSubmit={handleProfileUpdate}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 text-lg"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 text-lg"
                />
              </div>
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <p>
              <span className="font-semibold">Name:</span>{" "}
              {typeof user.name === "string" ? user.name : "Not set"}
            </p>
            <p>
              <span className="font-semibold">Email:</span>{" "}
              {typeof user.email === "string" ? user.email : "Not set"}
            </p>
            <p>
              <span className="font-semibold">Phone:</span>{" "}
              {typeof user.phone === "string" ? user.phone : "Not set"}
            </p>
            <button
              onClick={() => setIsEditing(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Edit Profile
            </button>
          </div>
        )}
      </div>

      {/* Addresses */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">My Addresses</h2>

        {/* Add New Address Form */}
        <form onSubmit={handleAddAddress} className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Street
              </label>
              <input
                type="text"
                value={newAddress.street}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, street: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 text-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                type="text"
                value={newAddress.city}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, city: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 text-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                State
              </label>
              <input
                type="text"
                value={newAddress.state}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, state: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 text-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Country
              </label>
              <input
                type="text"
                value={newAddress.country}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, country: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 text-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                ZIP Code
              </label>
              <input
                type="text"
                value={newAddress.zipCode}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, zipCode: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 text-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="tel"
                value={newAddress.phone}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, phone: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-3 text-lg"
                required
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={newAddress.isDefault}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, isDefault: e.target.checked })
                }
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <span className="ml-2">Set as default address</span>
            </label>
          </div>
          <button
            type="submit"
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Address
          </button>
        </form>

        {/* Address List */}
        <div className="space-y-4">
          {user.addresses.map((address) => (
            <div key={address.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold">{address.street}</p>
                  <p>
                    {address.city}, {address.state} {address.zipCode}
                  </p>
                  <p>{address.country}</p>
                  <p>Phone: {address.phone}</p>
                  {address.isDefault && (
                    <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mt-2">
                      Default Address
                    </span>
                  )}
                </div>
                <div className="space-x-2">
                  {!address.isDefault && (
                    <button
                      onClick={() => handleSetDefaultAddress(address.id)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Set as Default
                    </button>
                  )}
                  <button
                    onClick={() => handleRemoveAddress(address.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Email Verification Status */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Email Verification</h2>
        {user.isEmailVerified ? (
          <div className="text-green-600">✓ Email verified</div>
        ) : (
          <div>
            <p className="text-red-600 mb-2">✗ Email not verified</p>
            <button
              onClick={() => {
                /* TODO: Implement email verification */
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Send Verification Email
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
