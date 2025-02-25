import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "@/services/api"; // 🔥 Importando a instância do Axios

function DetalhesEscola() {
  const { id } = useParams();
  const [escola, setEscola] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEscola();
  }, []);

  const fetchEscola = async () => {
    try {
      const response = await api.get(`/Escolas/${id}`); // 🔥 Usando `api.js`
      setEscola(response.data);
    } catch (error) {
      console.error("Erro ao carregar detalhes da escola:", error);
      setError("Erro ao carregar os detalhes. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <p className="text-center text-gray-600">
        Carregando detalhes da escola...
      </p>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-blue-900">{escola.nome}</h1>
      <p className="text-gray-700 mt-2">
        <strong>Região:</strong> {escola.regiao}
      </p>
      <hr className="my-4 border-gray-300" />
      <p className="text-gray-700">
        <strong>Classificação:</strong> {escola.classificacao}
      </p>
      <p className="text-gray-500">
        <strong>ID:</strong> {escola.id}
      </p>
      <p className="text-gray-600 mt-4">
        Outras informações relevantes podem ser exibidas aqui...
      </p>
    </div>
  );
}

export default DetalhesEscola;
