import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import routes from "./routes";
import NavBar from './components/navigation/NavBar';

export default function App() {
  return (
    <>
    <NavBar/>
    {/* <h1>App</h1> */}
    <Router>
      <Routes>
        {routes.map((route) => (
          <Route key={route.id} path={route.path} element={route.element} />
        ))}
        ;
      </Routes>
    </Router>
    </>
  )
}