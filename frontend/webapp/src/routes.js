import React from "react";
import HomePage from "./components/pages/HomePage";
import AboutPage from "./components/pages/AboutPage";
// import ContactPage from "./components/pages/ContactPage";

const routes = [
    {
        id: 1,
        path: "/",
        element: <HomePage />,
    },
    {
        id: 2,
        path: "/about",
        element: <AboutPage />,
    },
    // {
    //     id: 3,
    //     path: "/contact",
    //     element: <Contact />,
    // },
    {
        id: 4,
        path: "*",
        element: <h1>Not Found!</h1>,
    }
    ];

    export default routes;