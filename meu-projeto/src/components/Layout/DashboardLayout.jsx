// src/components/Layout/DashboardLayout.jsx
import { useState } from "react";
import PropTypes from "prop-types";
import { Box, Toolbar, IconButton, AppBar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Sidebar from "../Sidebar/Sidebar"; // Ajuste o caminho conforme a estrutura do seu projeto
import Footer from "../Footer/Footer"; // Assegure-se de que o Footer está corretamente importado
import Header from "../Header/Header"; // Assegure-se de que o Header está corretamente importado

const drawerWidth = 240;

const DashboardLayout = ({ children, onLogout }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState(true); // Sidebar aberto inicialmente no desktop

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDesktopToggle = () => {
    setDesktopOpen(!desktopOpen);
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sidebar
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        desktopOpen={desktopOpen}
        handleDesktopToggle={handleDesktopToggle}
      />

      {/* Header */}
      <Header
        onLogout={onLogout}
        handleDrawerToggle={handleDrawerToggle}
        handleDesktopToggle={handleDesktopToggle}
      />

      {/* AppBar */}
      <AppBar
        component="fixed"
        sx={{
          flexGrow: 1,
          display: { sm: "flex" },
          width: { sm: `calc(100% - ${desktopOpen ? drawerWidth : 0}px)` },
          ml: { sm: `${desktopOpen ? drawerWidth : 0}px` },
          transition: (theme) =>
            theme.transitions.create(["width", "margin"], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
        }}
      >
        <Toolbar>
          {/* Botão para togglear Sidebar no desktop */}
          <IconButton
            color="inherit"
            aria-label="toggle sidebar"
            edge="start"
            onClick={handleDesktopToggle}
            sx={{ mr: 2, display: { sm: "block" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
          {/* Outros elementos do AppBar podem ser adicionados aqui */}
          <Box sx={{ flexGrow: 1 }} />
          <Typography
            variant="body1"
            onClick={onLogout}
            sx={{ cursor: "pointer" }}
          >
            Sair
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Conteúdo Principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          overflow: "auto",
          width: { sm: `calc(100% - ${desktopOpen ? drawerWidth : 0}px)` },
          transition: (theme) =>
            theme.transitions.create(["width", "margin"], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          marginLeft: { sm: `${desktopOpen ? drawerWidth : 0}px` },
        }}
      >
        <Toolbar /> {/* Espaçamento para o Header */}
        <Box sx={{ flexGrow: 1 }}>
          {children} {/* Conteúdo da Página */}
        </Box>
        <Footer /> {/* Footer Fixo no Final */}
      </Box>
    </Box>
  );
};

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default DashboardLayout;
