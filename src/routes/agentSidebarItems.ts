import AgentOverview from "@/pages/agent/AgentOverview";
import CashIn from "@/pages/agent/CashIn";
import CashOut from "@/pages/agent/CashOut";
import Profile from "@/pages/user/Profile";
import TransactionHistory from "@/pages/user/TransactionHistory";
import type { ISidebarItem } from "@/types";

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
                component: Profile
            }
        ]
    }
];
