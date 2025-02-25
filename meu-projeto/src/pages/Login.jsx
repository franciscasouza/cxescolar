import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Container,
  Typography,
  Box,
  Paper,
  Alert,
} from "@mui/material";

import { login } from "@/store/slices/authSlice";
import api from "@/services/api";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // Resetando erro anterior

    try {
      const response = await api.post("/Autenticacao/login", {
        username,
        password,
      });

      // Dispara a ação para armazenar o token e os dados do usuário no Redux
      dispatch(login({ token: response.data.token, user: response.data.user }));

      // Redireciona para o Dashboard
      navigate("/dashboard");
    } catch (error) {
      setError("Usuário ou senha incorretos. Tente novamente.");
      console.error("Erro ao fazer login:", error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{ padding: 4, width: "100%", textAlign: "center" }}
        >
          <Typography component="h1" variant="h5">
            Login
          </Typography>

          {/* Exibir erro de login */}
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleLogin} sx={{ mt: 2 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              autoFocus
              error={!!error} // Adiciona erro visual caso o login falhe
            />
            <TextField
              margin="normal"
              required
              fullWidth
              label="Senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              error={!!error} // Adiciona erro visual caso o login falhe
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Entrar
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default Login;
