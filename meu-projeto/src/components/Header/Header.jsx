// src/components/Layout/Header.jsx
import { useState } from "react";
import PropTypes from "prop-types";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme, useMediaQuery } from "@mui/material";

const Header = ({ onLogout, handleDrawerToggle, handleDesktopToggle }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleUserMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        {/* Botão de Toggle para Mobile */}
        {isMobile && (
          <IconButton
            color="inherit"
            aria-label="abrir drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}
        {/* Botão de Toggle para Desktop */}
        {!isMobile && (
          <IconButton
            color="inherit"
            aria-label="toggle sidebar"
            edge="start"
            onClick={handleDesktopToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
        )}

        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Caixa Escolar
        </Typography>
        <Tooltip title="Notificações">
          <IconButton color="inherit">
            <NotificationsIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Configurações de Conta">
          <IconButton color="inherit" onClick={handleUserMenuOpen}>
            <AccountCircle />
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleUserMenuClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem onClick={handleUserMenuClose}>Meu Perfil</MenuItem>
          <MenuItem onClick={handleUserMenuClose}>Configurações</MenuItem>
          <MenuItem
            onClick={() => {
              handleUserMenuClose();
              onLogout();
            }}
          >
            Terminar Sessão
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  onLogout: PropTypes.func.isRequired,
  handleDrawerToggle: PropTypes.func.isRequired,
  handleDesktopToggle: PropTypes.func.isRequired,
};

export default Header;
