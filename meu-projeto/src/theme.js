// src/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#075aa9", // Correspondente a --first-color
      dark: "#08325e", // Correspondente a --first-color-dark
      light: "#3987db", // Correspondente a --first-color-light
      lighter: "#ddeeff", // Correspondente a --first-color-lighter
    },
    secondary: {
      main: "#dc004e", // Correspondente a --c-danger
    },
    success: {
      main: "#007300", // Correspondente a --c-success
    },
    warning: {
      main: "#da9b22", // Correspondente a --c-warning
    },
    error: {
      main: "#e21a24", // Correspondente a --c-danger
      dark: "#870000", // Correspondente a --c-danger-dark
    },
    info: {
      main: "#5c0087", // Correspondente a --c-purple
    },
    background: {
      default: "#f2f2f2", // Correspondente a --c-gray-light
      paper: "#ffffff", // Correspondente a --c-white
    },
    text: {
      primary: "#252525", // Correspondente a --text-color
      secondary: "#636363", // Correspondente a --text-color-light
    },
    link: {
      main: "#58555e", // Correspondente a --link-color
      secondary: "#7c7c8a", // Correspondente a --link-color-2
    },
    custom: {
      pinkInfo: "#d90e5d", // Correspondente a --c-pink-info
      greenBtn: "#01dc51", // Correspondente a --c-green-btn
      black10: "rgba(0, 0, 0, 0.1)", // Correspondente a --c-black-10
      black15: "rgba(0, 0, 0, 0.15)", // Correspondente a --c-black-15
      blue10: "rgba(56, 135, 219, 0.1)", // Correspondente a --c-blue-10
      blue20: "rgba(56, 135, 219, 0.2)", // Correspondente a --c-blue-20
      title: "#08325e", // Correspondente a --title-color
      greenLight: "#dfeadf", // Correspondente a --c-green-light
      gray: "#cccccc", // Correspondente a --c-gray
      grayLight: "#f2f2f2", // Correspondente a --c-gray-light
      grayLighter: "#fafafa", // Correspondente a --c-gray-lighter
    },
  },
  typography: {
    fontFamily: '"Poppins", sans-serif',
    // Outras definições de tipografia...
  },
  spacing: 8, // Unidade de espaçamento padrão
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none", // Remove a transformação de texto para maiúsculas
        },
      },
    },
  },
});

export default theme;
