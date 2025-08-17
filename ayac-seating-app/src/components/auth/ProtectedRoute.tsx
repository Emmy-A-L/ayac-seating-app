// Update your ProtectedRoute component
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuthContext"; // ✅ Changed import
import Loader from "../Loader";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, loading, user } = useAuth();

  console.log("ProtectedRoute - Auth state:", { isAuthenticated, loading, user: !!user });

  if (loading) {
    console.log("ProtectedRoute: Loading...");
    return <Loader />;
  }

  if (!isAuthenticated) {
    console.log("ProtectedRoute: Not authenticated, redirecting to login");
    return <Navigate to="/login" replace />;
  }

  console.log("ProtectedRoute: Authenticated, rendering children");
  return <>{children}</>;
};