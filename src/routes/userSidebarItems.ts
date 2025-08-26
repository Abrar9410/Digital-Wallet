import Profile from "@/pages/user/Profile";
import SendMoney from "@/pages/user/SendMoney";
import TopUp from "@/pages/user/TopUp";
import TransactionHistory from "@/pages/user/TransactionHistory";
import UserOverview from "@/pages/user/UserOverview";
import type { ISidebarItem } from "@/types";

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
