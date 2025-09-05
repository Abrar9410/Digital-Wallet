import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Plus, Send, Wallet, BanknoteArrowDown, Flame } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetMyWalletQuery } from "@/redux/features/wallet/wallet.api";
import { useGetMyTransactionsQuery } from "@/redux/features/transaction/transaction.api";
import dayjs from "dayjs";
import type { ITransaction } from "@/types";
import { Link } from "react-router";
import PageLoading from "@/components/PageLoading";



const UserOverview = () => {
    const { data: walletData, isLoading: wLoading, isFetching: wFetching } = useGetMyWalletQuery(undefined);
    const { data: recentTransactionsData, isLoading: tLoading, isFetching: tFetching } = useGetMyTransactionsQuery({ limit: 5 });

    if (wLoading || wFetching || tLoading || tFetching) {
        return <PageLoading />;
    };

    return (
        <div className="p-4 sm:p-6">
            <div className="flex max-[875px]:flex-col justify-between items-center gap-6 my-10">
                {/* Wallet Balance */}
                <Card className="w-full sm:w-1/2 md:w-1/3 xl:w-1/4 2xl:w-1/5 bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Wallet className="w-5 h-5" />
                            Wallet Balance
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold mb-2">
                            ৳ {walletData?.data?.balance.toFixed(2) || "0.00"}
                        </p>
                        {/* <p className="text-sm text-blue-100">Available to spend</p> */}
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex justify-center items-center gap-2">
                            <Flame className="w-5 h-5" />
                            Quick Actions
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center gap-3 flex-wrap">
                        <Link to="/user/deposit-money">
                            <Button className="cursor-pointer flex items-center gap-2 bg-green-500 hover:bg-green-700 text-white">
                                <Plus className="w-4 h-4" /> Deposit Money
                            </Button>
                        </Link>
                        <Link to="/user/withdraw-money">
                            <Button className="cursor-pointer flex items-center gap-2 bg-red-500 hover:bg-red-700 text-white">
                                <BanknoteArrowDown className="w-4 h-4" /> Withdraw Money
                            </Button>
                        </Link>
                        <Link to="/user/send-money">
                            <Button className="cursor-pointer flex items-center gap-2 bg-purple-500 hover:bg-purple-700 text-white">
                                <Send className="w-4 h-4" /> Send Money
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Transactions */}
            <Card>
                <CardHeader>
                    <CardTitle>Recent Transactions</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Type</TableHead>
                                    <TableHead>From</TableHead>
                                    <TableHead>To</TableHead>
                                    <TableHead>Amount (BDT)</TableHead>
                                    <TableHead>Date-Time</TableHead>
                                    <TableHead>Transaction ID</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {recentTransactionsData?.data.length > 0 ? (
                                    recentTransactionsData?.data.map((transaction: ITransaction) => (
                                        <TableRow key={transaction._id}>
                                            <TableCell>{transaction.type}</TableCell>
                                            <TableCell>{transaction.from}</TableCell>
                                            <TableCell>{transaction.to}</TableCell>
                                            <TableCell>{transaction.amount}</TableCell>
                                            <TableCell>{dayjs(transaction.createdAt).format("DD MMM YYYY HH:mm")}</TableCell>
                                            <TableCell>{transaction.transactionId}</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center">
                                            No records found
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
            <Link to="/user/transaction-history">
                <Button className="mt-4 cursor-pointer flex items-center gap-2 bg-yellow-600 hover:bg-yellow-500 text-white">
                    <Clock className="w-4 h-4" /> See Full History
                </Button>
            </Link>
        </div>
    );
}


export default UserOverview;