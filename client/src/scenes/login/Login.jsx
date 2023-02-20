import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser, setRole, setStudent, setPublic, setAdmin } from '../../store/auth';
import { MenuItem } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify'
import Cookie from 'js-cookie'

export default function SignIn() {

  const theme = createTheme();
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const role = useSelector((state) => state.auth.role)


  // submit function
  const HandleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    //   roles: data.get('roles')
    // });

    axios.post('http://localhost:5000/user/login', {
      email: data.get('email'),
      password: data.get('password'),
    })
      .then((res) => {
        toast.success(res.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        const {token, user} = res.data
        Cookie.set("Token", token)
        console.log(user)
        // switching routers
        setTimeout(() => {
          switch (res.data.user.role) {
            case 'student':
              navigate('/student')
              dispatch(setUser(true))
              dispatch(setUser(user))
              dispatch(setStudent())
              console.log(role)
              break;


            case 'public':
              navigate('/public')
              dispatch(setUser(true))
              dispatch(setUser(user))
              dispatch(setPublic())
              break;


            case 'admin':
              navigate('/admin')
              dispatch(setUser(true))
              dispatch(setUser(user))
              dispatch(setAdmin())
              break;

            default: alert('Enter role')
          }
        }, 2000)

        console.log(res)
      })
      .catch((err) => {
        // console.log(err.response.data.message)
        toast.error(err.response.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
      })


  };


  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={HandleSubmit} noValidate sx={{ mt: 1 }}>


            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />


            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}