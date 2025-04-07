import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

interface Usuario {
  _id: string;
  nome: string;
  email: string;
  administrador: string;
}

export default function ListUsersPage() {
  const { token } = useAuth();
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get("https://serverest.dev/usuarios", {
          headers: { Authorization: token },
        });
        setUsuarios(response.data.usuarios);
      } catch (err) {
        console.error("Erro ao buscar usuários", err);
      }
    };

    fetchUsuarios();
  }, [token]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-center">Usuários Cadastrados</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {usuarios.map((usuario) => (
          <div key={usuario._id} className="bg-white rounded shadow p-4">
            <h2 className="text-lg font-semibold">{usuario.nome}</h2>
            <p className="text-sm text-gray-500">{usuario.email}</p>
            <p className="text-sm mt-2">
              <span className="font-semibold">Administrador:</span> {usuario.administrador === "true" ? "Sim" : "Não"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
