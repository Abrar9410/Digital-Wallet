import type { ISidebarItem } from "@/types";
import { lazy } from "react";

const AgentOverview = lazy(() => import("@/pages/agent/AgentOverview"));
const CashIn = lazy(() => import("@/pages/agent/CashIn"));
const CashOut = lazy(() => import("@/pages/agent/CashOut"));
const AgentProfile = lazy(() => import("@/pages/agent/AgentProfile"));
const TransactionHistory = lazy(() => import("@/pages/user/TransactionHistory"));

export const agentSidebarItems: ISidebarItem[] = [
    {
        title: "Welcome",
        items: [
            {
                title: "Overview",
                url: "/agent/overview",
                component: AgentOverview,
            },
        ],
    },
    {
        title: "Transaction",
        items: [
            {
                title: "Cash In",
                url: "/agent/cash-in",
                component: CashIn
            },
            {
                title: "Cash Out",
                url: "/agent/cash-out",
                component: CashOut
            },
            {
                title: "Transaction History",
                url: "/agent/transaction-history",
                component: TransactionHistory
            },
        ]
    },
    {
        title: "",
        items: [
            {
                title: "Profile",
                url: "/agent/profile",
                component: AgentProfile
            }
        ]
    }
];
