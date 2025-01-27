import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./Forms.css";

const FornecedorForm = ({ fornecedor, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    CNPJ: "",
    Nome: "",
    Contato: "",
    Localizacao: "",
    Telefone: "",
  });

  useEffect(() => {
    if (fornecedor) {
      setFormData({
        id: fornecedor.id || null, // Garante que o ID é incluído
        CNPJ: fornecedor.CNPJ || "",
        Nome: fornecedor.Nome || "",
        Contato: fornecedor.Contato || "",
        Localizacao: fornecedor.Localizacao || "",
        Telefone: fornecedor.Telefone || "",
      });
    } else {
      setFormData({
        id: null, // Reseta o ID para novo registro
        CNPJ: "",
        Nome: "",
        Contato: "",
        Localizacao: "",
        Telefone: "",
      });
    }
  }, [fornecedor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validação básica
    if (!formData.CNPJ || !formData.Nome) {
      alert("Preencha os campos obrigatórios!");
      return;
    }

    // Chama o método onSave passando os dados formatados
    onSave({
      ...formData,
    });

    // Fecha o modal
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-container">
        <div className="form-group">
          <label>
            CNPJ:
            <input
              type="text"
              name="CNPJ"
              value={formData.CNPJ}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label>
            Nome:
            <input
              type="text"
              name="Nome"
              value={formData.Nome}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Contato:
            <input
              type="text"
              name="Contato"
              value={formData.Contato}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Localização:
            <input
              type="text"
              name="Localizacao"
              value={formData.Localizacao}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="form-group">
          <label>
            Telefone:
            <input
              type="text"
              name="Telefone"
              value={formData.Telefone}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Salvar
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-secondary"
          >
            Cancelar
          </button>
        </div>
      </div>
    </form>
  );
};

FornecedorForm.propTypes = {
  fornecedor: PropTypes.shape({
    id: PropTypes.number,
    CNPJ: PropTypes.string,
    Nome: PropTypes.string,
    Contato: PropTypes.string,
    Localizacao: PropTypes.string,
    Telefone: PropTypes.string,
  }),
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

FornecedorForm.defaultProps = {
  fornecedor: null,
};

export default FornecedorForm;
