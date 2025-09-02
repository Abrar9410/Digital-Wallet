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
import type { IUser } from "@/types";
import { useApproveAgentRequestMutation, useBlockUserMutation, useDeleteUserMutation, useGetUsersQuery, useUnblockUserMutation } from "@/redux/features/user/user.api";
import PageLoading from "../PageLoading";
import { cn } from "@/lib/utils";
import ConfirmationAlert from "../ConfirmationAlert";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";


interface IProps {
    searchTerm: string;
    activeStatus: string;
    agentStatus: string;
    sort: string;
};

export default function UserTable({ queryParams }: { queryParams: IProps }) {
    const { searchTerm, agentStatus, activeStatus, sort } = queryParams;
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 10;
    let startIndex = (currentPage - 1) * limit;             // skip (in backend)
    let sliceEndIndex = ((currentPage - 1) * limit) + limit;

    const { data, isLoading, isFetching } = useGetUsersQuery({ searchTerm, agentStatus, activeStatus, sort, limit: 10000 });
    
    const [blockUser] = useBlockUserMutation();
    const [unblockUser] = useUnblockUserMutation();
    const [deleteUser] = useDeleteUserMutation();
    const [approveAgent] = useApproveAgentRequestMutation()

    const handleBlock = async (id: string) => {
        const toastId = toast.loading("Blocking User...");
        try {
            const res = await blockUser(id).unwrap();

            if (res.success) {
                toast.success("User Blocked Successfully!", { id: toastId });
            } else {
                toast.error(res.message, { id: toastId });
            }
        } catch (error: any) {
            toast.error(error.data.message, { id: toastId });
        }
    };

    const handleUnblock = async (id: string) => {
        const toastId = toast.loading("Unblocking User...");
        try {
            const res = await unblockUser(id).unwrap();

            if (res.success) {
                toast.success("User Account Activated Successfully!", { id: toastId });
            } else {
                toast.error(res.message, { id: toastId });
            }
        } catch (error: any) {
            toast.error(error.data.message, { id: toastId });
        }
    };

    const handleDelete = async (id: string) => {
        const toastId = toast.loading("Deleting User...");
        try {
            const res = await deleteUser(id).unwrap();

            if (res.success) {
                toast.success("User Deleted Successfully!", { id: toastId });
            } else {
                toast.error(res.message, { id: toastId });
            }
        } catch (error: any) {
            toast.error(error.data.message, { id: toastId });
        }
    };

    const handleApprove = async (id: string) => {
        const toastId = toast.loading("Processing Approval...");
        try {
            const res = await approveAgent(id).unwrap();

            if (res.success) {
                toast.success("Agent Approval Successful!", { id: toastId });
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
                            data?.data.slice(startIndex, sliceEndIndex).filter((user: IUser) => !user.isDeleted).map((user: IUser) => (
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
                                        <Badge
                                            className={cn(
                                                "text-white",
                                                { "bg-gray-500": user.agentStatus === "N/A" },
                                                { "bg-yellow-500": user.agentStatus === "REQUESTED" }
                                            )}
                                        >
                                            {user.agentStatus}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col gap-3">
                                            {
                                                user.agentStatus === "REQUESTED" &&
                                                    <ConfirmationAlert
                                                        onConfirm={() => handleApprove(user._id!)}
                                                        dialogDescription="Suspension will be lifted and this Agent can work normally."
                                                    >
                                                        <Button size="sm" disabled={user.activeStatus === "BLOCKED" || user.activeStatus === "INACTIVE"} className="disabled:bg-gray-500 disabled:cursor-not-allowed cursor-pointer bg-green-500 hover:bg-white text-white hover:text-green-500 w-max h-max">
                                                            Approve
                                                        </Button>
                                                    </ConfirmationAlert>
                                            }
                                            {
                                                user.activeStatus === "ACTIVE" ?
                                                    <ConfirmationAlert
                                                        onConfirm={() => handleBlock(user._id!)}
                                                        dialogDescription="This User will be Blocked and no longer use this account until you Unblock!"
                                                    >
                                                        <Button size="sm" className="cursor-pointer bg-red-500 hover:bg-white text-white hover:text-red-500 w-max h-max">
                                                            Block
                                                        </Button>
                                                    </ConfirmationAlert> :
                                                    <ConfirmationAlert
                                                        onConfirm={() => handleUnblock(user._id!)}
                                                        dialogDescription="This User will be Unblocked and can use this account normally."
                                                    >
                                                        <Button size="sm" className="cursor-pointer bg-green-500 hover:bg-white text-white hover:text-green-500 w-max h-max">
                                                            Unblock
                                                        </Button>
                                                    </ConfirmationAlert>
                                            }
                                            <ConfirmationAlert
                                                onConfirm={() => handleDelete(user._id!)}
                                                dialogDescription="This User will be Deleted permanently!"
                                            >
                                                <Trash2 className="cursor-pointer text-red-500 hover:scale-110" />
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