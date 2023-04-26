import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setUser,
  setRole,
  setStudent,
  setPublic,
  setAdmin,
  setUserName
} from "../../store/auth";
import { MenuItem } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import Cookie from "js-cookie";

export default function SignIn() {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = useSelector((state) => state.auth.role);


  const [formData, setFormData] = React.useState({
    email: '',
    password: ''
  })
  const [formErrors, setFormErrors] = React.useState({})
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const validateFormData = (data) => {
    const errors = {};

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

    return errors;

  }

  // submit function
  const HandleSubmit = (event) => {
    event.preventDefault();
    const errors = validateFormData(formData);
    setFormErrors(errors)
    if (Object.keys(errors).length === 0) {
      console.log('No errors')

      axios
        .post("http://localhost:5000/user/login", {
          email: formData.email,
          password: formData.password,
        })
        .then((res) => {
          toast.success(res.data.message, {
            position: toast.POSITION.TOP_CENTER,
          });
          const { token, user } = res.data;

          Cookie.set("Token", token);
          const userData = (user._id)
          const userName = (user.fullName)

          // alert(userData)
          dispatch(setUser(userData))
          dispatch(setUserName(userName))

          // switching routers
          setTimeout(() => {
            switch (res.data.user.role) {
              case "student":
                navigate("/student");
                // dispatch(setUser(true));  
                dispatch(setStudent());
                break;

              case "public":
                navigate("/public");
                // dispatch(setUser(true));
                dispatch(setPublic());
                break;

              case "admin":
                navigate("/admin");
                // dispatch(setUser(true));
                dispatch(setAdmin());
                break;

              default:
                alert("Enter role");
            }
          }, 2000);

          console.log(res);
        })
        .catch((err) => {
          // console.log(err.response.data.message)
          toast.error(err.response.data.message, {});
        });
    }
    else {
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
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={HandleSubmit}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            error={!!formErrors.email}
            helperText={formErrors.email}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            error={!!formErrors.password}
            helperText={formErrors.password}
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
              <RouterLink to="/register">
                <Link component="span" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </RouterLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
