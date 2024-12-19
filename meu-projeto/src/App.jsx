import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import DashboardLayout from './components/Layout/DashboardLayout';
import AuthLayout from './components/Layout/AuthLayout';
import Home from './pages/Home';
import Login from './pages/Login/Login';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import PropTypes from 'prop-types';

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <AppContent 
        isSidebarOpen={isSidebarOpen} 
        setIsSidebarOpen={setIsSidebarOpen} 
        isAuthenticated={isAuthenticated} 
        setIsAuthenticated={setIsAuthenticated} 
      />
    </Router>
  );
}

function AppContent({ isSidebarOpen, setIsSidebarOpen, isAuthenticated, setIsAuthenticated }) {
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  }

  const handleLogin = async (username, password) => {
    try {
      const response = await fetch('https://localhost:7165/api/Autenticacao/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      
      if (response.ok) {
        const token = await response.text(); 
        localStorage.setItem('token', token);
        setIsAuthenticated(true);
        navigate('/'); // Redireciona o usuário após login bem-sucedido
      } else {
        alert('Falha na autenticação. Verifique suas credenciais.');
      }
    } catch (error) {
      console.error('Erro ao conectar-se à API:', error);
      alert('Erro na autenticação.');
    }
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
            <DashboardLayout 
            isSidebarOpen={isSidebarOpen} 
            onToggle={toggleSidebar}
            onLogout={handleLogout}
            >
              <Home />
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/reports" 
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <DashboardLayout isSidebarOpen={isSidebarOpen} onToggle={toggleSidebar}
            onLogout={handleLogout} // Não esqueça aqui também
            >
              <Reports />
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/settings" 
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <DashboardLayout isSidebarOpen={isSidebarOpen} onToggle={toggleSidebar}
            onLogout={handleLogout} // Não esqueça aqui também
            >
              <Settings />
            </DashboardLayout>
          </ProtectedRoute>
        } 
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

AppContent.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired,
  setIsSidebarOpen: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  setIsAuthenticated: PropTypes.func.isRequired,
};

export default App;
