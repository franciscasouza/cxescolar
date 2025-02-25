import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "@/store/slices/authSlice";
import {
  HomeIcon,
  Cog6ToothIcon,
  ChartBarIcon,
  AcademicCapIcon,
  Squares2X2Icon,
  Bars3Icon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";

const sidebarItems = [
  { text: "Home", icon: <HomeIcon className="w-6 h-6" />, path: "/" },
  {
    text: "Escolas",
    icon: <AcademicCapIcon className="w-6 h-6" />,
    path: "escolas",
  },
  {
    text: "Tipologias",
    icon: <Squares2X2Icon className="w-6 h-6" />,
    path: "tipologias",
  },
  {
    text: "Relatórios",
    icon: <ChartBarIcon className="w-6 h-6" />,
    path: "relatorios",
  },
  {
    text: "Configurações",
    icon: <Cog6ToothIcon className="w-6 h-6" />,
    path: "configuracoes",
  },
];

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = "/login";
  };

  return (
    <aside
      className={`h-screen bg-blue-900 text-white fixed top-0 left-0 transition-all duration-300 z-50 shadow-lg flex flex-col
      ${isOpen ? "w-56" : "w-16"}`}
    >
      {/* Header do Sidebar */}
      <div
        className={`flex items-center mb-6 p-4 ${isOpen ? "justify-between" : "justify-center"}`}
      >
        {isOpen && <h2 className="text-lg font-bold">Caixa Escolar</h2>}
        <button
          className="text-white text-2xl focus:outline-none"
          onClick={toggleSidebar}
        >
          <Bars3Icon className="w-6 h-6" />
        </button>
      </div>

      {/* Menu de Navegação */}
      <nav className="flex-grow">
        <ul className="space-y-2">
          {sidebarItems.map((item) => (
            <li key={item.text}>
              <NavLink
                to={item.path}
                end
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-md transition ${
                    isActive ? "bg-blue-700" : "hover:bg-blue-800"
                  }`
                }
              >
                {item.icon}
                <span
                  className={`ml-3 transition-opacity ${!isOpen && "hidden"}`}
                >
                  {item.text}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Botão de Logout fixado na parte inferior */}
      <button
        onClick={handleLogout}
        className="flex items-center p-3 mt-auto rounded-md transition w-full text-whitegi hover:text-red-600"
      >
        <ArrowLeftOnRectangleIcon className="w-6 h-6" />
        <span className={`ml-3 transition-opacity ${!isOpen && "hidden"}`}>
          Sair
        </span>
      </button>
    </aside>
  );
};

export default Sidebar;
