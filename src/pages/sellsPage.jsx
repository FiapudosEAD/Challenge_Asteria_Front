import Input from "../components/input";
import Table from "../components/table";
import Modal from "../components/modal";
import ModalDelete from "../components/modal_delete";
import ComboBox from "../components/ComboBox";
import api from "../services/api";
import { useForm } from "../hooks/useForm";
import { formatCurrency, formatDate } from "../utils/formatters";

import { useState, useEffect } from "react";
import { IoIosAdd } from "react-icons/io";

const formInitialState = {
  produto: "",
  quantidade: "",
  valor: "",
  tipo: "",
  status: "Concluída",
  observacoes: "",
};

export default function Sells() {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);


  const [produtosOptions, setProdutosOptions] = useState([]);
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  
  const [selectedItem, setSelectedItem] = useState(null);

  const { formData, setFormData, setValue, resetForm } = useForm(formInitialState);

  const fetchData = async () => {
    setLoading(true);
    try {
      const colResponse = await api.get("/vendas/colunas");
      const filteredCols = colResponse.data.map(col => ({
        header: col.label,
        accessor: col.campo,
        render: (value) => {
          if (col.tipo === 'currency') return formatCurrency(value);
          if (col.tipo === 'datetime') return formatDate(value);
          return value;
        }
      }));
      setColumns(filteredCols);

      const dataResponse = await api.get("/vendas");
      setData(dataResponse.data);
    } catch (error) {
      console.error("Erro ao buscar vendas:", error);
      alert("Falha ao carregar dados. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };
  
  const fetchModalOptions = async () => {
     try {
        const [produtosRes] = await Promise.all([
           api.get("/produtos?ativo=true"),
        ]);
        
        setProdutosOptions(
            produtosRes.data.map(p => ({ label: `${p.nome} (${formatCurrency(p.preco)})`, value: p.nome }))
        );
        
     } catch (error) {
         console.error("Erro ao carregar opções do modal:", error);
     }
  };

  useEffect(() => {
    fetchData();
    fetchModalOptions();
  }, []);

  const handleOpenAdd = () => {
    resetForm();
    setOpenModalAdd(true);
  };

  const handleOpenEdit = (item) => {
    setSelectedItem(item);
    setFormData(item);
    setOpenModalEdit(true);
  };

  const handleOpenDelete = (item) => {
    setSelectedItem(item);
    setOpenModalDelete(true);
  };
  
  const handleCloseModals = () => {
    setOpenModalAdd(false);
    setOpenModalEdit(false);
    setOpenModalDelete(false);
    setSelectedItem(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSubmit = {
      ...formData,
      valor: parseFloat(formData.valor || 0), 
      quantidade: parseInt(formData.quantidade || 0, 10),
    };
    
    try {
      if (openModalAdd) {
        await api.post("/dashboard/vendas", dataToSubmit);
        alert("Venda criada com sucesso!");
      } else if (openModalEdit && selectedItem) {
        await api.put(`/vendas/${selectedItem.id}`, dataToSubmit);
        alert("Venda atualizada com sucesso!");
      }
      
      handleCloseModals();
      fetchData();
    } catch (error) {
      console.error("Erro ao salvar venda:", error);
      alert(`Erro ao salvar: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleDelete = async () => {
    if (!selectedItem) return;
    try {
      await api.delete(`/vendas/${selectedItem.id}`);
      alert("Venda deletada com sucesso!");
      handleCloseModals();
      fetchData();
    } catch (error) {
      console.error("Erro ao deletar venda:", error);
      alert("Erro ao deletar venda.");
    }
  };

  return (
    <div>
      <Modal
        title={openModalAdd ? "Adicionar Venda" : "Editar Venda"}
        isOpen={openModalAdd || openModalEdit}
        onClose={handleCloseModals}
        onSubmit={handleSubmit}
      >
        <ComboBox
          placeholder="Selecione o Produto"
          options={produtosOptions}
          value={formData.produto}
          setValue={setValue("produto")}
          loading={produtosOptions.length === 0}
        />
        <Input
          type="number"
          placeholder="Quantidade"
          value={formData.quantidade || ''}
          setValue={setValue("quantidade")}
        />
        <Input
          type="number"
          placeholder="Valor Unitário (ex: 12.99)"
          value={formData.valor || ''}
          setValue={setValue("valor")}
        />
        <Input
          type="text"
          placeholder="Tipo (ex: Eletrônicos)"
          value={formData.tipo || ''}
          setValue={setValue("tipo")}
        />
        <ComboBox
          type="status-venda"
          placeholder="Status da Venda"
          value={formData.status}
          setValue={setValue("status")}
        />
        <Input
          type="text"
          placeholder="Observações (opcional)"
          value={formData.observacoes || ''}
          setValue={setValue("observacoes")}
        />
      </Modal>

      <ModalDelete
        message={"Você deseja deletar essa venda?"}
        isOpen={openModalDelete}
        onClose={handleCloseModals}
        onConfirm={handleDelete}
      />
      
      <div className="font-sans">
        <main className="px-4 lg:px-12 md:px-10">
          <section className="overflow-x-auto mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-2 sm:gap-0">
              <h2 className="text-xl font-bold">Gerenciamento de Vendas</h2>
              <div className="flex gap-6">
                <button
                  type="button"
                  onClick={handleOpenAdd}
                  className="text-3xl"
                >
                  <IoIosAdd />
                </button>
               <Input type="number" placeholder="Id da venda:" />
              </div>
            </div>
          </section>

          {loading ? (
            <p>Carregando vendas...</p>
          ) : (
            <Table
              columns={columns}
              data={data}
              onEdit={handleOpenEdit}
              onDelete={handleOpenDelete}
            />
          )}
        </main>
      </div>
    </div>
  );
}