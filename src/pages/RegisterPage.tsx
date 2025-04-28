import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function RegisterPage() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [profissao, setProfissao] = useState("");
  const [idade, setIdade] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/users", {
        nome,
        email,
        profissao,
        idade: parseInt(idade, 10), // Converte idade para número
        senha,
      });
      setSuccess(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError("Erro ao cadastrar usuário. Tente novamente.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <form onSubmit={handleRegister} className="bg-white p-6 rounded shadow-md w-80">
        <h1 className="text-xl font-bold mb-4 text-center">Cadastro de Usuário</h1>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-2">Cadastro realizado com sucesso!</p>}
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
          type="text"
          placeholder="Profissão"
          className="w-full p-2 mb-3 border rounded"
          value={profissao}
          onChange={(e) => setProfissao(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Idade"
          className="w-full p-2 mb-3 border rounded"
          value={idade}
          onChange={(e) => setIdade(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          className="w-full p-2 mb-4 border rounded"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Cadastrar
        </button>
        <p className="text-sm mt-4 text-center">
          Já tem conta? <Link to="/login" className="text-blue-500">Faça login</Link>
        </p>
      </form>
    </div>
  );
}