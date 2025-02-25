import api from "@/services/api"; // Importa a instância do Axios configurada

// Função para buscar todas as escolas
export const fetchEscolas = async () => {
  try {
    const response = await api.get("Escolas");
    return response.data;
  } catch (error) {
    console.error("Erro ao carregar escolas:", error);
    throw error;
  }
};

// Função para excluir uma escola por ID
export const deleteEscola = async (id) => {
  try {
    await api.delete(`Escolas/${id}`);
  } catch (error) {
    console.error("Erro ao excluir escola:", error);
    throw error;
  }
};

// Função para adicionar ou editar uma escola
export const saveEscola = async (escola) => {
  try {
    if (escola.id) {
      // Atualiza a escola existente
      await api.put(`Escolas/${escola.id}`, escola);
    } else {
      // Cria uma nova escola
      await api.post("Escolas", escola);
    }
  } catch (error) {
    console.error("Erro ao salvar escola:", error);
    throw error;
  }
};
