import { Link } from "react-router-dom";
import { MdOutlineMenu } from "react-icons/md";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className={`w-full bg-zinc-900 p-6 flex flex-col items-center justify-start duration-500 fixed top-0 left-0 z-30 ${
        open ? "h-screen" : "h-[80px]"
      } lg md:h-[100px] lg md:flex-row lg md:justify-between`}
    >
      <div className="w-full flex items-center justify-between">
        <img
          src="logo_asteria_branco.svg"
          alt="Logo"
          className="w-24 lg md:w-56"
        />
        <button
          type="button"
          className="text-white text-3xl lg md:hidden"
          onClick={() => setOpen(!open)}
        >
          <MdOutlineMenu />
        </button>
      </div>

      <ul className={`w-full mt-5 flex flex-col ${open ? "visible" : "invisible"} lg md:mt-0 lg md:justify-end lg md:flex-row lg md:gap-5 lg md:visible`}>
        <li className="text-white font-semibold text-lg rounded p-2 duration-300 hover:text-amber-500 hover:bg-white">
          <Link to={"/dashboard"}>Dashboard</Link>
        </li>
        <li className="text-white font-semibold text-lg rounded p-2 duration-300 hover:text-amber-500 hover:bg-white">
          <Link to={"/produtos"}>Produtos</Link>
        </li>
        <li className="text-white font-semibold text-lg rounded p-2 duration-300 hover:text-amber-500 hover:bg-white">
          <Link to={"/vendas"}>Vendas</Link>
        </li>
        <li className="text-white font-semibold text-lg rounded p-2 duration-300 hover:text-amber-500 hover:bg-white">
          <Link to={"/pdv"}>PDV's</Link>
        </li>
      </ul>
    </header>
  );
}
