import { lazy } from "react";
import type { ISidebarItem } from "@/types";

const AdminOverview = lazy(() => import("@/pages/admin/AdminOverview"));
const ManageAgents = lazy(() => import("@/pages/admin/ManageAgents"));
const ManageUsers = lazy(() => import("@/pages/admin/ManageUsers"));
const Transactions = lazy(() => import("@/pages/admin/Transactions"));
const AdminProfile = lazy(() => import("@/pages/admin/AdminProfile"));


export const adminSidebarItems: ISidebarItem[] = [
  {
    title: "Welcome",
    items: [
      {
        title: "Overview",
        url: "/admin/overview",
        component: AdminOverview,
      },
      {
        title: "Transactions",
        url: "/admin/transactions",
        component: Transactions,
      }
    ],
  },
  {
    title: "Management",
    items: [
      {
        title: "Manage Agents",
        url: "/admin/manage-agents",
        component: ManageAgents,
      },
      {
        title: "Manage Users",
        url: "/admin/manage-users",
        component: ManageUsers,
      },
      {
        title: "Admin Profile",
        url: "/admin/admin-profile",
        component: AdminProfile,
      },
    ],
  },
];
