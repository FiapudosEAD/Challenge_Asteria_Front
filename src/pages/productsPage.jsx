

import Input from "../components/Input";
import Table from "../components/table";
import Modal from "../components/modal";
import ModalDelete from "../components/modal_delete";
import api from "../services/api";

import { useState, useEffect } from "react";
import { IoIosAdd } from "react-icons/io";


const useForm = (initialState) => {
  const [formData, setFormData] = useState(initialState);
  const setValue = (name) => (value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  return { formData, setFormData, setValue };
};

export default function Products() {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  
  const [selectedItem, setSelectedItem] = useState(null);

  const formState = useForm({
    codigo: "",
    nome: "",
    descricao: "",
    categoria: "",
    preco: 0,
    estoque: 0,
    fabricante: "",
    unidadeMedida: "",
    ativo: true,
  });


  const fetchData = async () => {
    setLoading(true);
    try {
      const colResponse = await api.get("/produtos/colunas");
  
      const filteredCols = colResponse.data
        .filter(col => !['descricao', 'unidadeMedida', 'dataAtualizacao', 'fabricante'].includes(col.campo))
        .map(col => ({
          header: col.label,
          accessor: col.campo,
        
          render: (value) => {
            if (col.tipo === 'currency') return `R$ ${Number(value).toFixed(2).replace('.', ',')}`;
            if (col.tipo === 'datetime') return new Date(value).toLocaleDateString('pt-BR', { timeZone: 'UTC' });
            if (col.tipo === 'boolean') return value ? 'Ativo' : 'Inativo';
            return value;
          }
        }));
      setColumns(filteredCols);

    
      const dataResponse = await api.get("/produtos");
      setData(dataResponse.data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      alert("Falha ao carregar dados. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenAdd = () => {
    formState.setFormData({ });
    setOpenModalAdd(true);
  };

  const handleOpenEdit = (item) => {
    setSelectedItem(item);
    formState.setFormData(item);
    setOpenModalEdit(true);
  };

  const handleOpenDelete = (item) => {
    setSelectedItem(item);
    setOpenModalDelete(true);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSubmit = {
      ...formState.formData,
      preco: parseFloat(formState.formData.preco), 
      estoque: parseInt(formState.formData.estoque, 10)
    };
    
    try {
      if (openModalAdd) {
        await api.post("/produtos", dataToSubmit);
        alert("Produto criado com sucesso!");
      } else if (openModalEdit && selectedItem) {
        await api.put(`/produtos/${selectedItem.id}`, dataToSubmit);
        alert("Produto atualizado com sucesso!");
      }
      
      setOpenModalAdd(false);
      setOpenModalEdit(false);
      setSelectedItem(null);
      fetchData();
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
      alert(`Erro ao salvar: ${error.response?.data?.message || error.message}`);
    }
  };

  const handleDelete = async () => {
    if (!selectedItem) return;
    try {
      await api.delete(`/produtos/${selectedItem.id}`);
      alert("Produto deletado com sucesso!");
      setOpenModalDelete(false);
      setSelectedItem(null);
      fetchData();
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
      alert("Erro ao deletar produto.");
    }
  };

  const fields = [
    { name: "codigo", type: "text", placeholder: "Código (SKU)" },
    { name: "nome", type: "text", placeholder: "Nome do Produto" },
    { name: "categoria", type: "text", placeholder: "Categoria" },
    { name: "preco", type: "number", placeholder: "Preço (ex: 12.99)" },
    { name: "estoque", type: "number", placeholder: "Estoque" },
    { name: "fabricante", type: "text", placeholder: "Fabricante" },
    { name: "descricao", type: "text", placeholder: "Descrição" },
    { name: "unidadeMedida", type: "text", placeholder: "Unidade (ex: un, kg)" },
  ];

  return (
    <div>
      <Modal
        title={"Adicionar Produto"}
        isOpen={openModalAdd}
        onClose={() => setOpenModalAdd(false)}
        onSubmit={handleSubmit}
      >
        {fields.map((field) => (
          <Input
            key={field.name}
            type={field.type}
            placeholder={field.placeholder}
            value={formState.formData[field.name] || ''}
            setValue={formState.setValue(field.name)}
          />
        ))}
      </Modal>

      <Modal
        title={"Editar Produto"}
        isOpen={openModalEdit}
        onClose={() => setOpenModalEdit(false)}
        onSubmit={handleSubmit}
      >
        {fields.map((field) => (
          <Input
            key={field.name}
            type={field.type}
            placeholder={field.placeholder}
            value={formState.formData[field.name] || ''}
            setValue={formState.setValue(field.name)}
          />
        ))}
      </Modal>

      <ModalDelete
        message={"Você deseja deletar esse produto?"}
        isOpen={openModalDelete}
        onClose={() => setOpenModalDelete(false)}
        onConfirm={handleDelete}
      />
      
      <div className="h-screen font-sans">
        <main className="px-4 lg:px-12 md:px-10">
          <section className="overflow-x-auto mb-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-2 sm:gap-0">
              <h2 className="text-xl font-bold">Produtos</h2>
              <div className="flex gap-6">
                <button
                  type="button"
                  onClick={handleOpenAdd}
                  className="text-3xl"
                >
                  <IoIosAdd />
                </button>
                <Input type="text" placeholder="Filtrar por nome:" /> 
              </div>
            </div>
          </section>

          {loading ? (
            <p>Carregando dados...</p>
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