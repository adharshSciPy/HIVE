import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import { Link as RouterLink } from 'react-router-dom'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { InputLabel, MenuItem } from '@mui/material';
import { useState } from 'react';
import { setRole } from '../../store/auth';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';
import axios from 'axios'
import { toast } from 'react-toastify';



export default function SignUp() {


  // new Logics
  const [student, setStudent] = useState(false)
  const [role, setRole] = useState('')
  const [date, setDate] = React.useState('');

  const navigate = useNavigate()


  const handleChange = (event) => {
    if (event.target.value === 'student') {
      setRole('student')
      setStudent(true)
    }
    else {
      setStudent(false)
      setRole('public')
    }
  }

  const handleDate = (newValue) => {
    setDate(newValue);
  };
  const [formData, setFormData] = useState({
    fullName: '',
    role: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    dob: '',
    college: '',
    course: ''
  });
  const [formErrors, setFormErrors] = useState({});

  // inputs onChange handler
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };


  // form validation
  const validateFormData = (data) => {
    const errors = {};

    // Full Name validation
    if (!data.fullName) {
      errors.fullName = 'Full Name is required';
    } else if (!/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(data.fullName)) {
      errors.fullName = 'Full Name is invalid';
    }

    // Email validation
    if (!data.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = 'Email is invalid';
    }


    // Password validation
    if (!data.password) {
      errors.password = 'Password is required';
    } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(data.password)) {
      errors.password = 'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number';
    }


    // Confirm Password validation
    if (!data.confirmPassword) {
      errors.confirmPassword = 'Confirm Password is required';
    }
    else if (data.password !== data.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }


    if (student) {
      //  gender validation
      if (!data.gender) {
        errors.gender = 'Gender is required';
      }


      // // dob gender validation
      // if (!data.dob) {
      //   errors.dob = 'Date of Birth is required';
      // }
      // else {
      //   errors.dob = ''
      // }

      // college gender validation
      if (!data.college) {
        errors.college = 'College Name is required';
      }


      // course gender validation
      if (!data.course) {
        errors.course = 'Course Name is required';
      }

    }
    return errors;
  };

  // forms submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validateFormData(formData);
    setFormErrors(errors)
    if (Object.keys(errors).length === 0) {
      console.log('No errors')

      // submit the form
      axios.post('http://localhost:5000/user/register', {
        fullName: formData.fullName,
        role,
        email: formData.email,
        password: formData.password,
        gender: formData.gender,
        dob: formData.dob,
        college: formData.college,
        course: formData.course,
      })
        .then((res) => {
          toast.success(res.data.message, {
            position: toast.POSITION.TOP_CENTER,
          });
          navigate('/login')
        })
        .catch((err) => {
          console.log(err)
        })
    }
    else {
      setFormErrors(errors);
      console.log('Error Found in form')
      toast.error('Form Validation Failed', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (

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
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                error={!!formErrors.fullName}
                helperText={formErrors.fullName}
                required
                autoFocus
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                select
                label="Role"
                name='role'
                value={role}
                sx={{ width: '100%' }}
                onChange={handleChange}
              >
                <MenuItem value='student'>Student</MenuItem>
                <MenuItem value='public'>Public</MenuItem>
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                error={!!formErrors.email}
                helperText={formErrors.email}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Password"
                name="password"
                type="text"
                value={formData.password}
                onChange={handleInputChange}
                error={!!formErrors.password}
                helperText={formErrors.password}
                required
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Confirm Password"
                name="confirmPassword"
                type="text"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                error={!!formErrors.confirmPassword}
                helperText={formErrors.confirmPassword}
                fullWidth
              />
            </Grid>


            {
              student ? (
                <>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      select
                      label="Gender"
                      name='gender'
                      sx={{ width: '100%' }}
                      value={formData.gender}
                      onChange={handleInputChange}
                      error={!!formErrors.gender}
                      helperText={formErrors.gender}
                    >
                      <MenuItem value='male'>Male</MenuItem>
                      <MenuItem value='female'>Female</MenuItem>
                    </TextField>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DesktopDatePicker
                        label="Date of Birth"
                        inputFormat="DD/MM/YYYY"
                        value={date}
                        onChange={handleDate}
                        renderInput={(params) => <TextField color="primary" {...params} name="date" value={formData.dob} fullWidth />}

                      />
                    </LocalizationProvider>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      autoComplete="college-name"
                      name="college"
                      required
                      fullWidth
                      id="college"
                      label="College Name"
                      value={formData.college}
                      onChange={handleInputChange}
                      error={!!formErrors.college}
                      helperText={formErrors.college}
                    />
                  </Grid>


                  <Grid item xs={12}>
                    <TextField
                      autoComplete="course"
                      name="course"
                      required
                      fullWidth
                      id="course"
                      label="Course"
                      value={formData.course}
                      onChange={handleInputChange}
                      error={!!formErrors.course}
                      helperText={formErrors.course}
                    />
                  </Grid>
                </>
              ) : ''
            }

          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Create Account
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <RouterLink to="/login">
                <Link component="span" variant="body2">
                  {"Already have an account? Sign In"}
                </Link>
              </RouterLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}