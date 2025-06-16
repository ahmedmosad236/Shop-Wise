import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";

export const ResetPasswordPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const { requestPasswordReset, resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await requestPasswordReset(email);
      toast.success(
        "تم إرسال تعليمات إعادة تعيين كلمة المرور إلى بريدك الإلكتروني"
      );
      navigate("/login");
    } catch {
      toast.error("فشل في طلب إعادة تعيين كلمة المرور");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("كلمات المرور غير متطابقة");
      return;
    }
    setIsLoading(true);
    try {
      await resetPassword(token!);
      toast.success("تم إعادة تعيين كلمة المرور بنجاح");
      navigate("/login");
    } catch {
      toast.error("فشل في إعادة تعيين كلمة المرور");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">
          {token ? "إعادة تعيين كلمة المرور" : "نسيت كلمة المرور"}
        </h1>

        {token ? (
          <form onSubmit={handleResetPassword}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  كلمة المرور الجديدة
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                  minLength={8}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  تأكيد كلمة المرور
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                  minLength={8}
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isLoading
                  ? "جاري إعادة التعيين..."
                  : "إعادة تعيين كلمة المرور"}
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleRequestReset}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  البريد الإلكتروني
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? "جاري الإرسال..." : "إرسال تعليمات إعادة التعيين"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
