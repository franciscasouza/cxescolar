import { useLocation } from "react-router-dom";

const Header = ({ isOpen }) => {
  const location = useLocation();

  // Mapeamento de títulos dinâmicos
  const pageTitles = {
    "/": "Dashboard",
    "/escolas": "Escolas",
    "/tipologias": "Tipologias",
    "/relatorios": "Relatórios",
    "/configuracoes": "Configurações",
  };

  const title = pageTitles[location.pathname] || "Dashboard";

  return (
    <header
      className={`fixed top-0 h-16 bg-zinc-50  text-black
      flex items-center px-6 shadow-sm transition-all duration-300
      ${isOpen ? "w-[calc(100%-224px)] ml-56" : "w-[calc(100%-64px)] ml-16"}`}
    >
      <h1 className="text-xl font-medium">{title}</h1>
    </header>
  );
};

export default Header;
