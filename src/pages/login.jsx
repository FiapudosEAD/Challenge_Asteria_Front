import { useState } from "react";
import logo from "../img/logo_asteria.svg";
import Input from "../components/Input";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.email === email);
    if (!email.includes("@") || !email.includes(".com")) return alert("E-mail inválido!");
    if (!user) return alert("Cadastro não encontrado!");
    if (senha !== user.password) return alert("E-mail ou senha incorretos!");
    alert("Login realizado com sucesso!");
    window.location.href = "/home";
  };

  return (
    <div className="flex h-screen">
      <div className="flex-1 bg-gradient-to-r from-orange-600 to-orange-400 p-4 flex items-start">
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
          <img src={logo} alt="Logo Astéria" className="w-40 mb-4 self-start" />
          <p className="text-gray-600 mb-5 text-lg self-start">Seja bem-vindo(a)</p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
            <Input type="email" placeholder="Digite seu e-mail" value={email} setValue={setEmail} />
            <Input type="password" placeholder="Digite sua senha" value={senha} setValue={setSenha} />
            <button type="submit" className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-semibold p-3 rounded-lg transition">
              Entrar
            </button>
          </form>
          <p className="text-gray-500 text-sm mt-4">
            Novo aqui? <a href="/cadastro" className="text-orange-600 font-semibold hover:underline">Cadastre-se</a>
          </p>
        </div>
      </div>
    </div>
  );
}
