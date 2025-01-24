// src/components/Layout/Sidebar.jsx
import "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Divider,
  Tooltip,
  Typography,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";
import SchoolIcon from "@mui/icons-material/School";
import CenterFocusWeakIcon from "@mui/icons-material/CenterFocusWeak";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import PropTypes from "prop-types";
import { NavLink, useLocation } from "react-router-dom";
import { useTheme, useMediaQuery } from "@mui/material";

const drawerWidth = 240;

const Sidebar = ({ mobileOpen, handleDrawerToggle, desktopOpen }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const location = useLocation();

  const navItems = [
    { text: "Home", icon: <DashboardIcon />, path: "/" },
    { text: "Tipologias", icon: <CenterFocusWeakIcon />, path: "/tipologias" },
    {
      text: "Fornecedores",
      icon: <PeopleAltOutlinedIcon />,
      path: "/fornecedores",
    },
    { text: "Reports", icon: <BarChartIcon />, path: "/reports" },
    { text: "Settings", icon: <SettingsIcon />, path: "/settings" },
    { text: "Escolas", icon: <SchoolIcon />, path: "/escolas" },
  ];

  const drawerContent = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Caixa Escolar
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {navItems.map((item) => (
          <Tooltip key={item.text} title={item.text} placement="right">
            <ListItem
              button
              component={NavLink}
              to={item.path}
              selected={location.pathname === item.path}
              sx={{
                "&.active": {
                  backgroundColor: "action.selected",
                  "& .MuiListItemIcon-root": {
                    color: "primary.main",
                  },
                },
              }}
              onClick={isMobile ? handleDrawerToggle : undefined} // Toggle apenas no mobile
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          </Tooltip>
        ))}
      </List>
    </div>
  );

  return (
    <>
      {/* Drawer Temporário para Mobile */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Melhor performance em mobile
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        {drawerContent}
      </Drawer>
      {/* Drawer Persistente para Desktop */}
      <Drawer
        variant="persistent"
        open={desktopOpen}
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
};

Sidebar.propTypes = {
  mobileOpen: PropTypes.bool.isRequired,
  handleDrawerToggle: PropTypes.func.isRequired,
  desktopOpen: PropTypes.bool.isRequired,
  handleDesktopToggle: PropTypes.func.isRequired,
};

export default Sidebar;
