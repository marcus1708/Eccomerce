// src/pages/ProductCreatePage.tsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

export default function ProductCreatePage() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState(0);
  const [quantidade, setQuantidade] = useState(0);
  const [mensagem, setMensagem] = useState("");
  const [imagemFile, setImagemFile] = useState<File | null>(null);
  const [imagemPreview, setImagemPreview] = useState<string | null>(null);
  const { token } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let imagemUrl = "";
    if (imagemFile) {
      imagemUrl = URL.createObjectURL(imagemFile);
    }

    try {
      await axios.post(
        "https://serverest.dev/produtos",
        {
          nome,
          descricao,
          preco,
          quantidade,
          imagem: imagemUrl,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setMensagem("Produto cadastrado com sucesso!");
      setTimeout(() => navigate("/products"), 1500);
    } catch {
      setMensagem("Já existe produto com esse nome.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <h1 className="text-xl font-bold mb-4 text-center">Cadastro de Produto</h1>

        {mensagem && <p className="text-sm text-center mb-4 text-blue-500">{mensagem}</p>}

        <input
          type="text"
          placeholder="Nome"
          className="w-full p-2 mb-3 border rounded"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />

        <textarea
          placeholder="Descrição"
          className="w-full p-2 mb-3 border rounded"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Preço"
          className="w-full p-2 mb-1 border rounded"
          value={preco}
          onChange={(e) => setPreco(parseFloat(e.target.value))}
          required
        />
        <p className="text-sm text-gray-500 mb-3">
          Informe o preço do produto em reais (ex: 49.90)
        </p>

        <input
          type="number"
          placeholder="Quantidade"
          className="w-full p-2 mb-1 border rounded"
          value={quantidade}
          onChange={(e) => setQuantidade(parseInt(e.target.value))}
          required
        />
        <p className="text-sm text-gray-500 mb-4">
          Informe a quantidade disponível em estoque
        </p>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Imagem do Produto</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              setImagemFile(file);
              if (file) {
                setImagemPreview(URL.createObjectURL(file));
              } else {
                setImagemPreview(null);
              }
            }}
            className="w-full p-2 border rounded"
          />
          {imagemPreview && (
            <img
              src={imagemPreview}
              alt="Prévia do Produto"
              className="mt-2 w-full h-48 object-cover rounded"
            />
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Cadastrar Produto
        </button>
      </form>

      <Link
        to="/carrinho"
        className="mt-6 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
      >
        Ir para o Carrinho
      </Link>
    </div>
  );
}
