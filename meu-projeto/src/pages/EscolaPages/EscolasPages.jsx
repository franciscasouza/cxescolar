import { useState, useEffect } from "react";
import ModalEscola from "../../Models/EscolasModal/ModalEscola";
import TabelaEscolas from "../../components/Escola/TabelaEscolas";
import "./EscolaPages.css";

function EscolasPages() {
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
    fetchEscolas();
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
    setCurrentPage(1); // Reinicia a paginação ao aplicar filtros
  }, [filtro, busca, escolas]);

  const fetchEscolas = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("https://localhost:7165/api/Escolas");
      const data = await response.json();

      const uniqueEscolas = Array.from(
        new Set(data.map((escola) => escola.id))
      ).map((id) => data.find((escola) => escola.id === id));

      setEscolas(uniqueEscolas);
      setFilteredEscolas(uniqueEscolas); // Inicializa a lista filtrada
    } catch (error) {
      console.error("Erro ao carregar as escolas:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Deseja realmente excluir esta escola?")) {
      try {
        await fetch(`https://localhost:7165/api/Escolas/${id}`, {
          method: "DELETE",
        });
        fetchEscolas();
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
    fetchEscolas();
  };

  const clearFilters = () => {
    setFiltro("");
    setBusca("");
    setFilteredEscolas(escolas); // Usa os dados já carregados no estado original
    setCurrentPage(1); // Reinicia a paginação
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

export default EscolasPages;
