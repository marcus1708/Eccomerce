import React, { useEffect } from "react";

interface ToastNotificationProps {
  message: string;
  onClose: () => void;
}

export const ToastNotification: React.FC<ToastNotificationProps> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // A mensagem desaparece após 3 segundos

    return () => clearTimeout(timer); // Limpa o timer quando o componente for desmontado
  }, [message, onClose]);

  return (
    <div className="fixed bottom-5 right-5 bg-green-500 text-white p-4 rounded shadow-lg z-50">
      {message}
    </div>
  );
};
