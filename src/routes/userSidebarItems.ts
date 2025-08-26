import type { ISidebarItem } from "@/types";
import { lazy } from "react";

const Profile = lazy(() => import("@/pages/user/Profile"));
const SendMoney = lazy(() => import("@/pages/user/SendMoney"));
const TopUp = lazy(() => import("@/pages/user/TopUp"));
const TransactionHistory = lazy(() => import("@/pages/user/TransactionHistory"));
const UserOverview = lazy(() => import("@/pages/user/UserOverview"));

export const userSidebarItems: ISidebarItem[] = [
  {
    title: "Welcome",
    items: [
      {
        title: "Overview",
        url: "/user/overview",
        component: UserOverview,
      },
    ],
  },
  {
    title: "Transaction",
    items: [
      {
        title: "Deposit Money",
        url: "/user/top-up",
        component: TopUp
      },
      {
        title: "Send Money",
        url: "/user/send-money",
        component: SendMoney
      },
      {
        title: "Transaction History",
        url: "/user/transaction-history",
        component: TransactionHistory
      },
    ]
  },
  {
    title: "",
    items: [
      {
        title: "Profile",
        url: "/user/profile",
        component: Profile
      }
    ]
  }
];
