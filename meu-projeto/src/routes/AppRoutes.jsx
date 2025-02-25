import { Routes, Route, Navigate } from "react-router-dom";
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
import Escolas from "@/pages/EscolaPages/EscolasPages";
import Tipologias from "../components/Tipologias/Tipologias";
import Fornecedores from "../components/Fornecedores/Fornecedores";

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
        {/* Dashboard Layout envolve as rotas protegidas */}
        <Route element={<DashboardLayout />}>
          <Route path={ROUTES.HOME} element={<Home />} />
          <Route path={ROUTES.SCHOOLS.BASE} element={<Escolas />} />
          <Route path={ROUTES.TIPOLOGIAS.BASE} element={<Tipologias />} />
          <Route path={ROUTES.FORNECEDORES.BASE} element={<Fornecedores />} />
          <Route path={ROUTES.REPORTS} element={<Reports />} />
          <Route path={ROUTES.SETTINGS} element={<Settings />} />
        </Route>
      </Route>

      {/* 404 Route */}
      <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
    </Routes>
  );
}

export default AppRoutes;
