import { useState, useEffect } from "react";
import Card from "../components/card";
import ComboBox from "../components/ComboBox";
import Table from "../components/table";
import api from "../services/api";

export default function Home() {
  const [tipoVenda, setTipoVenda] = useState("Concluída");
  const [cardData, setCardData] = useState(null);
  const [salesData, setSalesData] = useState([]);
  const [tiposFiltro, setTiposFiltro] = useState([]);

  const formatCurrency = (value) => {
    if (typeof value !== 'number') value = parseFloat(value || 0);
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  const formatDate = (dateString) => {
     if (!dateString) return "-";
     return new Date(dateString).toLocaleDateString("pt-BR", { timeZone: 'UTC' });
  };

  const columns = [
    { header: "ID", accessor: "id" },
    { header: "Produto", accessor: "produto" },
    { header: "Tipo", accessor: "tipo" },
    { header: "Status", accessor: "status" },
    {
      header: "Valor Total",
      accessor: "valorTotal",
      render: (value) => formatCurrency(value),
    },
    { header: "Quantidade", accessor: "quantidade" },
    {
      header: "Data Venda",
      accessor: "dataVenda",
      render: (value) => formatDate(value),
    },
  ];

  useEffect(() => {
    api.get("/dashboard/cards")
      .then(response => {
        setCardData(response.data);
      })
      .catch(err => console.error("Erro ao buscar cards:", err));

    api.get(`/dashboard/vendas/status/${tipoVenda}`)
      .then(response => {
        setSalesData(response.data);
      })
      .catch(err => console.error("Erro ao buscar vendas:", err));
    
    api.get("/dashboard/tipos")
      .then(response => {
          const options = response.data.map(tipo => ({ value: tipo, label: tipo }));
          setTiposFiltro([
              { value: "Concluída", label: "Concluídas" },
              { value: "Pendente", label: "Pendentes" },
              { value: "Cancelada", label: "Canceladas" },
              ...options
          ]);
      })
      .catch(err => console.error("Erro ao buscar tipos:", err));

  }, []);

  useEffect(() => {
    if (!tipoVenda) return;

    let endpoint = "";
    if (["Concluída", "Pendente", "Cancelada"].includes(tipoVenda)) {
      endpoint = `/dashboard/vendas/status/${tipoVenda}`;
    } else {
      endpoint = `/dashboard/vendas/tipo/${tipoVenda}`;
    }

    api.get(endpoint)
      .then(response => {
        setSalesData(response.data);
      })
      .catch(err => console.error(`Erro ao buscar vendas por ${tipoVenda}:`, err));

  }, [tipoVenda]);

  const cards = cardData ? [
    { title: "Vendas Totais (Qtd)", value: cardData.quantidadeVendas },
    { title: "Vendas Concluídas", value: formatCurrency(cardData.totalVendasConcluidas) },
    { title: "Vendas Pendentes", value: cardData.vendasPendentes },
    { title: "Ticket Médio", value: formatCurrency(cardData.ticketMedio) },
  ] : [];

  return (
    <div className="h-screen font-sans">
      <main className="px-4 lg:px-12 md:px-10">
        {/* Cards */}
        <section className="grid grid-cols-1 gap-4 mb-6 lg:grid-cols-4 md:grid-cols-2">
          {cards.length > 0 ? (
            cards.map((c) => (
              <Card key={c.title} {...c} />
            ))
          ) : (
            <p>Carregando cards...</p>
          )}
        </section>

        <section className="overflow-x-auto mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-2 sm:gap-0">
            <h2 className="text-xl font-bold">Vendas Recentes</h2>
            <ComboBox
              type="custom"
              options={tiposFiltro}
              value={tipoVenda}
              setValue={setTipoVenda}
              placeholder="Filtrar por status ou tipo..."
            />
          </div>
        </section>

        <Table
          columns={columns}
          data={salesData}
          showActions={false}
        />
      </main>
    </div>
  );
}