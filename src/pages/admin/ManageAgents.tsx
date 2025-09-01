import AgentRequestTable from "@/components/Tables/AgentRequestTable";
import AgentTable from "@/components/Tables/AgentTable";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";




const ManageAgents = () => {

    const [agentRequestsTab, setAgentRequestsTab] = useState(false);
    const [filterValue, setFilterValue] = useState("");
    const [sort, setSort] = useState("");

    const [searchTerm, setSearchTerm] = useState("");
    const [agentStatus, setAgentStatus] = useState("");
    const [activeStatus, setActiveStatus] = useState("");

    const handleSelectValueChange = (val: string) => {
        setFilterValue(val);

        if (val === "none") {
            setFilterValue("");
            setActiveStatus("");
            setAgentStatus("");
        } else if (val === "APPROVED") {
            setAgentStatus("APPROVED");
            setActiveStatus("");
        } else if (val === "SUSPENDED") {
            setAgentStatus("SUSPENDED");
            setActiveStatus("");
        } else if (val === "ACTIVE") {
            setActiveStatus("ACTIVE");
            setAgentStatus("");
        } else if (val === "INACTIVE") {
            setActiveStatus("INACTIVE");
            setAgentStatus("");
        } else if (val === "BLOCKED") {
            setActiveStatus("BLOCKED");
            setAgentStatus("");
        }
    };

    const handleSortValueChange = (val: string) => {
        if (val === "none") {
            setSort("");
        } else {
            setSort(val);
        }
    };

    return (
        <div className="p-4 sm:p-6">
            <h1 className="text-center text-2xl font-bold mb-10">Manage Agents</h1>
            {/* Search Input */}
            <div className="flex max-[700px]:flex-col justify-center items-center gap-2 mb-6">
                <Input
                    placeholder="Search by name, email or address"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-xs"
                />
                <Select value={filterValue} onValueChange={(val) => handleSelectValueChange(val)}>
                    <SelectTrigger className="w-[130px] cursor-pointer">
                        <SelectValue placeholder="filter" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup className="*:cursor-pointer">
                            <SelectItem value="none">none</SelectItem>
                            {!agentRequestsTab && (
                                <>
                                    <SelectItem value="APPROVED">Approved</SelectItem>
                                    <SelectItem value="SUSPENDED">Suspended</SelectItem>
                                </>
                            )}
                            <SelectItem value="ACTIVE">Active</SelectItem>
                            <SelectItem value="INACTIVE">Inactive</SelectItem>
                            <SelectItem value="BLOCKED">Blocked</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Select value={sort} onValueChange={(val) => handleSortValueChange(val)}>
                    <SelectTrigger className="w-[130px] cursor-pointer">
                        <SelectValue placeholder="sort" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup className="*:cursor-pointer">
                            <SelectItem value="none">none</SelectItem>
                            <SelectItem value="name">Name (A-Z)</SelectItem>
                            <SelectItem value="-name">Name (Z-A)</SelectItem>
                            <SelectItem value="email">Email (A-Z)</SelectItem>
                            <SelectItem value="-email">Email (Z-A)</SelectItem>
                            <SelectItem value="createdAt">Date (0-9)</SelectItem>
                            <SelectItem value="-createdAt">Date (9-0)</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <Tabs defaultValue="agents">
                <TabsList className="mb-6">
                    <TabsTrigger onClick={() => setAgentRequestsTab(false)} value="agents" className="cursor-pointer">Agents</TabsTrigger>
                    <TabsTrigger onClick={() => setAgentRequestsTab(true)} value="agent-requests" className="cursor-pointer">Agent Requests</TabsTrigger>
                </TabsList>

                <TabsContent value="agents">
                    <AgentTable queryParams={{searchTerm, activeStatus, agentStatus, sort}} />
                </TabsContent>

                <TabsContent value="agent-requests">
                    <AgentRequestTable queryParams={{ searchTerm, activeStatus, sort }} />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default ManageAgents;