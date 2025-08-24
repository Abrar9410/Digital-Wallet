import MainLayout from "@/layouts/MainLayout";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: MainLayout,
    },
    {
        path: "/login",
        Component: Login,
    },
    {
        path: "/register",
        Component: Register,
    },
]);