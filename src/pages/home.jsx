import { useState } from "react";
import Card from "../components/Card";
import ComboBox from "../components/ComboBox";


export default function Home() {
  const [tipoVenda, setTipoVenda] = useState("Sell-in");

  return (
    <div className="h-screen font-sans">
      {/* Main */}
      <main className="px-4 lg:px-12 md:px-10">
        {/* Cards */}
        <section className="grid grid-cols-1 gap-4 mb-6 lg:grid-cols-4 md:grid-cols-2">
          {[
            {title:"No. Vendas", value:"256"},
            {title:"PDV mais rentável", value:"Clabin"},
            {title:"Produto mais vendido", value:"Makita"},
            {title:"Dia com mais vendas", value:"07/10"}
          ].map(c => <Card key={c.title} {...c} />)}
        </section>

        <section className="overflow-x-auto mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-2 sm:gap-0">
            <h2 className="text-xl font-bold">Vendas</h2>
            <ComboBox
              type="tipo-venda"
              value={tipoVenda}
              setValue={setTipoVenda}
              placeholder="Selecione o tipo de venda"
            />
          </div>
        </section>
      </main>
    </div>
  );
}
