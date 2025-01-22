import { useState, useEffect } from "react";
import TipologiaForm from "../../components/Tipologias/TipologiaForm";

const Tipologias = () => {
  const [tipologias, setTipologias] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedTipologia, setSelectedTipologia] = useState(null);

  useEffect(() => {
    fetch("https://localhost:7165/api/Tipologia")
      .then((response) => {
        if (!response.ok) throw new Error("Erro ao buscar as tipologias");
        return response.json();
      })
      .then((data) => setTipologias(data))
      .catch((error) => console.error(error.message));
  }, []);

  const handleSave = (data) => {
    const method = data.id ? "PUT" : "POST"; // Usa PUT para editar, POST para criar
    const url = data.id
      ? `https://localhost:7165/api/Tipologia/${data.id}` // Atualização com ID
      : "https://localhost:7165/api/Tipologia"; // Criação

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            console.error("Erro no servidor:", error);
            throw new Error("Erro ao salvar a tipologia");
          });
        }
        return response.json();
      })
      .then((savedTipologia) => {
        if (data.id) {
          // Atualiza o item na lista
          setTipologias((prev) =>
            prev.map((item) =>
              item.id === savedTipologia.id ? savedTipologia : item
            )
          );
        } else {
          // Adiciona novo item à lista
          setTipologias((prev) => [...prev, savedTipologia]);
        }

        // Fecha o modal e limpa o estado selecionado
        setShowModal(false);
        setSelectedTipologia(null);
      })
      .catch((error) => console.error(error.message));
  };

  const handleEdit = (tipologia) => {
    setSelectedTipologia(tipologia);
    setShowModal(true);
  };

  const handleCancel = () => {
    setShowModal(false);
    setSelectedTipologia(null);
  };

  return (
    <div className="tabela-escolas-container">
      <h1>Gerenciar Tipologias</h1>
      <button
        className="btn-detalhes"
        onClick={() => {
          setSelectedTipologia(null);
          setShowModal(true);
        }}
      >
        Nova Tipologia
      </button>
      <table className="tabela-escolas">
        <thead>
          <tr>
            <th>Classificação</th>
            <th>Data de Criação</th>
            <th>Valor do Aporte</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {tipologias.map((tipologia) => (
            <tr key={tipologia.id}>
              <td>{tipologia.classificacao}</td>
              <td>{new Date(tipologia.dataCriacao).toLocaleDateString()}</td>
              <td>{tipologia.valorAporte}</td>
              <td>
                <button
                  className="btn-editar"
                  onClick={() => handleEdit(tipologia)}
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              width: "400px",
              maxWidth: "90%",
            }}
          >
            <h2>{selectedTipologia ? "Editar Tipologia" : "Nova Tipologia"}</h2>
            <TipologiaForm
              tipologia={selectedTipologia}
              onSave={handleSave}
              onCancel={handleCancel}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Tipologias;
