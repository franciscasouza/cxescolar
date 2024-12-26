// src/pages/Home.jsx
import  { useEffect, useState } from 'react';
import { Grid, Box, Typography, IconButton, Tooltip, CircularProgress } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import CardItem from '../components/HomeComponents/CardItem';
import PieChartComponent from '../components/ChartsComponents/PieChartComponent';
import LineChartComponent from '../components/ChartsComponents/LineChartComponent';
import BarChartComponent from '../components/ChartsComponents/BarChartComponent';
import AnimatedButton from '../components/Animations/AnimatedButton';
import NotificationSnackbar from '../components/Notifications/NotificationSnackbar';
import axios from 'axios';



const Home = () => {
  const [cards, setCards] = useState([]);
  const [lineData, setLineData] = useState([]);
  const [barData, setBarData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    severity: 'success', // 'success' | 'error' | 'warning' | 'info'
    message: '',
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      // Substitua pelas URLs reais das suas APIs
      const cardsResponse = await axios.get('https://api.seusite.com/cards');
      const lineResponse = await axios.get('https://api.seusite.com/line-data');
      const barResponse = await axios.get('https://api.seusite.com/bar-data');
      const pieResponse = await axios.get('https://api.seusite.com/pie-data');

      setCards(cardsResponse.data);
      setLineData(lineResponse.data);
      setBarData(barResponse.data);
      setPieData(pieResponse.data);
      setSnackbar({
        open: true,
        severity: 'success',
        message: 'Dados atualizados com sucesso!',
      });
    } catch (error) {
      console.error('Erro ao buscar os dados:', error);
      setSnackbar({
        open: true,
        severity: 'error',
        message: 'Erro ao atualizar os dados.',
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        padding: 2,
        boxSizing: 'border-box',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Tooltip title="Atualizar Dados" placement="left">
          <IconButton color="primary" onClick={fetchData}>
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Grid container spacing={2} sx={{ flexGrow: 1, overflow: 'auto' }}>
        {/* Renderizando os Cards */}
        {cards.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <CardItem 
              title={card.title} 
              description={card.description} 
              image={card.image} 
            />
          </Grid>
        ))}

        {/* Botão Animado para Ação Especial */}
        <Grid item xs={12}>
          <AnimatedButton variant="contained" color="secondary" fullWidth>
            Ação Especial
          </AnimatedButton>
        </Grid>

        {/* Renderizando os Gráficos */}
        <Grid item xs={12} md={6}>
          <LineChartComponent data={lineData} title="Vendas Mensais" />
        </Grid>
        <Grid item xs={12} md={6}>
          <BarChartComponent data={barData} title="Vendas por Produto" />
        </Grid>
        <Grid item xs={12} md={6}>
          <PieChartComponent data={pieData} title="Distribuição de Grupos" />
        </Grid>
        {/* Adicione mais gráficos conforme necessário */}
      </Grid>
      {/* Snackbar de Notificação */}
      <NotificationSnackbar 
        open={snackbar.open} 
        handleClose={handleSnackbarClose} 
        severity={snackbar.severity} 
        message={snackbar.message} 
      />
    </Box>
  );
};

export default Home;
