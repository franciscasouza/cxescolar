// src/components/Layout/DashboardLayout.jsx
import  { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Toolbar } from '@mui/material';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const DashboardLayout = ({ children, onLogout }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Sidebar */}
      <Sidebar mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} />

      {/* Conteúdo Principal */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Header onLogout={onLogout} handleDrawerToggle={handleDrawerToggle} />

        {/* Conteúdo */}
        <Box sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar /> {/* Espaçamento para o AppBar */}
          {children}
        </Box>

        {/* Footer */}
        <Footer />
      </Box>
    </Box>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default DashboardLayout;
