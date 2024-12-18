
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home';
import Login from './pages/Login/Login';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

function ProtectedRoute({ isAuthenticated, children }) {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
        const data = await response.json();
        localStorage.setItem('token', data.token);
        setIsAuthenticated(true);
      } else {
        alert('Falha na autenticação. Verifique suas credenciais.');
      }
    } catch (error) {
      console.error('Erro ao conectar-se à API:', error);
      alert('Erro na autenticação.');
    }
  };

  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Header />
        
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          {isAuthenticated && (
            <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />
          )}
          <main style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
            <Routes>
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route 
                path="/" 
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Home />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/reports" 
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Reports />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/settings" 
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Settings />
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;
