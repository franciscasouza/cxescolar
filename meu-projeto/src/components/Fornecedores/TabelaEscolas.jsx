import { useState, useEffect } from "react";
import "../Escola/TabelaEscolas.css"; // Reaproveitando estilos existentes
import NotificationSnackbar from "../Notifications/NotificationSnackbar"; // Importando o componente de notificação
import AnimatedButton from "../Animations/AnimatedButton";

const TabelaFornecedores = () => {
  const [fornecedores, setFornecedores] = useState([]);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    type: "",
  });

  useEffect(() => {
    // Simulação de carregamento de dados da API
    const fetchFornecedores = async () => {
      try {
        const response = await fetch("/api/fornecedores"); // Atualizar URL conforme necessário
        const data = await response.json();
        setFornecedores(data);
      } catch {
        setNotification({
          open: true,
          message: "Erro ao carregar fornecedores.",
          type: "error",
        });
      }
    };

    fetchFornecedores();
  }, []);

  const handleEdit = (id) => {
    // Lógica para edição
    setNotification({
      open: true,
      message: `Fornecedor ${id} editado com sucesso.`,
      type: "success",
    });
  };

  const handleDelete = (id) => {
    // Lógica para exclusão
    setFornecedores(fornecedores.filter((fornecedor) => fornecedor.id !== id));
    setNotification({
      open: true,
      message: `Fornecedor ${id} excluído com sucesso.`,
      type: "success",
    });
  };

  return (
    <div className="tabela-container">
      <h2>Lista de Fornecedores</h2>
      <table className="tabela-escolas">
        <thead>
          <tr>
            <th>Nome do Fornecedor</th>
            <th>Categoria</th>
            <th>Localização</th>
            <th>Contato</th>
            <th>Telefone</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {fornecedores.map((fornecedor) => (
            <tr key={fornecedor.id}>
              <td>{fornecedor.nome}</td>
              <td>{fornecedor.categoria}</td>
              <td>{fornecedor.localizacao}</td>
              <td>{fornecedor.contato}</td>
              <td>{fornecedor.telefone}</td>
              <td>
                <AnimatedButton onClick={() => handleEdit(fornecedor.id)}>
                  Editar
                </AnimatedButton>
                <AnimatedButton
                  onClick={() => handleDelete(fornecedor.id)}
                  danger
                >
                  Excluir
                </AnimatedButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <NotificationSnackbar
        open={notification.open}
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification({ ...notification, open: false })}
      />
    </div>
  );
};

export default TabelaFornecedores;
