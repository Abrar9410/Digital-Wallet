import DashboardLayout from "@/layouts/DashboardLayout";
import MainLayout from "@/layouts/MainLayout";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter } from "react-router";
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

export const router = createBrowserRouter([
    {
        path: "/",
        Component: MainLayout,
        children: [
          {
            index: true,
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
      Component: DashboardLayout,
      path: "/admin",
      children: [...generateRoutes(adminSidebarItems)]
    },
    {
      Component: DashboardLayout,
      path: "/agent",
      children: [...generateRoutes(agentSidebarItems)]
    },
    {
      Component: DashboardLayout,
      path: "/user",
      children: [...generateRoutes(userSidebarItems)]
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