/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import PageLoading from "../PageLoading";
import { useState } from "react";
import { useGetMyTransactionsQuery } from "@/redux/features/transaction/transaction.api";
import type { ITransaction } from "@/types";


interface IProps {
    searchTerm: string;
    filterValue: string;
    sort: string;
};

export default function TransactionHistoryTable({ queryParams }: { queryParams: IProps }) {
    const { searchTerm, filterValue, sort } = queryParams;
    const [currentPage, setCurrentPage] = useState(1);
    // const limit = 10;
    // let startIndex = (currentPage - 1) * limit;             // skip (in backend)
    // let sliceEndIndex = ((currentPage - 1) * limit) + limit;

    const { data, isLoading, isFetching } = useGetMyTransactionsQuery({ searchTerm, type: filterValue, page: currentPage, sort, });
    
    const totalPage = data?.meta?.totalPage || 1;

    if (isLoading || isFetching) {
        return <PageLoading />;
    };

    return (
        <div className="space-y-4">

            {/* Table */}
            <div className="overflow-x-auto">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>From</TableHead>
                            <TableHead>To</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Amount (BDT)</TableHead>
                            <TableHead>Date-Time</TableHead>
                            <TableHead>Transaction ID</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {data?.data.length > 0 ? (
                            data?.data.map((transaction: ITransaction) => (
                                <TableRow key={transaction._id}>
                                    <TableCell>{transaction.from}</TableCell>
                                    <TableCell>{transaction.to}</TableCell>
                                    <TableCell>{transaction.type}</TableCell>
                                    <TableCell>{transaction.amount}</TableCell>
                                    <TableCell>{transaction.createdAt}</TableCell>
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

            {totalPage > 0 && (
                <div className="mt-10">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() => setCurrentPage((prev) => prev - 1)}
                                    className={
                                        currentPage === 1
                                            ? "pointer-events-none opacity-50"
                                            : "cursor-pointer"
                                    }
                                />
                            </PaginationItem>
                            {Array.from({ length: totalPage }, (_, index) => index + 1).map(
                                (page) => (
                                    <PaginationItem
                                        key={page}
                                        onClick={() => setCurrentPage(page)}
                                        className="cursor-pointer"
                                    >
                                        <PaginationLink isActive={currentPage === page}>
                                            {page}
                                        </PaginationLink>
                                    </PaginationItem>
                                )
                            )}
                            <PaginationItem>
                                <PaginationNext
                                    onClick={() => setCurrentPage((prev) => prev + 1)}
                                    className={
                                        currentPage === totalPage
                                            ? "pointer-events-none opacity-50"
                                            : "cursor-pointer"
                                    }
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            )}
        </div>
    );
};