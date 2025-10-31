import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Input from "../components/input";
import Button from "../components/buttons";
import { useAuth } from "../context/AuthContext"; 

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const { login } = useAuth(); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.includes("@") || !email.includes(".com")) {
      return alert("E-mail inválido!");
    }

    const loginSuccess = await login(email, senha); 
    if (loginSuccess) {
      navigate('/dashboard');
    }
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
            <Link
              to="/registro"
              className="text-orange-600 font-semibold hover:underline"
            >
              Cadastre-se
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}