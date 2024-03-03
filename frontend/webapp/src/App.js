import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import routes from "./routes";
import NavBar from "./components/navigation/NavBar";
import { Container, ThemeProvider } from "@mui/material";
import theme from "./styles/theme";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
      <NavBar />
        <Routes>
          {routes.map((route) => (
            <Route key={route.id} path={route.path} element={route.element} />
          ))}
          ;
        </Routes>
      </Router>
    </ThemeProvider>
  );
}
