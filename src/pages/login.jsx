import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/buttons";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((u) => u.email === email);
    if (!email.includes("@") || !email.includes(".com"))
      return alert("E-mail inválido!");
    if (!user) return alert("Cadastro não encontrado!");
    if (senha !== user.password) return alert("E-mail ou senha incorretos!");
    alert("Login realizado com sucesso!");
    window.location.href = "/home";
  };

  return (
    <div className="bg-gradient-to-r from-orange-600 to-orange-400 flex h-screen">
      <div className="w-full ml-auto bg-gray-100 flex justify-center items-center lg:w-[50%]">
        <form
          onSubmit={handleSubmit}
          className="w-[80%] flex flex-col items-center gap-4"
        >
          <img
            src="/logo_asteria.svg"
            alt="Logo Astéria"
            className="w-40 mb-4 self-start"
          />
          <p className="text-gray-600 mb-5 text-lg self-start">
            Seja bem-vindo(a)
          </p>
          <div className="w-full flex flex-col gap-4">
            <Input
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              setValue={setEmail}
            />
            <Input
              type="password"
              placeholder="Digite sua senha"
              value={senha}
              setValue={setSenha}
            />
            <Button type={"submit"} message={"Entrar"} />
          </div>
          <p className="text-gray-500 text-sm mt-4">
            Novo aqui?{" "}
            <a
              href="/registro"
              className="text-orange-600 font-semibold hover:underline"
            >
              Cadastre-se
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
