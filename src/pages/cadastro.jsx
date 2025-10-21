import { useState } from "react";
import logo from "../img/logo_asteria.svg";
import Input from "../components/Input";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "", cpf: "", email: "", password: "", confirmPassword: ""
  });

  const handleChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

  const handleSubmit = (e) => {
    e.preventDefault();
    if(formData.password !== formData.confirmPassword) return alert("As senhas não conferem!");
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if(users.some(u => u.email === formData.email)) return alert("E-mail já cadastrado!");
    users.push({ ...formData, confirmPassword: undefined });
    localStorage.setItem("users", JSON.stringify(users));
    alert("Cadastro realizado com sucesso!");
    window.location.href="/login";
  }

  return (
    <div className="flex h-screen">
      <div className="flex-1 bg-gradient-to-r from-orange-600 to-orange-400 p-4 flex items-start">
        <div className="bg-blue-500 text-white p-4 rounded-lg max-w-xs shadow text-sm">
          <p className="font-semibold mb-2">Endpoints necessários:</p>
          <ul className="list-disc list-inside">
            <li>POST: Registrar na tabela de usuários os campos do formulário.</li>
          </ul>
        </div>
      </div>

      <div className="flex-1 bg-gray-100 flex justify-center items-center p-6">
        <div className="w-full max-w-md flex flex-col gap-4">
          <div className="flex flex-col items-start mb-4">
            <img src={logo} alt="Logo Astéria" className="w-56 mb-2"/>
            <h2 className="text-gray-600 text-2xl">Registre-se</h2>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
            <Input type="text" placeholder="Nome" value={formData.name} setValue={(v) => setFormData({...formData, name: v})} />
            <Input type="text" placeholder="CPF/CNPJ" value={formData.cpf} setValue={(v) => setFormData({...formData, cpf: v})} />
            <Input type="email" placeholder="E-mail" value={formData.email} setValue={(v) => setFormData({...formData, email: v})} />
            <Input type="password" placeholder="Senha" value={formData.password} setValue={(v) => setFormData({...formData, password: v})} />
            <Input type="password" placeholder="Confirmar senha" value={formData.confirmPassword} setValue={(v) => setFormData({...formData, confirmPassword: v})} />
            <button type="submit" className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-semibold p-3 rounded-lg transition">
              Cadastrar
            </button>
          </form>

          <p className="text-gray-500 text-sm mt-4 text-center">
            Já tem uma conta? <a href="/login" className="text-orange-600 font-semibold hover:underline">Acessar agora</a>
          </p>
        </div>
      </div>
    </div>
  );
}
