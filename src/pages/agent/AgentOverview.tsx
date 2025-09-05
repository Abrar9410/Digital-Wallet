/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Wallet, Calculator, HardDriveDownload, HardDriveUpload, Zap, Wand } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useGetMyWalletQuery, useRechargeMutation } from "@/redux/features/wallet/wallet.api";
import { useGetMyTransactionsQuery } from "@/redux/features/transaction/transaction.api";
import dayjs from "dayjs";
import type { ITransaction } from "@/types";
import { Link } from "react-router";
import PageLoading from "@/components/PageLoading";
import { useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";



const AgentOverview = () => {
    const { data: walletData, isLoading: wLoading, isFetching: wFetching } = useGetMyWalletQuery(undefined);
    const { data: transactionsData, isLoading: tLoading, isFetching: tFetching } = useGetMyTransactionsQuery({});
    const [recharge] = useRechargeMutation();
    const recentTransactions = transactionsData?.data?.map((tx: ITransaction, i: number) => {
        if (i < 5) {
            return tx;
        };
    });

    const [amount, setAmount] = useState("");

    const handleRecharge = async () => {
        const toastId = toast.loading("Processing! Please Wait...", { position: "top-center" });
        const info = { amount: Number(amount) };
        try {
            const res = await recharge(info).unwrap();

            if (res.success) {
                toast.success(res.message, { id: toastId, position: "top-center" });
                setAmount("");
            } else {
                toast.error(res.message, { id: toastId, position: "top-center" });
            }
        } catch (error: any) {
            toast.error(error.data.message, { id: toastId, position: "top-center" });
        }
    }

    if (wLoading || wFetching || tLoading || tFetching) {
        return <PageLoading />;
    };

    return (
        <div className="p-4 sm:p-6">
            <div className="flex max-[450px]:flex-col justify-center items-center gap-6 my-10 flex-wrap">
                {/* Wallet Balance */}
                <Card className="flex-auto min-w-[190px] bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex justify-center">
                            <p className="flex items-center gap-2">
                                <Wallet className="w-5 h-5" />
                                Wallet Balance
                            </p>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold text-center">
                            ৳ {walletData?.data?.balance.toFixed(2) || "0.00"}
                        </p>
                        {/* <p className="text-sm text-blue-100">Available to spend</p> */}
                    </CardContent>
                </Card>

                {/* Summary */}
                <Card className="flex-auto bg-amber-800 text-white shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex justify-center items-center gap-2">
                            <Calculator className="w-5 h-5" />
                            Transaction Summary
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="max-[340px]:text-xl text-2xl font-bold">
                        <div className="grid grid-cols-2 gap-2">
                            <p className="text-right">Cash In:</p>
                            <p>
                                ৳ {transactionsData?.data?.filter((tx: ITransaction) => tx.type === "CASH_IN").reduce((sum: number, txn: ITransaction) => sum + txn.amount, 0).toFixed(2) || "0.00"}
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <p className="text-right">Cash Out:</p>
                            <p>
                                ৳ {transactionsData?.data?.filter((tx: ITransaction) => tx.type === "CASH_OUT").reduce((sum: number, txn: ITransaction) => sum + txn.amount, 0).toFixed(2) || "0.00"}
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="flex justify-center items-center gap-2">
                            <Wand className="w-5 h-5" />
                            Quick Actions
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex justify-center items-center gap-3 flex-wrap">
                        <Link to="/agent/cash-in">
                            <Button className="cursor-pointer flex items-center gap-2 bg-green-500 hover:bg-green-700 text-white">
                                <HardDriveDownload className="w-4 h-4" /> Cash In
                            </Button>
                        </Link>
                        <Link to="/agent/cash-out">
                            <Button className="cursor-pointer flex items-center gap-2 bg-red-500 hover:bg-red-700 text-white">
                                <HardDriveUpload className="w-4 h-4" /> Cash Out
                            </Button>
                        </Link>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="cursor-pointer flex items-center gap-2 bg-orange-500 hover:bg-orange-700 text-white">
                                    <Zap className="w-4 h-4" /> Recharge
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-md flex flex-col">
                                <DialogHeader>
                                    <DialogTitle>Enter Recharge Amount</DialogTitle>
                                    <DialogDescription className="sr-only">
                                        Enter an amount to Recharge.
                                    </DialogDescription>
                                </DialogHeader>

                                {/* Search Input */}
                                <Input
                                    placeholder="Enter Amount"
                                    type="number"
                                    min={0}
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="mb-3"
                                />

                                <DialogFooter className="flex justify-end">
                                    <DialogClose asChild>
                                        <Button
                                            disabled={Number(amount) <= 0 || !amount}
                                            onClick={handleRecharge}
                                            className="text-white cursor-pointer disabled:bg-gray-500 disabled:pointer-events-none"
                                        >
                                            Confirm
                                        </Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
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
                                {recentTransactions.length > 0 ? (
                                    recentTransactions.map((transaction: ITransaction) => (
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
            <Link to="/agent/transaction-history">
                <Button className="mt-4 cursor-pointer flex items-center gap-2 bg-yellow-600 hover:bg-yellow-500 text-white">
                    <Clock className="w-4 h-4" /> See Full History
                </Button>
            </Link>
        </div>
    );
}


export default AgentOverview;