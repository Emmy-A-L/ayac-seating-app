import { createContext, useEffect } from "react";
import { useAuth as useAuthHook } from "../hooks/useAuth";

export type AuthContextType = ReturnType<typeof useAuthHook>;

const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const auth = useAuthHook();

  useEffect(() => {
    const checkAuth = async () => {
      console.log("App startup: checking authentication...");
      await auth.fetchUser();
    };
    
    checkAuth();
  }, [auth]);

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};