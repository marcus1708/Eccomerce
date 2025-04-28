import { useEffect, useState } from "react";
import axios from "axios";

interface Filme {
  id: string;
  titulo: string;
  diretor: string;
  ano: number;
  genero: string;
  duracao: number;
  quantidade: number;
}

export default function ListarFilmes() {
  const [filmes, setFilmes] = useState<Filme[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFilmes = async () => {
      try {
        const response = await axios.get("http://localhost:3000/movies");
        setFilmes(response.data);
      } catch (err) {
        setError("Erro ao carregar os filmes. Tente novamente.");
      }
    };
    fetchFilmes();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Lista de Filmes</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="space-y-4">
        {filmes.map((filme) => (
          <div key={filme.id} className="bg-white p-4 rounded shadow-md">
            <h2 className="text-lg font-bold">{filme.titulo}</h2>
            <p>Diretor: {filme.diretor}</p>
            <p>Ano: {filme.ano}</p>
            <p>Gênero: {filme.genero}</p>
            <p>Duração: {filme.duracao} minutos</p>
            <p>Quantidade: {filme.quantidade}</p>
          </div>
        ))}
      </div>
    </div>
  );
}