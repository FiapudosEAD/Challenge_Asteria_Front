import { useState } from "react";
import logo from "../img/logo_asteria.svg";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "", cpf: "", email: "", password: "", confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(formData.password !== formData.confirmPassword){ alert("As senhas não conferem!"); return; }
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if(users.some(u=>u.email===formData.email)){ alert("E-mail já cadastrado!"); return; }
    users.push({name: formData.name, cpf: formData.cpf, email: formData.email, password: formData.password});
    localStorage.setItem("users", JSON.stringify(users));
    alert("Cadastro realizado com sucesso!");
    window.location.href="/login";
  }

  return (
    <div className="flex flex-col lg:flex-row h-screen w-full">
      <div className="flex-1 bg-gradient-to-r from-orange-600 to-orange-400 flex justify-start items-start p-4">
        <div className="bg-blue-500 text-white p-4 rounded-lg max-w-xs shadow text-sm">
          <p className="font-semibold mb-2">Endpoints necessários:</p>
          <ul className="list-disc list-inside">
            <li>POST: Registrar na tabela de usuários os campos do formulário.</li>
          </ul>
        </div>
      </div>
      <div className="flex-1 bg-gray-100 flex justify-center items-center">
        <div className="w-full max-w-md flex flex-col items-center p-6 gap-4">
          <img src={logo} alt="Logo Astéria" className="w-56 sm:w-44 xs:w-36 mb-4"/>
          <h2 className="text-gray-600 text-2xl mb-4">Registre-se</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
            <input type="text" placeholder="Nome" name="name" value={formData.name} onChange={handleChange} required className="p-3 border border-gray-300 rounded-lg focus:border-yellow-400 outline-none transition"/>
            <input type="text" placeholder="CPF/CNPJ" name="cpf" value={formData.cpf} onChange={handleChange} required className="p-3 border border-gray-300 rounded-lg focus:border-yellow-400 outline-none transition"/>
            <input type="email" placeholder="E-mail" name="email" value={formData.email} onChange={handleChange} required className="p-3 border border-gray-300 rounded-lg focus:border-yellow-400 outline-none transition"/>
            <input type="password" placeholder="Senha" name="password" value={formData.password} onChange={handleChange} required className="p-3 border border-gray-300 rounded-lg focus:border-yellow-400 outline-none transition"/>
            <input type="password" placeholder="Confirmar senha" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required className="p-3 border border-gray-300 rounded-lg focus:border-yellow-400 outline-none transition"/>
            <button type="submit" className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-semibold p-3 rounded-lg transition">Cadastrar</button>
          </form>
          <p className="text-gray-500 text-sm mt-4">Já tem uma conta? <a href="/login" className="text-orange-600 font-semibold hover:underline">Acessar agora</a></p>
        </div>
      </div>
    </div>
  );
}
