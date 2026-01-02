// src/context/AuthContext.tsx
import React, { createContext, useEffect, useState } from "react";
import { AuthService } from "../services/authservice";
import { setDatasFromSession } from "../hooks/useSession";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (pauload:any) => Promise<void>;
  register: (payload: any) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const authService = AuthService.getInstance();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    authService.isAuthenticated().then(setIsAuthenticated);
  }, []);

  const login = async (payload:any) => {
    const res = await authService.login(payload);
    console.log('this is login data', res);
    await setDatasFromSession(res);
    setIsAuthenticated(true);
  };

  const register = async (payload: any) => {
    await authService.register(payload);
  };

  const logout = async () => {
    await authService.logout();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
