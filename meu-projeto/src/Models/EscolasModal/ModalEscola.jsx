import { useState } from "react";
import PropTypes from "prop-types";
import "./ModalEscola.css";

function ModalEscola({ escola, onClose }) {
  const [nome, setNome] = useState(escola ? escola.nome : "");
  const [regiao, setRegiao] = useState(escola ? escola.regiao : "");
  const [classificacao, setClassificacao] = useState(
    escola ? escola.classificacao : ""
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = escola
      ? `https://localhost:7165/api/Escolas/${escola.id}`
      : "https://localhost:7165/api/Escolas";
    const method = escola ? "PUT" : "POST";
    try {
      await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, regiao, classificacao }),
      });
      onClose();
    } catch (error) {
      console.error("Erro ao salvar escola:", error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>{escola ? "Editar Escola" : "Adicionar Escola"}</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nome</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Região</label>
            <input
              type="text"
              value={regiao}
              onChange={(e) => setRegiao(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Classificação</label>
            <input
              type="text"
              value={classificacao}
              onChange={(e) => setClassificacao(e.target.value)}
              required
            />
          </div>
          <div className="form-actions">
            <button className="btn btn-primary" type="submit">
              Salvar
            </button>
            <button
              className="btn btn-secondary"
              type="button"
              onClick={onClose}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
ModalEscola.propTypes = {
  escola: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalEscola;
