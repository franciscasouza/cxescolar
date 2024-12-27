// src/components/Layout/Footer.jsx
import "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        px: 2,
        mt: "auto", // Empurra o Footer para o final do flex container
        width: "100%",
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Typography variant="body2" color="text.secondary" align="center">
        © {new Date().getFullYear()} Desenvolvido por Secretaria Municipal de
        Tecnologia e Inovação. Todos os direitos reservados.
      </Typography>
    </Box>
  );
};

export default Footer;
