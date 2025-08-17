import { useState } from "react";
import api from "../services/axios";
import type { User } from "../utils/types";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    try {
      setLoading(true);
      const res = await api.get<User>("auth/validate");
      setUser(res.data);
    } catch (err) {
      console.error("Auth check failed:", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    isAuthenticated: !!user,
    fetchUser, // 👈 expose manually instead of auto-running
  };
};
