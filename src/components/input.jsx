import { useState } from "react";

import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Input({ type = "text", placeholder, value, setValue }) {
  const [showPassword, setShowPassWord] = useState(false);

  // Determina o tipo do input baseando-se nos props e se está mostrando a senha
  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  return (
    <div className="p-2 border-2 border-gray-500 rounded-md flex items-center">
      <input
        type={inputType}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full outline-none bg-transparent"
      />
      {/* Se for senha, mostra o botão para exibir/esconder */}
      {type === "password" && (
        <button
          type="button"
          onClick={() => setShowPassWord((show) => !show)}
          className="ml-2 focus:outline-none"
          tabIndex={-1}
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      )}
    </div>
  );
}
