import { useState, useEffect } from "react";
import ModalEscola from "../components/Escola/ModalEscola";
import TabelaEscolas from "../components/Escola/TabelaEscolas";
import { fetchEscolas, deleteEscola } from "@/services/apiEscolas"; // Importando o serviço

function Escolas() {
  const [escolas, setEscolas] = useState([]);
  const [filteredEscolas, setFilteredEscolas] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEscola, setSelectedEscola] = useState(null);
  const [filtro, setFiltro] = useState("");
  const [busca, setBusca] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    carregarEscolas();
  }, []);

  useEffect(() => {
    let filteredData = [...escolas];

    if (filtro) {
      filteredData = filteredData.filter((escola) =>
        escola.regiao.toLowerCase().includes(filtro.toLowerCase())
      );
    }

    if (busca) {
      filteredData = filteredData.filter((escola) =>
        escola.nome.toLowerCase().includes(busca.toLowerCase())
      );
    }

    setFilteredEscolas(filteredData);
    setCurrentPage(1);
  }, [filtro, busca, escolas]);

  // 🔥 Função para buscar escolas usando o serviço
  const carregarEscolas = async () => {
    try {
      setIsLoading(true);
      const data = await fetchEscolas();
      setEscolas(data);
      setFilteredEscolas(data); // Inicializa a lista filtrada
    } catch (error) {
      console.error("Erro ao carregar escolas:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 🔥 Função para deletar escola
  const handleDelete = async (id) => {
    if (window.confirm("Deseja realmente excluir esta escola?")) {
      try {
        await deleteEscola(id);
        carregarEscolas(); // Atualiza a lista após deletar
      } catch (error) {
        console.error("Erro ao excluir escola:", error);
      }
    }
  };

  const openModal = (escola) => {
    setSelectedEscola(escola);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedEscola(null);
    setIsModalOpen(false);
    carregarEscolas();
  };

  const clearFilters = () => {
    setFiltro("");
    setBusca("");
    setFilteredEscolas(escolas);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredEscolas.length / itemsPerPage);
  const paginatedEscolas = filteredEscolas.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="escolas-container">
      <h1>Gerenciamento de Escolas</h1>

      {/* Filtros e Busca */}
      <div className="filtros">
        <input
          type="text"
          placeholder="Filtrar por região"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
        />
        <input
          type="text"
          placeholder="Buscar por nome"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
        <button onClick={clearFilters}>Limpar Filtros</button>
        <button onClick={() => openModal(null)}>Adicionar Nova Escola</button>
      </div>

      {/* Tabela e Feedback de Carregamento */}
      {isLoading ? (
        <p>Carregando escolas...</p>
      ) : (
        <>
          <TabelaEscolas
            escolas={paginatedEscolas}
            onDelete={handleDelete}
            onEdit={openModal}
          />

          {/* Paginação */}
          <div className="pagination">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Anterior
            </button>
            <span>
              Página {currentPage} de {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Próxima
            </button>
          </div>
        </>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div>
          <div>
            <div className="modal-body">
              <ModalEscola escola={selectedEscola} onClose={closeModal} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Escolas;
