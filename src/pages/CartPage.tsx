// src/pages/CartPage.tsx
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Produto {
  _id: string;
  nome: string;
  descricao: string;
  preco: number;
  quantidade: number;
}

export default function CartPage() {
  const [carrinho, setCarrinho] = useState<Produto[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Recupera os produtos do carrinho do localStorage
    const carrinhoLocal = JSON.parse(localStorage.getItem("carrinho") || "[]");
    setCarrinho(carrinhoLocal);
  }, []);

  const removerDoCarrinho = (produtoId: string) => {
    const carrinhoAtualizado = carrinho.filter((produto) => produto._id !== produtoId);
    setCarrinho(carrinhoAtualizado);
    localStorage.setItem("carrinho", JSON.stringify(carrinhoAtualizado));
  };

  const concluirCompra = () => {
    // Exibe uma mensagem de compra concluída
    alert("Compra concluída com sucesso!");
    // Limpa o carrinho após a conclusão da compra
    localStorage.removeItem("carrinho");
    setCarrinho([]);
    navigate("/"); // Redireciona para a página inicial
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Carrinho de Compras</h1>
      
      {carrinho.length === 0 ? (
        <p className="text-center">Seu carrinho está vazio!</p>
      ) : (
        <div className="space-y-4">
          {carrinho.map((produto) => (
            <div
              key={produto._id}
              className="bg-white p-4 rounded shadow hover:shadow-lg transition duration-300"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-semibold">{produto.nome}</h2>
                  <p className="text-sm text-gray-600">{produto.descricao}</p>
                  <p className="text-sm font-bold mt-2">R$ {produto.preco.toFixed(2)}</p>
                </div>
                <Button
                  onClick={() => removerDoCarrinho(produto._id)}
                  className="bg-red-500 hover:bg-red-600 text-white"
                >
                  Remover
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 flex justify-between items-center">
        <Button
          onClick={() => navigate("/products")}
          className="bg-gray-500 hover:bg-gray-600 text-white"
        >
          Continuar Comprando
        </Button>
        <Button
          onClick={concluirCompra}
          className="bg-green-500 hover:bg-green-600 text-white"
        >
          Finalizar Pagamento
        </Button>
      </div>
    </div>
  );
}
