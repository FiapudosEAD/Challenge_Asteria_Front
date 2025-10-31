import Input from "../components/input";
import Table from "../components/table";
import Modal from "../components/modal";
import ModalDelete from "../components/modal_delete";

import { useState } from "react";

import { IoIosAdd } from "react-icons/io";

export default function PDV() {
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  const columns = [
    { header: "ID", accessor: "id" },
    { header: "Nome", accessor: "nome" },
    { header: "Endereço", accessor: "endereco" },
    { header: "Data Criação", accessor: "dataCriacao" },
    { header: "Data Atualização", accessor: "dataAtualizacao" },
  ];

  const data = [
    {
      id: 1,
      nome: "Clabin",
      endereco: "Rua dos bobos, n 0",
      dataCriacao: "08/10/2025",
      dataAtualizacao: "09/10/2025",
    },
  ];

  const fields = [
    { type: "text", placeholder: "Nome:" },
    { type: "text", placeholder: "Endereço (com número):" },
  ];

  return (
    <div>
      <Modal
        title={"Adicionar Ponto de Venda"}
        fields={fields}
        isOpen={openModalAdd}
        onClose={() => setOpenModalAdd(false)}
      />
      <Modal
        title={"Editar Ponto de Venda"}
        fields={fields}
        isOpen={openModalEdit}
        onClose={() => setOpenModalEdit(false)}
      />
      <ModalDelete
        message={"Você deseja deletar esse ponto de venda?"}
        isOpen={openModalDelete}
        onClose={() => setOpenModalDelete(false)}
      />
      <div className="h-screen font-sans">
        {/* Main */}
        <main className="px-4 lg:px-12 md:px-10">
          <section className="overflow-x-auto mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-2 sm:gap-0">
              <h2 className="text-xl font-bold">Pontos de Venda</h2>
              <div className="flex gap-6">
                <button
                  type="button"
                  onClick={() => setOpenModalAdd(true)}
                  className="text-3xl"
                >
                  <IoIosAdd />
                </button>
                <Input type="text" placeholder="Endereço:" />
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
