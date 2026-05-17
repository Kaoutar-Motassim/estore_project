import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isSeller: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('Vendly_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (user: User) => {
    setUser(user);
    localStorage.setItem('Vendly_user', JSON.stringify(user));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('Vendly_user');
  };

  return (
    <AuthContext.Provider value={{
      user, login, logout,
      isAuthenticated: !!user,
      isSeller: user?.role === 'SELLER' || user?.role === 'ADMIN',
      isAdmin: user?.role === 'ADMIN',
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
