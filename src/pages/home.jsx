import { useState } from "react";
import Card from "../components/Card";
import InfoBox from "../components/InfoBox";
import Table from "../components/Table";
import { vendasData } from "../data/vendas";
import Logo from "../img/logo_asteria_branco.svg"; 

export default function Home() {
  const [tipoVenda, setTipoVenda] = useState("Sell-in");
  const vendasFiltradas = vendasData.filter((v) => v.tipo === tipoVenda);

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-center bg-black text-white p-4 md:p-6 gap-2 md:gap-0">
        <div className="logo">
          <img src={Logo} alt="Logo Astéria" className="h-9" />
        </div>
        <nav>
          <ul className="flex flex-wrap md:flex-nowrap gap-3 md:gap-5">
            <li>
              <a href="#" className="bg-yellow-500 text-black px-2 py-1 rounded">Dashboard</a>
            </li>
            <li>
              <a href="#" className="hover:bg-yellow-500 hover:text-black px-2 py-1 rounded">Produtos</a>
            </li>
            <li>
              <a href="#" className="hover:bg-yellow-500 hover:text-black px-2 py-1 rounded">Vendas</a>
            </li>
            <li>
              <a href="#" className="hover:bg-yellow-500 hover:text-black px-2 py-1 rounded">PDV'S</a>
            </li>
          </ul>
        </nav>
      </header>

      {/* Main */}
      <main className="p-4 md:p-6">
        {/* Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card title="No. Vendas" value="256" />
          <Card title="PDV mais rentável" value="Clabin" />
          <Card title="Produto mais vendido" value="Makita" />
          <Card title="Dia com mais vendas" value="07/10" />
        </section>

        {/* Tabela */}
        <section className="overflow-x-auto mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-2 sm:gap-0">
            <h2 className="text-xl font-bold">Vendas</h2>
            <select
              value={tipoVenda.toLowerCase() === "sell-in" ? "sellin" : "sellout"}
              onChange={(e) =>
                setTipoVenda(e.target.value === "sellin" ? "Sell-in" : "Sell-Out")
              }
              className="border border-gray-300 rounded px-2 py-1"
            >
              <option value="sellin">Sell-in</option>
              <option value="sellout">Sell-out</option>
            </select>
          </div>
          <Table data={vendasFiltradas} />
        </section>

        {/* InfoBox */}
        <div className="flex justify-end mb-6">
          <InfoBox>
            <h4 className="font-bold mb-2">Endpoints necessários:</h4>
            <ul className="list-disc list-inside">
              <li>GET: Recuperar informações para os cards.</li>
              <li>GET: Dados da tabela de vendas de acordo com o usuário logado.</li>
              <li>GET: Dados da tabela de vendas com filtro de tipo.</li>
            </ul>
          </InfoBox>
        </div>
      </main>
    </div>
  );
}
