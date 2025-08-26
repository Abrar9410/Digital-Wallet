import DashboardLayout from "@/layouts/DashboardLayout";
import MainLayout from "@/layouts/MainLayout";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItems } from "./adminSidebarItems";
import { userSidebarItems } from "./userSidebarItems";
import { agentSidebarItems } from "./agentSidebarItems";
import Features from "@/pages/Features";
import Homepage from "@/pages/Homepage";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import FAQ from "@/pages/FAQ";
import TermsOfService from "@/pages/TermsOfService";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import CookiePolicy from "@/pages/CookiePolicy";
import Unauthorized from "@/pages/Unauthorized";
import { withAuth } from "@/utils/withAuth";
import { role } from "@/constants/role";
import type { TRole } from "@/types";
import ErrorPage from "@/pages/ErrorPage";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: MainLayout,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
          {
            path: "/",
            Component: Homepage
          },
          {
            path: "features",
            Component: Features
          },
          {
            path: "about",
            Component: About
          },
          {
            path: "contact",
            Component: Contact
          },
          {
            path: "faq",
            Component: FAQ
          },
          {
            path: "terms-of-service",
            Component: TermsOfService
          },
          {
            path: "privacy-policy",
            Component: PrivacyPolicy
          },
          {
            path: "cookie-policy",
            Component: CookiePolicy
          },
        ]
    },
    {
      Component: withAuth(DashboardLayout, role.admin as TRole),
      path: "/admin",
      children: [
        {
          index: true,
          element: <Navigate to="/admin/overview" />
        },
        ...generateRoutes(adminSidebarItems)
      ]
    },
    {
      Component: withAuth(DashboardLayout, role.agent as TRole),
      path: "/agent",
      children: [
        {
          index: true,
          element: <Navigate to="/agent/overview" />
        }, 
        ...generateRoutes(agentSidebarItems)
      ]
    },
    {
      Component: withAuth(DashboardLayout, role.user as TRole),
      path: "/user",
      children: [
        {
          index: true,
          element: <Navigate to="/user/overview"/>
        }, 
        ...generateRoutes(userSidebarItems)
      ]
    },
    {
        path: "/login",
        Component: Login,
    },
    {
        path: "/register",
        Component: Register,
    },
    {
      path: "/unauthorized",
      Component: Unauthorized
    }
]);