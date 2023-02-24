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
import { MenuItem } from '@mui/material';
import { setRole } from '../../store/auth';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';
import axios from 'axios'
import { toast } from 'react-toastify'


const theme = createTheme();


export default function NewPost() {
  const [title, setTitle] = React.useState('')
  const [price, setPrice] = React.useState('')
  const [postType, setPostType] = React.useState('')
  const [date, setDate] = React.useState(dayjs('03-02-2023'))


  const handleDate = (newValue) => {
    setDate(newValue);
  };


  const handleChange = (event) => {
    setPostType(event.target.value)
  }



  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    axios.post('http://localhost:5000/public/post', {
      title: data.get('title'),
      postType: data.get('post-type'),
      price: data.get('price'),
      date: data.get('date')
    })
      .then((res) => {
        toast.success(res.data.message, {
          position: toast.POSITION.TOP_CENTER,
        });
        setTitle('')
        setPrice('')
        setPostType('')
      })
      .catch((err) => {
        toast.error(err.message, {
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
          <Typography component="h1" variant="h5">
            Create New Post
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              autoFocus
              size='small'
              value={title}
              onChange={(e)=> {setTitle(e.target.value)}}
            />
            <TextField
              variant="outlined"
              select
              maxWidth
              value={postType}
              label="Post-Type"
              name='post-type'
              sx={{ width: '100%', mt: 1 }}
              size="small"
              onChange={handleChange}
            >
              <MenuItem value='jobfair'>Job Fair</MenuItem>
              <MenuItem value='webinar'>Webinar</MenuItem>
              <MenuItem value='internship'>Internship</MenuItem>
              <MenuItem value='placement'>Placement</MenuItem>
            </TextField>
            <TextField
              margin="normal"
              required
              fullWidth
              name="price"
              label="Price"
              type="text"
              id="price"
              size='small'
              value={price}
              onChange={(e)=> {setPrice(e.target.value)}}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="Date"
                inputFormat="DD/MM/YYYY"
                value={date}
                onChange={handleDate}
                renderInput={(params) => <TextField {...params} name="date" size='small' sx={{ minWidth: '100%', margin: '.5rem 0' }} fullWidth />}
                size='small'

              />
            </LocalizationProvider>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Post
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}