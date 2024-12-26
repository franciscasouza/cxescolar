// src/components/Layout/Footer.jsx
import  'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box 
      component="footer"
      sx={{
        py: 2,
        px: 4,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
        textAlign: 'center',
      }}
    >
      <Typography variant="body2" color="text.secondary">
        © 2025 Desenvolvido por Secretaria Municipal de Tecnologia e Inovação.
      </Typography>
    </Box>
  );
};

export default Footer;
