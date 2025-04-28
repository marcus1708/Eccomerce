import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CadFilmes() {
  const [titulo, setTitulo] = useState("");
  const [diretor, setDiretor] = useState("");
  const [ano, setAno] = useState<number | "">("");
  const [genero, setGenero] = useState("");
  const [duracao, setDuracao] = useState<number | "">("");
  const [quantidade, setQuantidade] = useState<number | "">("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/movies", {
        titulo,
        diretor,
        ano: Number(ano),
        genero,
        duracao: Number(duracao),
        quantidade: Number(quantidade),
      });
      setSuccess(true);
      setTimeout(() => navigate("/movies"), 2000);
    } catch (err) {
      setError("Erro ao cadastrar filme. Tente novamente.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <form onSubmit={handleRegister} className="bg-white p-6 rounded shadow-md w-80">
        <h1 className="text-xl font-bold mb-4 text-center">Cadastrar Filme</h1>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-2">Filme cadastrado com sucesso!</p>}
        <input
          type="text"
          placeholder="Título"
          className="w-full p-2 mb-3 border rounded"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Diretor"
          className="w-full p-2 mb-3 border rounded"
          value={diretor}
          onChange={(e) => setDiretor(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Ano"
          className="w-full p-2 mb-3 border rounded"
          value={ano}
          onChange={(e) => setAno(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Gênero"
          className="w-full p-2 mb-3 border rounded"
          value={genero}
          onChange={(e) => setGenero(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Duração (minutos)"
          className="w-full p-2 mb-3 border rounded"
          value={duracao}
          onChange={(e) => setDuracao(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Quantidade"
          className="w-full p-2 mb-4 border rounded"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Cadastrar Filme
        </button>
      </form>
    </div>
  );
}