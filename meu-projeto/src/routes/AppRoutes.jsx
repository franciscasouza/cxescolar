import { Routes, Route } from "react-router-dom";
import { ROUTES } from "../core/constants/routes";
import { AuthGuard, GuestGuard } from "../core/guards/AuthGuard";

// Layouts
import DashboardLayout from "../components/Layout/DashboardLayout";
import AuthLayout from "../components/Layout/AuthLayout";

// Pages
import Home from "../pages/Home";
import Login from "../pages/Login/Login";
import Reports from "../pages/Reports";
import Settings from "../pages/Settings";
import Escolas from "../pages/EscolaPages/EscolasPages";
import DetalhesEscola from "../pages/EscolaPages/DetalhesEscola";
import Tipologias from "../components/Tipologias/Tipologias";
import TipologiaFormPage from "../pages/Tipologia/TipologiaFormPage";
import Fornecedores from "../components/Fornecedores/Fornecedores";
import FornecedorFormPage from "../pages/ForncedoresPage/FornecedorFormPage";

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<GuestGuard />}>
        <Route 
          path={ROUTES.LOGIN} 
          element={
            <AuthLayout>
              <Login />
            </AuthLayout>
          } 
        />
      </Route>

      {/* Protected Routes */}
      <Route element={<AuthGuard />}>
        <Route 
          element={<DashboardLayout />} 
          children={[
            <Route 
              key="home" 
              path={ROUTES.HOME} 
              element={<Home />} 
            />,
            <Route 
              key="schools" 
              path={ROUTES.SCHOOLS.BASE} 
              element={<Escolas />} 
            />,
            <Route 
              key="tipologias" 
              path={ROUTES.TIPOLOGIAS.BASE} 
              element={<Tipologias />} 
            />,
            <Route 
              key="fornecedores" 
              path={ROUTES.FORNECEDORES.BASE} 
              element={<Fornecedores />} 
            />,
            <Route 
              key="reports" 
              path={ROUTES.REPORTS} 
              element={<Reports />} 
            />,
            <Route 
              key="settings" 
              path={ROUTES.SETTINGS} 
              element={<Settings />} 
            />
          ]}
        />
      </Route>

      {/* 404 Route */}
      <Route 
        path="*" 
        element={<Navigate to={ROUTES.HOME} replace />} 
      />
    </Routes>
  );
}

export default AppRoutes;
