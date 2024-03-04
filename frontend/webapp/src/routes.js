import React from "react";
import HomePage from "./components/pages/HomePage";
import AboutPage from "./components/pages/AboutPage";
import ErrorPage from "./components/pages/ErrorPage";
import FacilitiesPage from "./components/pages/FacilitiesPage";
import BookingPage from "./components/pages/BookingPage";
import LoginPage from "./components/pages/LoginPage";
import SignUpPage from "./components/pages/SignupPage";
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
        path: "/facilities",
        element: <FacilitiesPage />,
    },
    {
        id: 5,
        path: "/signup",
        element: <SignUpPage />,
    },
    {
        id: 6,
        path: "/login",
        element: <LoginPage />,
    },
    {
        id: 7,
        path: "/book/:id",
        element: <BookingPage />,
    },
    {
        id: 8,
        path: "/services",
        element: <h1>Services</h1>,
    },
    {
        id: 9,
        path: "/error",
        element: <ErrorPage />,
    },
    {
        id: 10,
        path: "*",
        element:<h1>404 NOT FOUND!</h1>,
    }
    ];

    export default routes;