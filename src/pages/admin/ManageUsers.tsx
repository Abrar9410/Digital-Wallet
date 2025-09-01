import UserTable from "@/components/Tables/UserTable";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";


const ManageUsers = () => {

    const [filterValue, setFilterValue] = useState("");

    const [searchTerm, setSearchTerm] = useState("");
    const [agentStatus, setAgentStatus] = useState("");
    const [activeStatus, setActiveStatus] = useState("");

    const handleSelectValueChange = (val: string) => {
        setFilterValue(val);

        if (val === "none") {
            setFilterValue("");
            setActiveStatus("");
            setAgentStatus("");
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

    return (
        <div className="p-4 sm:p-6">
            <h1 className="text-center text-2xl font-bold mb-10">Manage Users</h1>
            {/* Search Input */}
            <div className="flex justify-center gap-2 mb-10">
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
                            <SelectItem onClick={() => { setActiveStatus(""); setAgentStatus(""); }} value="none">filter (none)</SelectItem>
                            <SelectItem onClick={() => { setActiveStatus("ACTIVE"); setAgentStatus(""); }} value="ACTIVE">Active</SelectItem>
                            <SelectItem onClick={() => { setActiveStatus("INACTIVE"); setAgentStatus(""); }} value="INACTIVE">Inactive</SelectItem>
                            <SelectItem onClick={() => { setActiveStatus("BLOCKED"); setAgentStatus(""); }} value="BLOCKED">Blocked</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <UserTable queryParams={{searchTerm, activeStatus, agentStatus}} />
        </div>
    );
};

export default ManageUsers;