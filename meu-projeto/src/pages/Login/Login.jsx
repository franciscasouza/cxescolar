import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNotification } from '../../hooks/useNotification';

import { 
  Button, 
  TextField, 
  Box, 
  Typography, 
  Container, 
  Paper 
} from '@mui/material';
import NotificationSnackbar from '../../components/Notifications/NotificationSnackbar';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const { login } = useAuth();
  const { notification, showNotification, hideNotification } = useNotification();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const success = login(username, password);
    
    if (!success) {
      showNotification('Login failed. Please check your credentials.', 'error');
    }
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 8 }}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Paper>
      
      <NotificationSnackbar
        open={notification.open}
        handleClose={hideNotification}
        severity={notification.severity}
        message={notification.message}
      />
    </Container>
  );
}

export default Login;
