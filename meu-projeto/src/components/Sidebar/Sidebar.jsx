import { Link } from 'react-router-dom';
import { FaHome, FaChartLine, FaCog, FaBars } from 'react-icons/fa';
import './Sidebar.css';
import PropTypes from 'prop-types';

function Sidebar({ isOpen, onToggle }) {
  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-top">
        {isOpen && <h2>Caixa Escolar</h2>}
        <button className="toggle-btn" onClick={onToggle}>
          <FaBars />
        </button>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/">
              <FaHome className="icon" />
              {isOpen && <span>Home</span>}
            </Link>
          </li>
          <li>
            <Link to="/reports">
              <FaChartLine className="icon" />
              {isOpen && <span>Reports</span>}
            </Link>
          </li>
          <li>
            <Link to="/settings">
              <FaCog className="icon" />
              {isOpen && <span>Settings</span>}
            </Link>
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
