import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import routes from "./routes";
import AdminRoutes from "./adminRoutes";
import NavBar from "./components/navigation/NavBar";
import { Container, ThemeProvider } from "@mui/material";
import theme from "./styles/theme";
import SideBar from "./admin/navigation/sidebar";
import ManageFacilities from "./admin/pages/ManageFacilities";
import MainContainer from "./admin/MainContainer";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<NavBar />}>
            {routes.map((route) => (
              <Route key={route.id} path={route.path} element={route.element} />
            ))}
            ;
          </Route>
          <Route path="/manage" element={<MainContainer />}>
            {AdminRoutes.map((route) => (
              <Route key={route.id} path={route.path} element={route.element} />
            ))}
            ;
            <Route
              path="/manage/facilities"
              element={<h1>Manage Facilities</h1>}
            />
          </Route>
          <Route path="*" element={<h1>404 NOT FOUND!</h1>} />
        </Routes>

        {/* <Routes>
        <Route path="/manage" element={<SideBar />}>
          <Route path="/manage/facilities" element={<ManageFacilities />} />
          <Route path="/manage/bookings" element={<h1>Manage Bookings</h1>} />
        </Route>
      </Routes> */}
      </Router>
    </ThemeProvider>
  );
}
