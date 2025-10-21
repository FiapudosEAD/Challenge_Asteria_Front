import { useState } from "react";
import Card from "../components/Card";
import InfoBox from "../components/InfoBox";
import Table from "../components/Table";
import ComboBox from "../components/ComboBox";
import { vendasData } from "../data/vendas";
import Logo from "../img/logo_asteria_branco.svg"; 

export default function Home() {
  const [tipoVenda, setTipoVenda] = useState("Sell-in");
  const vendasFiltradas = vendasData.filter(v => v.tipo === tipoVenda);

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-center bg-black text-white p-4 md:p-6 gap-2 md:gap-0">
        <img src={Logo} alt="Logo Astéria" className="h-9" />
        <ul className="flex flex-wrap md:flex-nowrap gap-3 md:gap-5">
          {["Dashboard","Produtos","Vendas","PDV'S"].map(i => (
            <li key={i}>
              <a href="#" className={`px-2 py-1 rounded ${i==="Dashboard"?"bg-yellow-500 text-black":"hover:bg-yellow-500 hover:text-black"}`}>{i}</a>
            </li>
          ))}
        </ul>
      </header>

      {/* Main */}
      <main className="p-4 md:p-6">
        {/* Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            {title:"No. Vendas", value:"256"},
            {title:"PDV mais rentável", value:"Clabin"},
            {title:"Produto mais vendido", value:"Makita"},
            {title:"Dia com mais vendas", value:"07/10"}
          ].map(c => <Card key={c.title} {...c} />)}
        </section>

        {/* Tabela */}
        <section className="overflow-x-auto mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-2 sm:gap-0">
            <h2 className="text-xl font-bold">Vendas</h2>
            <ComboBox
              type="tipo-venda"
              value={tipoVenda}
              setValue={setTipoVenda}
              placeholder="Selecione o tipo de venda"
              options={[
                { value: "Sell-in", label: "Sell-in" },
                { value: "Sell-out", label: "Sell-out" }
              ]}
            />
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
