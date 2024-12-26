// src/App.jsx
import  { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import DashboardLayout from './components/Layout/DashboardLayout';
import AuthLayout from './components/Layout/AuthLayout';
import Home from './pages/Home';
import Login from './pages/Login/Login';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Escolas from './pages/EscolaPages/EscolasPages';
import DetalhesEscola from './pages/EscolaPages/DetalhesEscola';

function ProtectedRoute({ isAuthenticated, children }) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

ProtectedRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <AppContent 
        isAuthenticated={isAuthenticated} 
        setIsAuthenticated={setIsAuthenticated} 
      />
    </Router>
  );
}

function AppContent({ isAuthenticated, setIsAuthenticated }) {
  const navigate = useNavigate();

  const handleLogin = (username, password) => {
    console.log('Login bem-sucedido para:', username); // Log de depuração
    // Aqui você pode decodificar o token ou realizar outras operações com username e password
    setIsAuthenticated(true);
    navigate('/'); // Redireciona para a página inicial após login bem-sucedido
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login'); // Redireciona para a página de login
  };

  return (
    <Routes>
      <Route 
        path="/login" 
        element={
          <AuthLayout>
            <Login onLogin={handleLogin} />
          </AuthLayout>
        } 
      />
      
      <Route 
        path="/" 
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <DashboardLayout onLogout={handleLogout}>
              <Home />
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/reports" 
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <DashboardLayout onLogout={handleLogout}>
              <Reports />
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/settings" 
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <DashboardLayout onLogout={handleLogout}>
              <Settings />
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />

      {/* Rota de Dashboard com Escolas */}
      <Route 
        path="/escolas" 
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <DashboardLayout onLogout={handleLogout}>
              <Escolas />
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />

      <Route 
        path="/escolas/:id" 
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <DashboardLayout onLogout={handleLogout}>
              <DetalhesEscola />
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

AppContent.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  setIsAuthenticated: PropTypes.func.isRequired,
};

export default App;
