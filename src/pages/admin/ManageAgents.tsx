import AgentRequestTable from "@/components/Tables/AgentRequestTable";
import AgentTable from "@/components/Tables/AgentTable";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";




const ManageAgents = () => {

    const [agentRequestsTab, setAgentRequestsTab] = useState(false);

    const [searchTerm, setSearchTerm] = useState("");
    const [agentStatus, setAgentStatus] = useState("");
    const [activeStatus, setActiveStatus] = useState("");

    return (
        <div className="p-4 sm:p-6">
            <h1 className="text-center text-2xl font-bold mb-10">Manage Agents</h1>
            {/* Search Input */}
            <div className="flex justify-center gap-2 mb-6">
                <Input
                    placeholder="Search by name, email or address"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-xs"
                />
                <Select>
                    <SelectTrigger className="w-[130px] cursor-pointer">
                        <SelectValue placeholder="filter" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup className="*:cursor-pointer">
                            <SelectItem onClick={() => {setActiveStatus("");setAgentStatus("");}} value="none">filter (none)</SelectItem>
                            {
                                !agentRequestsTab &&
                                <>
                                <SelectItem onClick={() => { setAgentStatus("APPROVED"); setActiveStatus(""); }} value="APPROVED">Approved</SelectItem>
                                <SelectItem onClick={() => { setAgentStatus("SUSPENDED"); setActiveStatus(""); }} value="SUSPENDED">Suspended</SelectItem>
                                </>
                            }
                            <SelectItem onClick={() => { setActiveStatus("ACTIVE"); setAgentStatus(""); }} value="ACTIVE">Active</SelectItem>
                            <SelectItem onClick={() => { setActiveStatus("INACTIVE"); setAgentStatus(""); }} value="INACTIVE">Inactive</SelectItem>
                            <SelectItem onClick={() => { setActiveStatus("BLOCKED"); setAgentStatus(""); }} value="BLOCKED">Blocked</SelectItem>
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
                    <AgentTable queryParams={{searchTerm, activeStatus, agentStatus}} />
                </TabsContent>

                <TabsContent value="agent-requests">
                    <AgentRequestTable queryParams={{ searchTerm, activeStatus }} />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default ManageAgents;