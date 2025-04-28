import { useEffect, useState } from "react";
import axios from "axios";

interface Livro {
  id: string;
  titulo: string;
  autor: string;
  ano: number;
  paginas: number;
  tema: string;
  quantidade: number;
  idStore: string;
}

export default function ListarLivros() {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchLivros = async () => {
      try {
        const response = await axios.get("http://localhost:3000/books");
        setLivros(response.data);
      } catch (err) {
        setError("Erro ao carregar os livros. Tente novamente.");
      }
    };
    fetchLivros();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Lista de Livros</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="space-y-4">
        {livros.map((livro) => (
          <div key={livro.id} className="bg-white p-4 rounded shadow-md">
            <h2 className="text-lg font-bold">{livro.titulo}</h2>
            <p>Autor: {livro.autor}</p>
            <p>Ano: {livro.ano}</p>
            <p>Páginas: {livro.paginas}</p>
            <p>Tema: {livro.tema}</p>
            <p>Quantidade: {livro.quantidade}</p>
            <p>ID da Loja: {livro.idStore}</p>
          </div>
        ))}
      </div>
    </div>
  );
}