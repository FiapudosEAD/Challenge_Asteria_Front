import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../components/input";
import Button from "../components/buttons";
import { useAuth } from "../context/AuthContext"; 

export default function Register() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => { 
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return alert("As senhas não conferem!");
    }
    if (formData.password.length < 6) {
      return alert("A senha deve ter no mínimo 6 caracteres.");
    }
   
    const registerSuccess = await register(formData.nome, formData.email, formData.password);

    if (registerSuccess) {
      navigate('/');
    }
  };

  const setValue = (name) => (value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
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
          <p className="text-gray-600 mb-5 text-lg self-start">Registre-se</p>
          <div className="w-full flex flex-col gap-4">
            <Input
              type="text"
              placeholder="Nome Completo"
              value={formData.nome}
              setValue={setValue("nome")}
            />
            <Input
              type="email"
              placeholder="E-mail"
              value={formData.email}
              setValue={setValue("email")}
            />
            <Input
              type="password"
              placeholder="Senha (mín. 6 caracteres)"
              value={formData.password}
              setValue={setValue("password")}
            />
            <Input
              type="password"
              placeholder="Confirmar senha"
              value={formData.confirmPassword}
              setValue={setValue("confirmPassword")}
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