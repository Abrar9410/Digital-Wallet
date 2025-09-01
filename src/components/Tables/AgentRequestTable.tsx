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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useApproveAgentRequestMutation, useDenyAgentRequestMutation, useGetAgentRequestsQuery } from "@/redux/features/user/user.api";
import PageLoading from "../PageLoading";
import type { IUser } from "@/types";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import ConfirmationAlert from "../ConfirmationAlert";
import { useState } from "react";


interface IProps {
    searchTerm: string;
    activeStatus: string;
};


export default function AgentRequestTable({ queryParams }: { queryParams: IProps }) {
    const { searchTerm, activeStatus } = queryParams;
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 10;
    let startIndex = (currentPage - 1) * limit;             // skip (in backend)
    let sliceEndIndex = ((currentPage - 1) * limit) + limit;

    const { data, isLoading, isFetching } = useGetAgentRequestsQuery({ searchTerm, activeStatus, limit: 10000 });
    const [approveAgentRequest] = useApproveAgentRequestMutation();
    const [denyAgentRequest] = useDenyAgentRequestMutation();

    const handleApprove = async (id: string) => {
        const toastId = toast.loading("Processing Approval...");
        try {
            const res = await approveAgentRequest(id).unwrap();

            if (res.success) {
                toast.success("Agent Approval Successful!", { id: toastId });
            };
        } catch (error: any) {
            toast.error(error.data.message, { id: toastId });
        }
    };

    const handleDeny = async (id: string) => {
        const toastId = toast.loading("Denying Request...");
        try {
            const res = await denyAgentRequest(id).unwrap();

            if (res.success) {
                toast.success("Request Denied Successfully!", { id: toastId });
            };
        } catch (error: any) {
            toast.error(error.data.message, { id: toastId });
        }
    };

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
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Address</TableHead>
                            <TableHead>Active Status</TableHead>
                            <TableHead>Agent Status</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {data?.data.length > 0 ? (
                            data?.data.slice(startIndex, sliceEndIndex).map((user: IUser) => (
                                <TableRow key={user._id}>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.phone || "N/A"}</TableCell>
                                    <TableCell>{user.address || "N/A"}</TableCell>
                                    <TableCell>
                                        <Badge
                                            className={cn(
                                                "text-white",
                                                { "bg-green-500": user.activeStatus === "ACTIVE" },
                                                { "bg-orange-500": user.activeStatus === "INACTIVE" },
                                                { "bg-red-500": user.activeStatus === "BLOCKED" }
                                            )}
                                        >
                                            {user.activeStatus}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge className="bg-yellow-500 text-white">
                                            {user.agentStatus}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col gap-2">
                                            <ConfirmationAlert
                                                onConfirm={() => handleApprove(user._id!)}
                                                dialogDescription="This User's request to become an Agent will be Approved!"
                                            >
                                                <Button size="sm" className="bg-green-700 hover:bg-green-500 text-white cursor-pointer w-max">
                                                    Approve
                                                </Button>
                                            </ConfirmationAlert>
                                            <ConfirmationAlert
                                                onConfirm={() => handleDeny(user._id!)}
                                                dialogDescription="This User's request to become an Agent will be Denied!"
                                            >
                                                <Button size="sm" className="cursor-pointer bg-red-700 hover:bg-red-500 text-white w-max">
                                                    Deny
                                                </Button>
                                            </ConfirmationAlert>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7} className="text-center">
                                    No records found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {data?.data.length > 0 && (
                <div className="mt-4">
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
                            {Array.from({ length: Math.ceil(data?.data.length / limit) }, (_, index) => index + 1).map(
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
                                        currentPage === Math.ceil(data?.data.length / limit)
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
}
