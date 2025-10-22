import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/buttons";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    cpf: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword)
      return alert("As senhas não conferem!");
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.some((u) => u.email === formData.email))
      return alert("E-mail já cadastrado!");
    users.push({ ...formData, confirmPassword: undefined });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Cadastro realizado com sucesso!");
    window.location.href = "/login";
  };

  return (
    <div className="bg-gradient-to-r from-orange-600 to-orange-400 flex h-screen">
      <div className="w-full ml-auto bg-gray-100 flex justify-center items-center lg:w-[50%]">
        <form
          action={handleSubmit}
          className="w-[80%] flex flex-col items-center gap-4"
        >
          <img
            src="/logo_asteria.svg"
            alt="Logo Astéria"
            className="w-40 mb-4 self-start"
          />
          <p className="text-gray-600 mb-5 text-lg self-start">Registre-se</p>
          <div className="w-full flex flex-col gap-4">
            <Input
              type="text"
              placeholder="Nome"
              value={formData.name}
              setValue={(v) => setFormData({ ...formData, name: v })}
            />
            <Input
              type="text"
              placeholder="CPF/CNPJ"
              value={formData.cpf}
              setValue={(v) => setFormData({ ...formData, cpf: v })}
            />
            <Input
              type="email"
              placeholder="E-mail"
              value={formData.email}
              setValue={(v) => setFormData({ ...formData, email: v })}
            />
            <Input
              type="password"
              placeholder="Senha"
              value={formData.password}
              setValue={(v) => setFormData({ ...formData, password: v })}
            />
            <Input
              type="password"
              placeholder="Confirmar senha"
              value={formData.confirmPassword}
              setValue={(v) => setFormData({ ...formData, confirmPassword: v })}
            />
            <Button type={"submit"} message={"Cadastrar"} />
          </div>

          <p className="text-gray-500 text-sm mt-4 text-center">
            Já tem uma conta?{" "}
            <a
              href="/"
              className="text-orange-600 font-semibold hover:underline"
            >
              Acessar agora
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
