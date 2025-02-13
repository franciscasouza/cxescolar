import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./Forms.css";

const FornecedorForm = ({ fornecedor, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    cnpj: "",
    nome: "",
    contato: "",
    localizacao: "",
    telefone: "",
  });

  useEffect(() => {
    if (fornecedor) {
      setFormData({
        cnpj: fornecedor.cnpj || "",
        nome: fornecedor.nome || "",
        contato: fornecedor.contato || "",
        localizacao: fornecedor.localizacao || "",
        telefone: fornecedor.telefone || "",
      });
    } else {
      setFormData({
        cnpj: "",
        nome: "",
        contato: "",
        localizacao: "",
        telefone: "",
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
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          CNPJ:
          <input
            type="text"
            name="cnpj"
            value={formData.cnpj}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Nome:
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Contato:
          <input
            type="text"
            name="contato"
            value={formData.contato}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Localização:
          <input
            type="text"
            name="localizacao"
            value={formData.localizacao}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>
        <label>
          Telefone:
          <input
            type="text"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="form-actions">
        <button className="btn btn-primary" type="submit">
          Salvar
        </button>
        <button className="btn btn-secondary" type="button" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
};

FornecedorForm.propTypes = {
  fornecedor: PropTypes.shape({
    cnpj: PropTypes.string,
    nome: PropTypes.string,
    contato: PropTypes.string,
    localizacao: PropTypes.string,
    telefone: PropTypes.string,
  }),
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default FornecedorForm;
