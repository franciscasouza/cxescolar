import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh' 
    }}>
      <Typography variant="h1" component="h2" gutterBottom>
        404
      </Typography>
      <Typography variant="h5" component="p" gutterBottom>
        Page Not Found
      </Typography>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={() => navigate('/')}
      >
        Go to Home
      </Button>
    </Container>
  );
}

export default NotFound;
