import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

interface Usuario {
  nome: string;
  email: string;
}

interface AuthContextType {
  token: string | null;
  usuarioLogado: Usuario | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));
  const [usuarioLogado, setUsuarioLogado] = useState<Usuario | null>(() => {
    const usuario = localStorage.getItem("usuarioLogado");
    return usuario ? JSON.parse(usuario) : null;
  });

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  useEffect(() => {
    if (usuarioLogado) {
      localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado));
    } else {
      localStorage.removeItem("usuarioLogado");
    }
  }, [usuarioLogado]);

  const login = async (email: string, password: string) => {
    const response = await axios.post("http://localhost:3000/users/login", {
      email,
      senha: password, // Ajuste para o campo esperado pela API
    });
    setToken(response.data.token);
    setUsuarioLogado({ nome: response.data.nome, email });
  };

  const logout = () => {
    setToken(null);
    setUsuarioLogado(null);
  };

  return (
    <AuthContext.Provider value={{ token, usuarioLogado, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);