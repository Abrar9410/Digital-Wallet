import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useGetAllTransactionsQuery } from "@/redux/features/transaction/transaction.api";
import { useGetAgentsQuery, useGetUsersQuery } from "@/redux/features/user/user.api";
import type { ITransaction } from "@/types";
import PageLoading from "../PageLoading";

export default function AdminOverviewStats() {
    const { data: usersData, isLoading: usersLoading, isFetching: usersFetching } = useGetUsersQuery({});
    const { data: agentsData, isLoading: agentsLoading, isFetching: agentsFetching } = useGetAgentsQuery({});
    const { data: transactionsData, isLoading: transactionsLoading, isFetching: transactionsFetching } = useGetAllTransactionsQuery({});

    const totalUsers = usersData?.data.length || 0;
    const totalAgents = agentsData?.data.length || 0;
    const totalTransactions = transactionsData?.meta.total || 0;
    const totalVolume = transactionsData?.data.reduce((sum: number, tx: ITransaction) => sum + tx.amount, 0) || 0;

    const stats = [
        { title: "Total Users", value: totalUsers },
        { title: "Total Agents", value: totalAgents },
        { title: "Transactions", value: totalTransactions },
        { title: "Volume", value: `$${totalVolume.toFixed(2)}` },
    ];

    if (usersLoading || usersFetching || agentsLoading || agentsFetching || transactionsLoading || transactionsFetching) {
        return <PageLoading/>;
    };

    return (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
                <Card
                    key={stat.title}
                    className={cn(
                        "shadow-md",
                        {"bg-blue-400 dark:bg-blue-600": stat.title === "Total Users"},
                        {"bg-orange-400 dark:bg-orange-500": stat.title === "Total Agents"},
                        {"bg-green-400 dark:bg-green-500": stat.title === "Transactions"},
                        {"bg-muted": stat.title === "Volume"},
                    )}
                >
                    <CardHeader>
                        <CardTitle className="text-sm">{stat.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-2xl font-bold">
                        {stat.value}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
