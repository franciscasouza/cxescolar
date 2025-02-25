import { useState } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import Sidebar from "@components/Sidebar/Sidebar";
import Header from "@components/Header/Header";
import Footer from "@components/Footer/Footer";

// Páginas dentro do Dashboard
import Home from "@/pages/Home";
import Escolas from "@/pages/Escolas";
import DetalhesEscola from "../components/Escola/DetalhesEscola"; // 🔥 Importando o componente
import Tipologias from "@/components/Tipologias/Tipologias";
import Fornecedores from "@/components/Fornecedores/Fornecedores";
import Reports from "@/pages/Reports";
import Settings from "@/pages/Settings";

const DashboardLayout = ({ isOpen, toggleSidebar }) => {
  return (
    <div className="flex flex-col h-screen">
      {/* Header fixo no topo */}
      <Header isOpen={isOpen} />

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

        {/* Conteúdo Principal */}
        <main
          className={`flex-1 p-6 transition-all duration-300 overflow-auto ${
            isOpen ? "ml-56" : "ml-16"
          } pt-16`}
        >
          <Outlet /> {/* 🔥 Aqui carregamos as páginas dentro do Dashboard */}
        </main>
      </div>

      {/* Footer fixo no final */}
      <Footer />
    </div>
  );
};

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(true);
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <Routes>
      <Route
        element={
          <DashboardLayout isOpen={isOpen} toggleSidebar={toggleSidebar} />
        }
      >
        <Route index element={<Home />} />
        <Route path="escolas" element={<Escolas />} />
        <Route path="escolas/:id" element={<DetalhesEscola />} />{" "}
        {/* 🔥 Caminho corrigido */}
        <Route path="tipologias" element={<Tipologias />} />
        <Route path="fornecedores" element={<Fornecedores />} />
        <Route path="relatorios" element={<Reports />} />
        <Route path="configuracoes" element={<Settings />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

export default Dashboard;
