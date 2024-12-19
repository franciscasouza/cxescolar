// src/pages/Login/Login.jsx
import { useState } from 'react';
import './Login.css';
import logologin from '../../assets/PMDDE.png'; // Certifique-se de que o caminho está correto

// eslint-disable-next-line react/prop-types
function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Resetar erro antes da nova tentativa

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
        onLogin(username, password); // Isso deve definir isAuthenticated e redirecionar
      } else {
        //const errorMessage = await response.text();
        setError('Falha na autenticação. Verifique suas credenciais.');
      }
    } catch (error) {
      console.error('Erro ao conectar-se à API:', error);handleSubmit
      setError('Erro na autenticação.');
    }
  };

  return (
    <div className="login-container bg-login">
      <div className="login-card">
        <div className="login-image-container">
          <img src={logologin} alt="Logo" className="login-image" />
        </div>

        <h2>Bem-vindo(a)</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Usuário:</label>
            <input 
              type="text"
              id="username"
              placeholder="Digite seu usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)} 
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Senha:</label>
            <input 
              type="password"
              id="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="login-button">
            Entrar
          </button>
        </form>

        <div className="login-links">
          <a href="/esqueci-senha">Esqueceu a senha?</a>
          <a href="/criar-conta">Criar conta</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
