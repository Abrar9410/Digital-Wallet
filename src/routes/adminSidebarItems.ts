import AdminOverview from "@/pages/admin/AdminOverview";
import ManageAgents from "@/pages/admin/ManageAgents";
import ManageUsers from "@/pages/admin/ManageUsers";
import Transactions from "@/pages/admin/Transactions";
import Profile from "@/pages/user/Profile";
import type { ISidebarItem } from "@/types";




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
        component: Profile,
      },
    ],
  },
];
