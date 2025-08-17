import { useState } from "react";
import { IoMailOutline } from "react-icons/io5";
import { RiLockPasswordLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import api from "../services/axios";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";

const LoginPage = () => {
  const { fetchUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      console.log("Attempting login...");
      
      const res = await api.post(
        "auth/login",
        { email, password },
        { withCredentials: true }
      );
      
      // ✅ Wait for fetchUser to complete
      const userData = await fetchUser();
      
      if (userData) {
        alert(`Welcome, ${userData.fullName}`);
        navigate("/", { replace: true });
      } else {
        console.error("Failed to fetch user data after login");
        setError("Login successful but failed to load user data. Please refresh.");
      }
      
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        const errorMessage = err.response.data?.message;
        if (err.response.status === 401) {
          setError("Invalid email or password. Please try again.");
        } else if (err.response.status >= 500) {
          setError("Server error. Please try again later.");
        } else {
          setError(errorMessage || "Login failed. Please try again.");
        }
        console.error("Login error:", err.response.data);
      } else if (axios.isAxiosError(err)) {
        // Network error or no response
        setError("Network error. Please check your connection.");
        console.error("Network error:", err.message);
      } else {
        console.error("Unexpected error:", err);
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-4xl font-bold text-white">
            Hi there Visionary
          </h2>
        </div>

        {error && (
          <div className="my-4 p-3 text-red-400 bg-red-900/20 border border-red-800 rounded-lg text-center text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm space-y-4">
            {/* Email */}
            <div className="relative">
              <IoMailOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none relative block w-full pl-12 pr-4 py-3 border border-gray-700 rounded-lg bg-gray-800 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Email address"
                disabled={isLoading}
              />
            </div>

            {/* Password */}
            <div className="relative">
              <RiLockPasswordLine className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none relative block w-full pl-12 pr-4 py-3 border border-gray-700 rounded-lg bg-gray-800 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                placeholder="Password"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || !email.trim() || !password.trim()}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </span>
            ) : (
              "Sign in"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;