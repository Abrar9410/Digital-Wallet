import { useState, useMemo } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
    Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    ComposedChart
} from "recharts";
import { useGetAgentsQuery, useGetUsersQuery } from "@/redux/features/user/user.api";
import { useGetAllTransactionsQuery } from "@/redux/features/transaction/transaction.api";
import type { ITransaction, IUser } from "@/types";
import dayjs from "dayjs";
import PageLoading from "../PageLoading";



const donutColors = ["#3b82f6", "#f97316"];


export default function OverviewChart() {
    const { data: usersData, isLoading: loadingUsers, isFetching: fetchingUsers } = useGetUsersQuery({});
    const { data: agentsData, isLoading: loadingAgents, isFetching: fetchingAgents } = useGetAgentsQuery({});
    const { data: transactionsData, isLoading: loadingTxs, isFetching: fetchingTxs } = useGetAllTransactionsQuery({});

    const [range, setRange] = useState("7d");

    // Filter function to group by date
    const chartData = useMemo(() => {
        if (!usersData?.data || !transactionsData?.data) {
            return [];
        };

        const days = range === "7d" ? 7 : range === "1m" ? 30 : 90;
        const today = dayjs();

        // Initialize date buckets
        const dataMap: Record<string, { date: string; users: number; volume: number }> = {};
        for (let i = days - 1; i >= 0; i--) {
            const date = today.subtract(i, "day").format("YYYY-MM-DD");
            dataMap[date] = { date, users: 0, volume: 0 };
        }

        // Count users
        usersData?.data.forEach((user: IUser) => {
            const date = dayjs(user.createdAt).format("YYYY-MM-DD");
            if (dataMap[date]) {
                dataMap[date].users++;
            };
        });

        // Sum transactions
        transactionsData?.data.forEach((tx: ITransaction) => {
            const date = dayjs(tx.createdAt).format("YYYY-MM-DD");
            if (dataMap[date]) {
                dataMap[date].volume += tx.amount;
            };
        });

        return Object.values(dataMap);
    }, [usersData, transactionsData, range]);

    const pieData = useMemo(() => {
        if (!usersData || !agentsData) return [];
        return [
            { name: "Users", value: usersData.data.length },
            { name: "Agents", value: agentsData.data.length },
        ];
    }, [usersData, agentsData]);

    if (loadingUsers || fetchingUsers || loadingAgents || fetchingAgents || loadingTxs || fetchingTxs) {
        return <PageLoading />;
    };

    return (
        <div className="bg-muted rounded-lg shadow-md max-sm:p-1 p-4">
            <Tabs defaultValue="7d" onValueChange={setRange}>
                <TabsList className="mb-4 *:cursor-pointer">
                    <TabsTrigger value="7d">Last 7 Days</TabsTrigger>
                    <TabsTrigger value="1m">Last Month</TabsTrigger>
                    <TabsTrigger value="3m">Last 3 Months</TabsTrigger>
                </TabsList>

                <TabsContent value={range}>
                    <ResponsiveContainer width="100%" height={300}>
                        <ComposedChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                            <XAxis dataKey="date" stroke="var(--foreground)" />
                            <YAxis stroke="var(--foreground)" />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: "var(--accent)",
                                    color: "var(--accent-foreground)",
                                }}
                            />
                            <Legend />
                            <Bar
                                dataKey="volume"
                                name="Transaction Volume (৳)"
                                fill="var(--muted-foreground)"
                                radius={[4, 4, 0, 0]}
                            />
                            <Line
                                type="monotone"
                                dataKey="users"
                                stroke="var(--primary)"
                                strokeWidth={2}
                                dot={{ r: 2 }}
                                name="New Users"
                            />
                        </ComposedChart>
                    </ResponsiveContainer>
                </TabsContent>
            </Tabs>

            <div className="flex max-[400px]:flex-col-reverse justify-center items-center gap-2 sm:gap-4 mt-6">
                <ResponsiveContainer width={200} height={300}>
                    <PieChart>
                        <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            innerRadius={70}
                            outerRadius={100}
                            paddingAngle={5}
                            dataKey="value"
                            nameKey="name"
                        >
                            {pieData.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={donutColors[index % donutColors.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
                <div>
                    <div className="bg-[#3b82f6] px-4 py-2">
                        Users: {((usersData?.data.length / usersData.meta.total) * 100).toFixed(2)}%
                    </div>
                    <div className="bg-[#f97316] px-4 py-2">
                        Agents: {((agentsData?.data.length / agentsData.meta.total) * 100).toFixed(2)}%
                    </div>
                </div>
            </div>
        </div>
    );
}
