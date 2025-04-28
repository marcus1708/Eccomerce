import { useEffect, useState } from "react";
import axios from "axios";

interface ItemCarrinho {
  id: number;
  nome: string;
  preco: number;
  quantidade: number;
}

export default function CartPage() {
  const [itens, setItens] = useState<ItemCarrinho[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCarrinho = async () => {
      try {
        const response = await axios.get("http://localhost:3000/carts");
        setItens(response.data);
      } catch (err) {
        setError("Erro ao carregar o carrinho.");
      }
    };
    fetchCarrinho();
  }, []);

  const calcularTotal = () => {
    return itens.reduce((total, item) => total + item.preco * item.quantidade, 0).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Carrinho</h1>
      {error && <p className="text-red-500">{error}</p>}
      <div className="space-y-4">
        {itens.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded shadow-md flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold">{item.nome}</h2>
              <p className="text-gray-700">Quantidade: {item.quantidade}</p>
            </div>
            <p className="text-blue-500 font-bold">R$ {(item.preco * item.quantidade).toFixed(2)}</p>
          </div>
        ))}
      </div>
      <div className="mt-6 text-right">
        <h2 className="text-xl font-bold">Total: R$ {calcularTotal()}</h2>
      </div>
    </div>
  );
}