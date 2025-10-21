import { useState } from "react";
import logo from "../img/logo_asteria.svg";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.includes("@") || !email.includes(".com")) return alert("E-mail inválido!");
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.email === email);
    if (!user) return alert("Cadastro não encontrado!");
    if (senha === user.password) {
      alert("Login realizado com sucesso!");
      window.location.href = "/dashboard";
    } else alert("E-mail ou senha incorretos!");
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen w-full">
      <div className="flex-1 bg-gradient-to-r from-orange-600 to-orange-400 flex justify-start items-start p-4">
        <div className="bg-blue-500 text-white p-4 rounded-lg max-w-xs shadow text-sm">
          <p className="font-semibold mb-2">Endpoints necessários:</p>
          <ul className="list-disc list-inside">
            <li><strong>GET:</strong> Recuperar e-mail e senha do usuário logado.</li>
            <li>Sistema de autenticação e recuperação do usuário.</li>
          </ul>
        </div>
      </div>

      <div className="flex-1 bg-gray-100 flex justify-center items-center">
        <div className="w-full max-w-md flex flex-col items-center p-6 gap-4">
          <div className="w-full flex">
            <img src={logo} alt="Logo Astéria" className="w-40 sm:w-32 xs:w-28 mb-4 ml-2" />
          </div>
          <p className="text-gray-600 mb-5 text-lg self-start ml-2">Seja bem-vindo(a)</p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
            <input type="email" placeholder="Digite seu e-mail" value={email} onChange={(e) => setEmail(e.target.value)} required className="p-3 border border-gray-300 rounded-lg focus:border-yellow-400 outline-none transition" />
            <input type="password" placeholder="Digite sua senha" value={senha} onChange={(e) => setSenha(e.target.value)} required className="p-3 border border-gray-300 rounded-lg focus:border-yellow-400 outline-none transition" />
            <button type="submit" className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-semibold p-3 rounded-lg transition">Entrar</button>
          </form>
          <p className="text-gray-500 text-sm mt-4">
            Novo aqui? <a href="/register" className="text-orange-600 font-semibold hover:underline">Cadastre-se</a>
          </p>
        </div>
      </div>
    </div>
  );
}
