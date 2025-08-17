import { useState, useCallback } from "react";
import api from "../services/axios";
import type { User } from "../utils/types";
import axios from "axios";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const res = await api.get<User>("auth/validate", {
        withCredentials: true // Ensure cookies are sent
      });
      
      setUser(res.data);
      return res.data; // Return user data for chaining
    } catch (err) {
      console.error("Auth check failed:", err);
      
      // Clear user state on auth failure
      setUser(null);
      
      // Set error message for UI feedback
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          setError("Authentication expired. Please login again.");
        } else {
          setError(err.response?.data?.message || "Authentication failed.");
        }
      } else {
        setError("Network error. Please check your connection.");
      }
      
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      setLoading(true);
      await api.post("auth/logout", {}, {
        withCredentials: true
      });
      setUser(null);
      setError(null);
    } catch (err) {
      console.error("Logout failed:", err);
      // Even if logout fails on server, clear local state
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const clearUser = useCallback(() => {
    setUser(null);
    setError(null);
  }, []);

  return {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    fetchUser,
    logout,
    clearError,
    clearUser,
  };
};