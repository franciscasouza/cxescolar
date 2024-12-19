import PropTypes from 'prop-types';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import Footer from '../Footer/Footer';

function DashboardLayout({ children, isSidebarOpen, onToggle, onLogout  }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header onLogout={onLogout}/>
      <div style={{ display: 'flex', flex: 1 }}>
        <Sidebar isOpen={isSidebarOpen} onToggle={onToggle} />
        <div style={{ display: 'flex', flex: 1, flexDirection:'column' }}>
        <main style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
          {children} {/* Aqui vão as páginas internas, como Home, Reports, Settings */}
        </main>
        <Footer />
      </div>      
    </div>
    </div>
      );
    }
    DashboardLayout.propTypes = {
      children: PropTypes.node.isRequired,
      isSidebarOpen: PropTypes.bool.isRequired,
      onToggle: PropTypes.func.isRequired,
      onLogout: PropTypes.func.isRequired,
    };



export default DashboardLayout;
