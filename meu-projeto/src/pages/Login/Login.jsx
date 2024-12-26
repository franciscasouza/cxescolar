// src/pages/Login/Login.jsx
import { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  TextField,
  Button,
  Alert,
  Link,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import logologin from "../../assets/PMDDE.png"; // Verifique se o caminho está correto

// Styled Components usando MUI's styled
// const LoginContainer = styled(Box)(({ theme }) => ({
//   minHeight: "100vh",
//   width: "100%",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
//   //backgroundColor: theme.palette.background.default,
// }));

// const LoginBox = styled(Box)(({ theme }) => ({
//   width: "100%",
//   maxWidth: "100%", // Permite 100% de largura
//   padding: theme.spacing(4),
//   //backgroundColor: theme.palette.background.paper,
//   boxShadow: theme.shadows[3],
// }));

const Logo = styled("img")(({ theme }) => ({
  width: "150px",
  marginBottom: theme.spacing(2),
}));

const Form = styled("form")(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  height: "36px",
  backgroundColor: theme.palette.primary.main, // Define a cor de fundo como a cor primária principal
  color: theme.palette.primary.contrastText, // Define a cor do texto com base no contraste da cor primária
  "&:hover": {
    backgroundColor: theme.palette.primary.dark, // Define a cor de fundo ao passar o mouse
  },
}));
const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Estado de carregamento

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Resetar erro antes da nova tentativa
    setLoading(true); // Iniciar o carregamento
    console.log("Tentando fazer login com:", username, password); // Log de depuração

    try {
      const response = await fetch(
        "https://localhost:7165/api/Autenticacao/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      console.log("Resposta do servidor:", response.status); // Log de depuração

      if (response.ok) {
        const token = await response.text();
        console.log("Token recebido:", token); // Log de depuração
        localStorage.setItem("token", token);
        onLogin(username, password); // Passando os parâmetros necessários
      } else {
        setError("Falha na autenticação. Verifique suas credenciais.");
      }
    } catch (error) {
      console.error("Erro ao conectar-se à API:", error);
      setError("Erro na autenticação.");
    } finally {
      setLoading(false); // Finalizar o carregamento
    }
  };

  return (
    <Grid spacing={2} justifyContent="center">
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <Box textAlign="center">
          <Logo src={logologin} alt="Logo" />
          <Typography variant="h4" component="h1" gutterBottom>
            Bem-vindo(a)
          </Typography>
        </Box>
        <Form onSubmit={handleSubmit}>
          <TextField
            label="Usuário"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            aria-label="Usuário"
          />
          <TextField
            label="Senha"
            variant="outlined"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            inputProps={{ minLength: 6 }} // Validação de senha mínima
            aria-label="Senha"
          />
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
          <SubmitButton
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Entrar"
            )}
          </SubmitButton>
        </Form>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs>
            <Link href="/esqueci-senha" variant="body2">
              Esqueceu a senha?
            </Link>
          </Grid>
          <Grid item>
            <Link href="/criar-conta" variant="body2">
              {"Criar conta"}
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Login;
