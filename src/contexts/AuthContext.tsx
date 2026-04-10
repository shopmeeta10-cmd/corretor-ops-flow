import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type UserRole = "admin" | "lider" | "corretor";

export interface User {
  id: string;
  email: string;
  nome: string;
  role: UserRole;
  equipe?: string;
}

// Mock users for development
const MOCK_USERS: (User & { password: string })[] = [
  { id: "1", email: "admin@agendou.com", password: "admin123", nome: "Administrador", role: "admin" },
  { id: "2", email: "cinthya@agendou.com", password: "lider123", nome: "Cinthya Helena Ferreira Martins", role: "lider", equipe: "Caçadores" },
  { id: "3", email: "mychelle@agendou.com", password: "lider123", nome: "Mychelle Alves de Oliveira", role: "lider", equipe: "Tubarão" },
  { id: "4", email: "angela@agendou.com", password: "lider123", nome: "Ângela De Sales Cunha Xavier", role: "lider", equipe: "Aliança" },
  { id: "5", email: "noely@agendou.com", password: "lider123", nome: "Noely Fernandes", role: "lider", equipe: "Magnatas" },
  { id: "6", email: "andre@agendou.com", password: "corretor123", nome: "André Pereira Leal", role: "corretor", equipe: "Caçadores" },
  { id: "7", email: "diego@agendou.com", password: "corretor123", nome: "Diego Italo Santos Sousa", role: "corretor", equipe: "Tubarão" },
  { id: "8", email: "lucas@agendou.com", password: "corretor123", nome: "Lucas Faria Da Silva", role: "corretor", equipe: "Aliança" },
  { id: "9", email: "reinaldo@agendou.com", password: "corretor123", nome: "Jose Reinaldo Da Silva Queiroz", role: "corretor", equipe: "Magnatas" },
];

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("agendou_user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = useCallback(async (email: string, password: string) => {
    const found = MOCK_USERS.find(u => u.email === email && u.password === password);
    if (found) {
      const { password: _, ...userData } = found;
      setUser(userData);
      localStorage.setItem("agendou_user", JSON.stringify(userData));
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem("agendou_user");
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
