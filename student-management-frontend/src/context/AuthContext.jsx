import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "../api/axiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null,
    isLoading: true, // Track initial auth check
  });

  // Memoized token validation
  const validateToken = useCallback((token) => {
    try {
      const decoded = jwtDecode(token);

      // Check token expiration
      if (decoded.exp * 1000 < Date.now()) {
        throw new Error("Token expired");
      }

      return decoded;
    } catch (err) {
      console.error("Token validation failed:", err);
      localStorage.removeItem("token");
      return null;
    }
  }, []);

  // Initialize auth state
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decoded = validateToken(token);
      setAuth({
        isAuthenticated: !!decoded,
        user: decoded,
        isLoading: false,
      });
    } else {
      setAuth((prev) => ({ ...prev, isLoading: false }));
    }
  }, [validateToken]);

  const login = (token) => {
    try {
      const decoded = jwtDecode(token);
      console.log("Auth Role:", decoded.role); // ✅ PUT HERE
      localStorage.setItem("token", token);
      setAuth({
        isAuthenticated: true,
        user: decoded,
        isLoading: false,
      });

      // Return the role for redirection
      return decoded.role;
    } catch (err) {
      console.error("Login token error", err);
      return null;
    }
  };

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    delete axiosInstance.defaults.headers.common["Authorization"];
    setAuth({
      isAuthenticated: false,
      user: null,
      isLoading: false,
    });
  }, []);

  // Auto-logout on token expiration
  useEffect(() => {
    if (!auth.user?.exp) return;

    const expirationTime = auth.user.exp * 1000 - Date.now();
    if (expirationTime <= 0) {
      logout();
      return;
    }

    const timer = setTimeout(logout, expirationTime);
    return () => clearTimeout(timer);
  }, [auth.user?.exp, logout]);

  return (
    <AuthContext.Provider
      value={{
        ...auth,
        login,
        logout,
        role: auth.user?.role || null,
        userId: auth.user?.userId || null, // Often needed for API calls
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
