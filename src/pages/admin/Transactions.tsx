import TransactionTable from "@/components/Tables/TransactionTable";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";


const Transactions = () => {

    const [filterValue, setFilterValue] = useState("");
    const [sort, setSort] = useState("");
    const [sortValue, setSortValue] = useState("-createdAt");

    const [searchTerm, setSearchTerm] = useState("");
    

    const handleSelectValueChange = (val: string) => {
        if (val === "none") {
            setFilterValue("");
        } else {
            setFilterValue(val);
        }
    };

    const handleSortValueChange = (val: string) => {
        if (val === "none") {
            setSort("");
            setSortValue("-createdAt");
        } else {
            setSort(val);
            setSortValue(val);
        }
    };

    return (
        <div className="p-4 sm:p-6">
            <h1 className="text-center text-2xl font-bold mb-10">Transactions</h1>
            {/* Search Input */}
            <div className="flex max-[700px]:flex-col justify-center items-center gap-2 mb-10">
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
                            <SelectItem value="TOP_UP">Top Up</SelectItem>
                            <SelectItem value="CASH_IN">Cash In</SelectItem>
                            <SelectItem value="CASH_OUT">Cash Out</SelectItem>
                            <SelectItem value="SEND_MONEY">Send Money</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Select value={sort} onValueChange={(val) => handleSortValueChange(val)}>
                    <SelectTrigger className="w-[150px] cursor-pointer">
                        <SelectValue placeholder="sort" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup className="*:cursor-pointer">
                            <SelectItem value="none">none</SelectItem>
                            <SelectItem value="from">From (A-Z)</SelectItem>
                            <SelectItem value="-from">From (Z-A)</SelectItem>
                            <SelectItem value="to">To (A-Z)</SelectItem>
                            <SelectItem value="-to">To (Z-A)</SelectItem>
                            <SelectItem value="amount">Amount (0-9)</SelectItem>
                            <SelectItem value="-amount">Amount (9-0)</SelectItem>
                            <SelectItem value="createdAt">Date (0-9)</SelectItem>
                            <SelectItem value="-createdAt">Date (9-0)</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            <TransactionTable queryParams={{ searchTerm, filterValue, sort: sortValue }} />
        </div>
    );
};

export default Transactions;