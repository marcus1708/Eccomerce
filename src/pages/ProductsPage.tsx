import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Pencil, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";

interface Produto {
  _id: string;
  nome: string;
  descricao: string;
  preco: number;
  quantidade: number;
  imagem?: string;
}

export default function ProductsPage() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [carrinho, setCarrinho] = useState<Produto[]>([]);
  const [produtoEditando, setProdutoEditando] = useState<string | null>(null);
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState(0);
  const [quantidade, setQuantidade] = useState(0);
  const [busca, setBusca] = useState("");

  const navigate = useNavigate();

  // Atualizar o carrinho sempre que o componente for carregado
  useEffect(() => {
    axios.get("https://serverest.dev/produtos").then((res) => {
      setProdutos(res.data.produtos);
    });
  }, []);

  useEffect(() => {
    const carrinhoLocal = JSON.parse(localStorage.getItem("carrinho") || "[]");
    setCarrinho(carrinhoLocal);
  }, []);

  const adicionarAoCarrinho = (produto: Produto) => {
    const carrinhoAtual = JSON.parse(localStorage.getItem("carrinho") || "[]");
    const novoCarrinho = [...carrinhoAtual, produto];
    localStorage.setItem("carrinho", JSON.stringify(novoCarrinho));
    setCarrinho(novoCarrinho);
  };

  const iniciarEdicao = (produto: Produto) => {
    setProdutoEditando(produto._id);
    setNome(produto.nome);
    setDescricao(produto.descricao);
    setPreco(produto.preco);
    setQuantidade(produto.quantidade);
  };

  const cancelarEdicao = () => {
    setProdutoEditando(null);
  };

  const confirmarEdicao = (id: string) => {
    const produtosAtualizados = produtos.map((p) =>
      p._id === id ? { ...p, nome, descricao, preco, quantidade } : p
    );
    setProdutos(produtosAtualizados);
    setProdutoEditando(null);
  };

  const produtosFiltrados = produtos.filter((produto) =>
    produto.nome.toLowerCase().includes(busca.toLowerCase())
  );

  const contarItensCarrinho = () => {
    return carrinho.length;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold text-center w-full">Lista de Produtos</h1>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button onClick={() => navigate("/cart")} variant="ghost" className="relative">
                <ShoppingCart className="h-6 w-6" />
                {/* Badge de quantidade de itens */}
                {contarItensCarrinho() > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5">
                    {contarItensCarrinho()}
                  </span>
                )}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Ir para o Carrinho</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="mb-4 flex items-center gap-2">
        <Input
          type="text"
          placeholder="Buscar produto pelo nome"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        <Button variant="outline">
          <Search className="h-5 w-5" />
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {produtosFiltrados.map((produto) => (
          <div
            key={produto._id}
            className="bg-white p-4 rounded shadow hover:shadow-lg transition duration-300"
          >
            {produtoEditando === produto._id ? (
              <>
                <input
                  className="w-full p-1 border mb-2"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
                <input
                  className="w-full p-1 border mb-2"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                />
                <input
                  type="number"
                  className="w-full p-1 border mb-2"
                  value={preco}
                  onChange={(e) => setPreco(parseFloat(e.target.value))}
                />
                <input
                  type="number"
                  className="w-full p-1 border mb-2"
                  value={quantidade}
                  onChange={(e) => setQuantidade(parseInt(e.target.value))}
                />
                <div className="flex gap-2">
                  <Button onClick={() => confirmarEdicao(produto._id)} className="bg-green-500 hover:bg-green-600">Confirmar</Button>
                  <Button onClick={cancelarEdicao} className="bg-red-500 hover:bg-red-600">Cancelar</Button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-lg font-semibold mb-1">{produto.nome}</h2>
                <p className="text-sm text-gray-600 mb-1">{produto.descricao}</p>
                <p className="text-sm font-bold mb-2">R$ {produto.preco.toFixed(2)}</p>
                <div className="flex gap-2">
                  <Button onClick={() => iniciarEdicao(produto)} className="bg-yellow-500 hover:bg-yellow-600">
                    <Pencil className="h-4 w-4 mr-1" /> Editar
                  </Button>
                  <Button onClick={() => adicionarAoCarrinho(produto)}>
                    <ShoppingCart className="h-4 w-4 mr-1" /> Adicionar ao Carrinho
                  </Button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
