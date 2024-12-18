// Header.jsx
import './Header.css';
import { FaUser, FaBell, FaBars } from 'react-icons/fa';
import logo from '../../assets/LOGO_PMVV_2021_2.png'; 
import { useState } from 'react';

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const encerrarSessao = () => {
    alert('Encerrar sessão'); 
    // Ação real de logout deve ser implementada aqui
  }

  return (
    <header className="header">
      <div className="header-left">
        <img src={logo} alt="Logo" className="logo" />
      </div>

      {/* Ícones no desktop */}
      <div className="header-right">
        <FaBell className="icon alert-icon" />
        <div className="user-container">
          <FaUser className="icon login-icon" onClick={toggleUserDropdown} />
          {isUserDropdownOpen && (
            <div className="user-dropdown">
              <ul>
                <li><a href="/perfil">Meu Perfil</a></li>
                <li><a href="/configuracoes">Configurações</a></li>
                <li><button onClick={encerrarSessao}>Terminar Sessão</button></li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Botão hamburguer (mobile) */}
      <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
        <FaBars />
      </button>

      {/* Menu móvel - sem ícones, apenas links de texto */}
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <ul>
            <li><a href="/perfil">Meu Perfil</a></li>
            <li><a href="/configuracoes">Configurações</a></li>
            <li><button onClick={encerrarSessao}>Terminar Sessão</button></li>
          </ul>
        </div>
      )}
    </header>
  );
}

export default Header;
