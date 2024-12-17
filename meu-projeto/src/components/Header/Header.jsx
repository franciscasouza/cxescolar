// Header.jsx
import './Header.css';
import { FaUser, FaBell } from 'react-icons/fa';
import logo from '../../assets/LOGO_PMVV_2021_2.png'; 
function Header() {
  return (
    <header className="header">
      
      <div className="header-right">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="header-left">
        <FaBell className="icon alert-icon" />
        <FaUser className="icon login-icon" />
      </div>
    </header>
  );
}

export default Header;
