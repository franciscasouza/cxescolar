import { NavLink } from 'react-router-dom';
import { FaHome, FaChartLine, FaCog, FaMicrosoft  } from 'react-icons/fa';
import './Sidebar.css';
import PropTypes from 'prop-types';

function Sidebar({ isOpen, onToggle }) {
  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-top">
        {isOpen && <h2>Caixa Escolar</h2>}
        <button className="toggle-btn" onClick={onToggle}>
          <FaMicrosoft  />
        </button>
      </div>
      <nav>
        <ul>
          <li>
            <NavLink to="/" className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
              <FaHome className="icon" />
              {isOpen && <span>Home</span>}
            </NavLink>
          </li>
          <li>
            <NavLink to="/reports"className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
              <FaChartLine className="icon" />
              {isOpen && <span>Reports</span>}
            </NavLink>
          </li>
          <li>
            <NavLink to="/settings"className={({isActive}) => isActive ? 'nav-link active' : 'nav-link'}>
              <FaCog className="icon" />
              {isOpen && <span>Settings</span>}
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}
Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default Sidebar;
