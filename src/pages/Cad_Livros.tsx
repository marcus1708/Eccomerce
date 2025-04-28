import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Loja {
  id: string;
  nome: string;
}

export default function CadLivros() {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [ano, setAno] = useState<number | "">("");
  const [paginas, setPaginas] = useState<number | "">("");
  const [tema, setTema] = useState("");
  const [quantidade, setQuantidade] = useState<number | "">("");
  const [idStore, setIdStore] = useState("");
  const [lojas, setLojas] = useState<Loja[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Carregar as lojas cadastradas
    const fetchLojas = async () => {
      try {
        const response = await axios.get("http://localhost:3000/stores");
        setLojas(response.data);
      } catch (err) {
        setError("Erro ao carregar as lojas. Tente novamente.");
      }
    };
    fetchLojas();
  }, []);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/books", {
        titulo,
        autor,
        ano: Number(ano),
        paginas: Number(paginas),
        tema,
        quantidade: Number(quantidade),
        idStore,
      });
      setSuccess(true);
      setTimeout(() => navigate("/books"), 2000);
    } catch (err) {
      setError("Erro ao cadastrar livro. Tente novamente.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <form onSubmit={handleRegister} className="bg-white p-6 rounded shadow-md w-80">
        <h1 className="text-xl font-bold mb-4 text-center">Cadastrar Livro</h1>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-2">Livro cadastrado com sucesso!</p>}
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
          placeholder="Autor"
          className="w-full p-2 mb-3 border rounded"
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
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
          type="number"
          placeholder="Páginas"
          className="w-full p-2 mb-3 border rounded"
          value={paginas}
          onChange={(e) => setPaginas(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Tema"
          className="w-full p-2 mb-3 border rounded"
          value={tema}
          onChange={(e) => setTema(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Quantidade"
          className="w-full p-2 mb-3 border rounded"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
          required
        />
        <select
          className="w-full p-2 mb-4 border rounded"
          value={idStore}
          onChange={(e) => setIdStore(e.target.value)}
          required
        >
          <option value="">Selecione uma loja</option>
          {lojas.map((loja) => (
            <option key={loja.id} value={loja.id}>
              {loja.nome}
            </option>
          ))}
        </select>
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Cadastrar Livro
        </button>
      </form>
    </div>
  );
}