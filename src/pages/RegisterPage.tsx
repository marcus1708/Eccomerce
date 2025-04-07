import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("https://serverest.dev/usuarios", {
        email,
        nome,
        password,
        administrador: "true",
      });
      setSuccess("Cadastro realizado com sucesso!");
      setTimeout(() => navigate("/"), 1500);
    } catch {
      setError("Erro ao cadastrar. Verifique os dados.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleRegister} className="bg-white p-6 rounded shadow-md w-80">
        <h1 className="text-xl font-bold mb-4 text-center">Cadastro</h1>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-2">{success}</p>}
        <input
          type="text"
          placeholder="Nome"
          className="w-full p-2 mb-3 border rounded"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          className="w-full p-2 mb-4 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
          Cadastrar
        </button>
        <p className="text-sm mt-4 text-center">
          Já tem conta? <Link to="/" className="text-blue-500">Faça login</Link>
        </p>
      </form>
    </div>
  );
}
