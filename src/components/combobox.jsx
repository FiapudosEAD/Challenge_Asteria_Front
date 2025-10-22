import { useEffect, useState } from "react";

// options: [{ value: '123', label: 'Produto XPTO' }, ...]
export default function ComboBox({
  type = "tipo-venda",
  value,
  setValue,
  options = [],
  placeholder = "Selecione uma opção...",
  loading = false // prop opcional para debugar estado de loading
}) {
  // opções fixas para tipo de venda
  const tipoVendaOptions = [
    { value: "sell-in", label: "Sell-in" },
    { value: "sell-out", label: "Sell-out" }
  ];

  // Determina as opções conforme o tipo
  const getOptions = () => {
    if (type === "tipo-venda") return tipoVendaOptions;
    // Produtos ou pontos de venda vêm do backend (via props.options)
    return options;
  };

  const optionList = getOptions();

  return (
    <div className="p-2 border-2 border-gray-500 rounded-md flex items-center">
      <select
        value={value}
        onChange={e => setValue(e.target.value)}
        className="w-full rounded outline-none bg-transparent"
      >
        <option value="" disabled>
          {loading ? "Carregando opções..." : placeholder}
        </option>
        {optionList && optionList.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
