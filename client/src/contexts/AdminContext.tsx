import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface AdminSession {
  token: string;
  expiresAt: Date;
}

interface AdminContextType {
  session: AdminSession | null;
  isAdmin: boolean;
  login: (token: string, expiresAt: Date) => void;
  logout: () => void;
  checkSession: () => boolean;
}

const AdminContext = createContext<AdminContextType | null>(null);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<AdminSession | null>(null);

  // Check if current session is valid
  const checkSession = (): boolean => {
    if (!session) return false;
    if (session.expiresAt <= new Date()) {
      logout();
      return false;
    }
    return true;
  };

  // Login function
  const login = (token: string, expiresAt: Date) => {
    const sessionData = { token, expiresAt };
    setSession(sessionData);
    localStorage.setItem('adminSession', JSON.stringify({
      token,
      expiresAt: expiresAt.toISOString()
    }));
  };

  // Logout function
  const logout = () => {
    setSession(null);
    localStorage.removeItem('adminSession');
  };

  // Load session from localStorage on mount
  useEffect(() => {
    const savedSession = localStorage.getItem('adminSession');
    if (savedSession) {
      try {
        const parsed = JSON.parse(savedSession);
        const expiresAt = new Date(parsed.expiresAt);
        if (expiresAt > new Date()) {
          setSession({
            token: parsed.token,
            expiresAt
          });
        } else {
          localStorage.removeItem('adminSession');
        }
      } catch (error) {
        localStorage.removeItem('adminSession');
      }
    }
  }, []);

  const isAdmin = checkSession();

  return (
    <AdminContext.Provider value={{
      session,
      isAdmin,
      login,
      logout,
      checkSession
    }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}