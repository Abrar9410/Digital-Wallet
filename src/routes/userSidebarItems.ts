import type { ISidebarItem } from "@/types";
import { lazy } from "react";

const UserOverview = lazy(() => import("@/pages/user/UserOverview"));
const SendMoney = lazy(() => import("@/pages/user/SendMoney"));
const DepositMoney = lazy(() => import("@/pages/user/DepositMoney"));
const TransactionHistory = lazy(() => import("@/pages/user/TransactionHistory"));
const WithdrawMoney = lazy(() => import("@/pages/user/WithdrawMoney"));
const UserProfile = lazy(() => import("@/pages/user/UserProfile"));

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
        component: DepositMoney
      },
      {
        title: "Withdraw Money",
        url: "/user/withdraw-money",
        component: WithdrawMoney
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
        component: UserProfile
      }
    ]
  }
];
