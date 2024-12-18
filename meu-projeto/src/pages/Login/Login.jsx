import { useState } from 'react';
// import logo from '../../assets/LOGO_PMVV_2021_2.png';





// eslint-disable-next-line react/prop-types
function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        {/* <img src={logo} alt="Logo" className="login-logo" /> */}
        <h2>Bem-vindo(a)</h2>
        <form onSubmit={handleSubmit}>
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

          <button type="submit" className="login-button">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
