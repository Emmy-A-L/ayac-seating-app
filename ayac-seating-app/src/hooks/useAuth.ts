import { useEffect, useState } from "react";
import api from "../services/axios";
import type { User } from "../utils/types";



export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await api.get<User>("auth/validate");
      setUser(res.data);
    } catch (err) {
      console.error("Auth check failed:", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return {
    user,
    loading,
    isAuthenticated: !!user,
    refresh: fetchUser, // allow re-check manually
  };
};