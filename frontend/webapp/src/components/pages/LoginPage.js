import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  TextField,
} from "@mui/material";
import {
  Form,
  FormContainer,
  ImageContainer,
  LoginPageContainer,
  MainContainer,
  TitleText,
} from "../../styles/pages/LoginPage";

export default function LoginPage() {
  const backend_url = process.env.REACT_APP_BACKEND_URL;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    if (!email || email === "") {
      setEmailError(true);
      console.log("email error");
    }
    if (re.test(email)) {
      console.log("email valid");
      setEmailError(false);
      if (!password || password === "") {
        setPasswordError(true);
        console.log("password error");
      } else {
        setPasswordError(false);
        //Email and Password are valid
        console.log({
          email: data.get("email"),
          password: data.get("password"),
        });
        console.log(`${backend_url}users/login`);
        axios
          .post(`${backend_url}users/login`, {
            email: email,
            password: password,
          })
          .then((response) => {
            setLoginError(false);
            console.log("came into responses");
            console.log("response", response);
            console.log("response status", response.data.status);
            if (response.data.status === 404 && response.data.message === "User Not Found") {
              setEmailError(true);
              setErrorMessage("User not found");
              console.log("email error");
            }
            if (response.data.status === 500) {
              setPasswordError(true);
              console.log("password error");
            }
            if (response.data.status === 401) {
              setPasswordError(true);
            }
            if (response.data.status === 200) {
              navigate("/");
            }
            // navigate("/");
          })
          .catch((error) => {
            console.log(error);
            setLoginError(true);
          });
      }
    } else {
      setEmailError(true);
      console.log("email error");
    }
  };

  return (
    <LoginPageContainer>
      <MainContainer>
        <ImageContainer src="/images/login-image.jpg" alt="login" />
        <FormContainer>
          <TitleText variant="h1"> Welcome to the Facility System</TitleText>
          {/* <FormControl onSubmit={handleSubmit}>
          <TextField
                    label="Email"
                    onChange={e => setEmail(e.target.value)}
                    required
                    variant="filled"
                    color="primary"
                    type="email"
                    sx={{mb: 3}}
                    fullWidth
                    value={email}
                    error={emailError}
                 />
                 <TextField 
                    label="Password"
                    onChange={e => setPassword(e.target.value)}
                    required
                    variant="filled"
                    color="primary"
                    type="password"
                    value={password}
                    error={passwordError}
                    fullWidth
                    sx={{mb: 3}}
                 />
                 <Button variant="contained" color="primary" type="submit" onClick={handleSubmit}>Login</Button>
          </FormControl> */}

          <Box
            component="form"
            onSubmit={handleSubmit}
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
              autoComplete="email"
              autoFocus
              error={emailError}
            />
            {emailError && (
              <FormHelperText error>Please enter a valid email</FormHelperText>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={passwordError}
            />
            {passwordError && (
              <FormHelperText error>Your password is incorrect</FormHelperText>
            )}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            {loginError && (
              <FormHelperText error sx={{textAlign: "center", fontWeight:"bold", fontSize: 14}}>
                Login failed. Please try again.
              </FormHelperText>
            )}
            <Grid container>
              <Grid item xs>
                <Link to={"/"} variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to={"/signup"} variant="body2">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>
          </Box>
        </FormContainer>
      </MainContainer>
    </LoginPageContainer>
  );
}
