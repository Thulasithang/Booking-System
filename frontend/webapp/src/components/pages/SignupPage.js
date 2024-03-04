import React, { useState } from "react";
import { Box, TextField, MenuItem, Stack, FormHelperText } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "axios";
import {
  AccessPageContainer,
  FormContainer,
  ImageContainer,
  MainContainer,
  SubmitButton,
  TitleText,
} from "../../styles/pages/AccessPage";

export default function SignUpPage() {
  const navigate = useNavigate();
  const backend_url = process.env.REACT_APP_BACKEND_URL;
  const [error, setError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const data = new FormData(event.currentTarget);
    const name = data.get("name");
    const gender = data.get("gender");
    const date_of_birth = data.get("date_of_birth");
    const email = data.get("email");
    const password = data.get("password");
    const phone = data.get("phone");

    if (!name || !gender || !date_of_birth || !email || !password || !phone) {
      // Handle form fields not filled out
      setError(true);
      return;
    } else {
      setError(false);
      if (re.test(email)) {
        console.log("email valid");
        //Email and Password are valid
        setEmailError(false);
            axios
          .post(`${backend_url}users/register`, {
            username: name,
            gender: gender,
            date_of_birth: date_of_birth,
            mobile: phone,
            role: "member",
            email: email,
            password: password,
          }).then((response) => {
            setLoginError(false);
            console.log("came into responses");
            console.log("response", response);
            console.log("response status", response.status);
            if (response.status === 500) {
              setLoginError(true);
            } else if (response.status === 200) {
              navigate("/login");
            }
          }).catch((error) => {
            console.log(error);
            setLoginError(true);
          });
        } else {
        setEmailError(true);
        console.log("email error");
      }
    }
  };

  return (
    <AccessPageContainer>
      <MainContainer>
        <ImageContainer src="/images/login-image.jpg" alt="login" />
        <FormContainer>
          <TitleText variant="h1">Sign Up</TitleText>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required={true}
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoComplete="name"
              autoFocus
            />
            <Stack
              margin={"15px 0"}
              direction="row"
              spacing={2}
              justifyContent={"space-between"}
            >
              <TextField
                sx={{ maxWidth: "45%", minWidth: "45%" }}
                select
                required
                //   fullWidth
                autoFocus
                id="gender"
                label="Gender"
                name="gender"
              >
                <MenuItem value={"Male"}>Male</MenuItem>
                <MenuItem value={"Female"}>Female</MenuItem>
                <MenuItem value={"Other"}>Other</MenuItem>
              </TextField>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                {/* <DemoContainer components={['DatePicker']}> */}
                <DatePicker
                  sx={{ maxWidth: "45%", minWidth: "45%" }}
                  label="date_of_birth"
                  name="date_of_birth"
                />
                {/* </DemoContainer> */}
              </LocalizationProvider>
            </Stack>
            <TextField
              datatype="email"
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
              id="password"
              label="Password"
              name="password"
              type="password"
              autoComplete="current-password"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Phone Number"
              name="phone"
              autoComplete="phone"
              autoFocus
            />
            {error && (
              <FormHelperText error>
                Please fill out all fields
              </FormHelperText>
            )}
            {loginError && (
              <FormHelperText error>
                Error registering user. Please try again later.
              </FormHelperText>
            )}
            <SubmitButton type="submit" fullWidth>
              Sign Up
            </SubmitButton>
          </Box>
        </FormContainer>
      </MainContainer>
    </AccessPageContainer>
  );
}
