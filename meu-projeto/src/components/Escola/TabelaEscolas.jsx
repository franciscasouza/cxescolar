import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function TabelaEscolas({ escolas, onEdit }) {
  const navigate = useNavigate();
  const [sortConfig, setSortConfig] = useState(null);

  const sortedEscolas = [...escolas].sort((a, b) => {
    if (sortConfig !== null) {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
    }
    return 0;
  });

  const handleSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const handleDetails = (id) => {
    navigate(`/escolas/${id}`);
  };

  return (
    <div className="w-screen max-w-sceen overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300 shadow-lg rounded-lg">
        <thead>
          <tr className="bg-blue-900 text-white">
            <th
              onClick={() => handleSort("nome")}
              className="p-3 text-left cursor-pointer"
            >
              Nome{" "}
              {sortConfig?.key === "nome" &&
                (sortConfig.direction === "ascending" ? "↑" : "↓")}
            </th>
            <th
              onClick={() => handleSort("regiao")}
              className="p-3 text-left cursor-pointer"
            >
              Região{" "}
              {sortConfig?.key === "regiao" &&
                (sortConfig.direction === "ascending" ? "↑" : "↓")}
            </th>
            <th
              onClick={() => handleSort("classificacao")}
              className="p-3 text-left cursor-pointer"
            >
              Classificação{" "}
              {sortConfig?.key === "classificacao" &&
                (sortConfig.direction === "ascending" ? "↑" : "↓")}
            </th>
            <th className="p-3 text-left">Ações</th>
          </tr>
        </thead>
        <tbody>
          {sortedEscolas.length === 0 ? (
            <tr>
              <td colSpan="4" className="p-4 text-center text-gray-500">
                Nenhuma escola encontrada.
              </td>
            </tr>
          ) : (
            sortedEscolas.map((escola) => (
              <tr key={escola.id} className="border-b border-gray-300">
                <td className="p-3">{escola.nome}</td>
                <td className="p-3">{escola.regiao}</td>
                <td className="p-3">{escola.classificacao}</td>
                <td className="p-3 flex space-x-2">
                  <button
                    className="px-4 py-2 text-blue-700 border border-blue-700 rounded-md hover:bg-blue-700 hover:text-white transition"
                    onClick={() => handleDetails(escola.id)}
                  >
                    Detalhes
                  </button>
                  <button
                    className="px-4 py-2 text-yellow-700 border border-yellow-700 rounded-md hover:bg-yellow-700 hover:text-white transition"
                    onClick={() => onEdit(escola)}
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

TabelaEscolas.propTypes = {
  escolas: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default TabelaEscolas;
