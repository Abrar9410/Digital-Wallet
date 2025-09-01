import { type ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { IUser } from "@/types";
import { cn } from "@/lib/utils";



// Columns for Current Agents
export const agentColumns: ColumnDef<IUser>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "phone",
        header: "Phone",
    },
    {
        accessorKey: "address",
        header: "Address",
    },
    {
        accessorKey: "activeStatus",
        header: "Active Status",
        cell: ({ row }) => {
            const status = row.getValue("activeStatus") as string;
            return (
                <Badge
                    className={
                        status === "ACTIVE"
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                    }
                >
                    {status}
                </Badge>
            );
        },
    },
    {
        accessorKey: "agentStatus",
        header: "Agent Status",
        cell: ({ row }) => {
            const status = row.getValue("agentStatus") as string;
            return (
                <Badge
                    className={cn(
                        "text-white", { "bg-green-500": status === "APPROVED", "bg-red-500": status === "SUSPENDED" }
                    )}
                >
                    {status}
                </Badge>
            );
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: () => (
            <div className="flex gap-2">
                <Button size="sm" variant="outline">
                    Suspend
                </Button>
                <Button size="sm" variant="destructive">
                    Block
                </Button>
                <Button size="sm" variant="destructive">
                    Delete
                </Button>
            </div>
        ),
    },
];

// Columns for Agent Requests
export const requestColumns: ColumnDef<IUser>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "phone",
        header: "Phone",
    },
    {
        accessorKey: "address",
        header: "Address",
    },
    {
        accessorKey: "activeStatus",
        header: "Active Status",
        cell: ({ row }) => {
            const status = row.getValue("activeStatus") as string;
            return (
                <Badge
                    className={
                        status === "ACTIVE"
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                    }
                >
                    {status}
                </Badge>
            );
        },
    },
    {
        accessorKey: "agentStatus",
        header: "Agent Status",
        cell: ({ row }) => {
            const status = row.getValue("agentStatus") as string;
            return <Badge className="bg-yellow-500 text-white">{status}</Badge>;
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: () => (
            <div className="flex gap-2">
                <Button size="sm" variant="default">
                    Approve
                </Button>
                <Button size="sm" variant="destructive">
                    Deny
                </Button>
            </div>
        ),
    },
];
