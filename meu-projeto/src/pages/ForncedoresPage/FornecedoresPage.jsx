import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const FornecedoresForm = ({ fornecedor, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    CNPJ: "",
    Nome: "",
    Contato: "",
    Localizacao: "",
    Telefone: "",
  });

  useEffect(() => {
    if (fornecedor) {
      console.log("Carregando fornecedor:", fornecedor); // Log para depuração
      setFormData({
        CNPJ: fornecedor.CNPJ || "",
        Nome: fornecedor.Nome || "",
        Contato: fornecedor.Contato || "",
        Localizacao: fornecedor.Localizacao || "",
        Telefone: fornecedor.Telefone || "",
      });
    } else {
      setFormData({
        CNPJ: "",
        Nome: "",
        Contato: "",
        Localizacao: "",
        Telefone: "",
      });
    }
  }, [fornecedor]); // Executa sempre que `fornecedor` mudar

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

    onSave(formData); // Envia os dados para o método de salvamento
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-group">
        <label>
          CNPJ:
          <input
            type="text"
            name="CNPJ"
            className="input-field"
            value={formData.cnpj}
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
            className="input-field"
            value={formData.nome}
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
            className="input-field"
            value={formData.contato}
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
            className="input-field"
            value={formData.localizacao}
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
            className="input-field"
            value={formData.telefone}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          Salvar
        </button>
        <button type="button" onClick={onCancel} className="btn btn-secondary">
          Cancelar
        </button>
      </div>
    </form>
  );
};

FornecedoresForm.propTypes = {
  fornecedor: PropTypes.shape({
    CNPJ: PropTypes.string,
    Nome: PropTypes.string,
    Contato: PropTypes.string,
    Localizacao: PropTypes.string,
    Telefone: PropTypes.string,
  }),
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

FornecedoresForm.defaultProps = {
  fornecedor: null,
};

export default FornecedoresForm;
