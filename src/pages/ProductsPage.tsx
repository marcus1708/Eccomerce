// src/pages/ProductsPage.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface Produto {
  _id: string;
  nome: string;
  descricao: string;
  preco: number;
  quantidade: number;
  imagem?: string;
}

export default function ProductsPage() {
  const { token } = useAuth();
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [mensagem, setMensagem] = useState("");
  const [produtoSelecionado, setProdutoSelecionado] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProdutos() {
      try {
        const response = await axios.get("https://serverest.dev/produtos");
        setProdutos(response.data.produtos);
      } catch (err) {
        console.error(err);
      }
    }

    fetchProdutos();
  }, []);

  const handleAddToCart = (produto: Produto) => {
    const carrinho = JSON.parse(localStorage.getItem("carrinho") || "[]");
    carrinho.push(produto);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    setMensagem("Produto adicionado ao carrinho!");
    setTimeout(() => setMensagem(""), 3000);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Lista de Produtos</h1>

      {mensagem && (
        <p className="text-green-600 text-center mb-4 font-medium">{mensagem}</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {produtos.map((produto) => (
          <div
            key={produto._id}
            className="border rounded p-4 shadow hover:shadow-lg cursor-pointer relative"
            onClick={() =>
              setProdutoSelecionado(
                produtoSelecionado === produto._id ? null : produto._id
              )
            }
          >
            {produto.imagem && (
              <img
                src={produto.imagem}
                alt={produto.nome}
                className="w-full h-40 object-cover rounded mb-2"
              />
            )}
            <h2 className="text-lg font-bold mb-1">{produto.nome}</h2>
            <p className="text-sm text-gray-600 mb-1">{produto.descricao}</p>
            <p className="text-sm font-semibold text-blue-500 mb-1">
              R$ {produto.preco.toFixed(2)}
            </p>
            <p className="text-sm text-gray-700 mb-2">
              Quantidade: {produto.quantidade}
            </p>

            {produtoSelecionado === produto._id && (
              <div className="absolute inset-0 bg-white bg-opacity-95 flex flex-col items-center justify-center gap-2 p-4 rounded">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/edit-product/${produto._id}`);
                  }}
                  className="bg-yellow-400 text-white px-4 py-2 rounded w-full hover:bg-yellow-500"
                >
                  Editar Produto
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(produto);
                    setProdutoSelecionado(null);
                  }}
                  className="bg-green-500 text-white px-4 py-2 rounded w-full hover:bg-green-600"
                >
                  Adicionar ao Carrinho
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setProdutoSelecionado(null);
                  }}
                  className="text-sm text-red-500 hover:underline mt-2"
                >
                  Cancelar
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <button
          onClick={() => navigate("/carrinho")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Ir para o Carrinho
        </button>
      </div>
    </div>
  );
}
