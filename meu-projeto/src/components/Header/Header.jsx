// Header.jsx
import PropTypes from 'prop-types';
import './Header.css';
import { FaUser, FaBell, FaBars } from 'react-icons/fa';
import logo from '../../assets/LOGO_PMVV_2021_2.png'; 
import { useState } from 'react';

function Header({ onLogout }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  return (
    <header className="header">
      <div className="header-left">
        <img src={logo} alt="Logo" className="logo" />
      </div>

      <div className="header-right">
        <FaBell className="icon alert-icon" />
        <div className="user-container">
          <FaUser className="icon login-icon" onClick={toggleUserDropdown} />
          {isUserDropdownOpen && (
            <div className="user-dropdown">
              <ul>
                <li><a href="/perfil">Meu Perfil</a></li>
                <li><a href="/configuracoes">Configurações</a></li>
                <li><button onClick={onLogout}>Terminar Sessão</button></li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
        <FaBars />
      </button>

      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <ul>
            <li><a href="/perfil">Meu Perfil</a></li>
            <li><a href="/configuracoes">Configurações</a></li>
            <li><button onClick={onLogout}>Terminar Sessão</button></li>
          </ul>
        </div>
      )}
    </header>
  );
}

Header.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

export default Header;
