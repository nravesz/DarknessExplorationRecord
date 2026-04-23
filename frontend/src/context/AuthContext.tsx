import { createContext, useState } from 'react';
import type { IAuthContextValue } from './interfaces/IAuthContextValue';
import type { IAuthState } from './interfaces/IAuthState';

export const AuthContext = createContext<IAuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuthState] = useState<IAuthState>({
    isLoggedIn: !!localStorage.getItem('accessToken'),
    codename: localStorage.getItem('codename'),
    email: localStorage.getItem('email'),
    role: localStorage.getItem('role'),
  });

  const setAuth = (codename: string, email: string, role: string) => {
    setAuthState({ isLoggedIn: true, codename, email, role });
  };

  const clearAuth = () => {
    setAuthState({ isLoggedIn: false, codename: null, email: null, role: null });
  };

  return (
    <AuthContext.Provider value={{ ...auth, setAuth, clearAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
