// src/pages/CheckoutPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import dayjs from "dayjs";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [numeroCartao, setNumeroCartao] = useState("");
  const [cvv, setCvv] = useState("");
  const [validade, setValidade] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [erroValidade, setErroValidade] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validadeSelecionada = dayjs(validade);
    const dataAtual = dayjs().startOf("month");

    if (validadeSelecionada.isBefore(dataAtual)) {
      setErroValidade("Data de validade expirada. Escolha uma data futura.");
      return;
    }

    setErroValidade("");
    setMensagem("Compra concluída com Sucesso!");
    localStorage.removeItem("carrinho");
    setTimeout(() => navigate("/products"), 2000);
  };

  const handleClear = () => {
    setNumeroCartao("");
    setCvv("");
    setValidade("");
    setMensagem("");
    setErroValidade("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 relative">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-md"
      >
        <h1 className="text-xl font-bold mb-4 text-center">Pagamento</h1>

        <input
          type="text"
          placeholder="Número do Cartão (16 dígitos)"
          maxLength={16}
          pattern="\d{16}"
          value={numeroCartao}
          onChange={(e) => setNumeroCartao(e.target.value)}
          required
          className="w-full p-2 mb-3 border rounded"
        />
        <input
          type="text"
          placeholder="Código CVV (3 dígitos)"
          maxLength={3}
          pattern="\d{3}"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
          required
          className="w-full p-2 mb-3 border rounded"
        />
        <input
          type="month"
          value={validade}
          onChange={(e) => {
            setValidade(e.target.value);
            setErroValidade("");
          }}
          required
          min={dayjs().format("YYYY-MM")}
          className={`w-full p-2 mb-1 border rounded ${erroValidade ? "border-red-500" : ""}`}
        />

        {validade && (
          <p className="text-sm text-gray-500 mb-1">
            Validade selecionada: <strong>{dayjs(validade).format("MM/YYYY")}</strong>
          </p>
        )}

        {erroValidade && (
          <p className="text-red-500 text-sm mb-3">{erroValidade}</p>
        )}

        <div className="flex gap-4 mt-4">
          <button
            type="button"
            onClick={handleClear}
            className="w-full bg-gray-400 text-white p-2 rounded hover:bg-gray-500"
          >
            Limpar
          </button>
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
          >
            Concluir
          </button>
        </div>
      </form>

      <AnimatePresence>
        {mensagem && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4 }}
            className="absolute top-10 bg-green-500 text-white px-6 py-3 rounded shadow-lg text-lg font-semibold"
          >
            {mensagem}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}