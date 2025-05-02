import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function WelcomePage() {
  const { logout, usuarioLogado } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white rounded shadow p-8 max-w-md w-full text-center">
      <h1 className="text-2xl font-bold mb-6">
  Bem-vindo {usuarioLogado?.nome ? `, ${usuarioLogado.nome}` : ""}!
</h1>

        <div className="space-y-4">
          <button
            onClick={() => navigate("/register")}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full"
          >
            Cadastrar Usuário
          </button>
          <button
            onClick={() => navigate("/usuarios")}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 w-full"
          >
            Listar Usuários
          </button>
          <button
            onClick={() => navigate("/add-product")}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
          >
            Cadastrar Produtos
          </button>
          <button
            onClick={() => navigate("/products")}
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 w-full"
          >
            Listar Produtos
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full mt-4"
          >
            Sair
          </button>
        </div>
      </div>
    </div>
  );
}
