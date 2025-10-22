import Input from "../components/Input";
import Table from "../components/table";
import Modal from "../components/modal";
import ModalDelete from "../components/modal_delete";

import { useState } from "react";

import { IoIosAdd } from "react-icons/io";

export default function Sells() {
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  const columns = [
    { header: "ID", accessor: "id" },
    { header: "ID PDV", accessor: "idPdv" },
    { header: "ID Produto", accessor: "idProduto" },
    { header: "Tipo", accessor: "tipo" },
    {
      header: "Valor",
      accessor: "valor",
      render: (value) => `R$ ${value.toFixed(2).replace(".", ",")}`,
    },
    { header: "Quantidade", accessor: "quantidade" },
    {
      header: "Data Venda",
      accessor: "dataVenda",
      render: (value) => new Date(value).toLocaleDateString("pt-BR"),
    },
  ];

  const data = [
    {
      id: 1,
      idPdv: 2,
      idProduto: 3,
      tipo: "Sell-in",
      valor: 123.0,
      quantidade: 456,
      dataVenda: "2025-10-08",
    },
    {
      id: 2,
      idPdv: 2,
      idProduto: 3,
      tipo: "Sell-in",
      valor: 234.0,
      quantidade: 567,
      dataVenda: "2025-10-09",
    },
  ];

  const produtosOptions = [
    { value: "makita", label: "Makita" },
    { value: "playstation", label: "PlayStation" },
  ];

  const pdvOptions = [
    { value: "clabin", label: "Clabin" },
    { value: "paulista", label: "Paulista" },
  ];

  const fields = [
    { type: "text", placeholder: "Nome:" },
    { type: "select", comboType: "filiais", options: pdvOptions },
    { type: "select", comboType: "produtos", options: produtosOptions },
    { type: "select", comboType: "tipo-venda" },
    { type: "number", placeholder: "Valor:" },
    { type: "number", placeholder: "Quantidade:" },
  ];

  return (
    <div>
      <Modal
        title={"Adicionar Venda"}
        fields={fields}
        isOpen={openModalAdd}
        onClose={() => setOpenModalAdd(false)}
      />
      <Modal
        title={"Editar Venda"}
        fields={fields}
        isOpen={openModalEdit}
        onClose={() => setOpenModalEdit(false)}
      />
      <ModalDelete
        message={"Você deseja deletar essa venda?"}
        isOpen={openModalDelete}
        onClose={() => setOpenModalDelete(false)}
      />
      <div className="h-screen font-sans">
        {/* Main */}
        <main className="px-4 lg:px-12 md:px-10">
          <section className="overflow-x-auto mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-2 sm:gap-0">
              <h2 className="text-xl font-bold">Vendas</h2>
              <div className="flex gap-6">
                <button
                  type="button"
                  onClick={() => setOpenModalAdd(true)}
                  className="text-3xl"
                >
                  <IoIosAdd />
                </button>
                <Input type="number" placeholder="Id da venda:" />
              </div>
            </div>
          </section>

          <Table
            columns={columns}
            data={data}
            onEdit={() => setOpenModalEdit(true)}
            onDelete={() => setOpenModalDelete(true)}
          />
        </main>
      </div>
    </div>
  );
}
