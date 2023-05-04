import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'


function Home() {

  const navigate = useNavigate()
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const role = useSelector((state) => state.auth.role);
  return (

    <Container maxWidth="lg" sx={{ minHeight: '90vh', maxWidth: '95vw' }}>
      <Grid container alignItems="center" justifyContent="space-between" sx={{ width: '100%' }}>
        <Grid item md={6} xs={12}>
          <Box sx={{ height: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Typography variant="h4" color="initial">
              Join the Buzz of
            </Typography>
            <Typography variant="h2" color="initial">
              Online Learning
            </Typography>
            <Typography variant="h3" color="primary">
              with HIVE
            </Typography>
            <Typography variant="h6" color="initial" sx={{ mt: '1rem' }}>
              The Ultimate Social Media Platform for Students!
            </Typography>
            <Stack direction="row" spacing={2} sx={{ mt: '1rem' }}>
              <Button variant="outlined" onClick={() => navigate('/login')}>
                Login
              </Button>

              <Button variant="contained" onClick={() => navigate('/register')}>
                Register
              </Button>
            </Stack>
          </Box>
        </Grid>


        <Grid item xs={12} md={6}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
            <img src="https://img.freepik.com/free-vector/digital-presentation-concept-illustration_114360-8175.jpg?w=740&t=st=1683180787~exp=1683181387~hmac=170ff7026808d7ec10b9b8b83219c1619ef43498c263baf74e1d9d1c4e924e82" alt="" style={{ width: '60%', height: '60%' }} />
          </div>
        </Grid>
      </Grid>
    </Container>



  )
}

export default Home