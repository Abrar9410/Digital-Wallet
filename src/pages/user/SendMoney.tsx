/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Search } from "lucide-react";
import type { IUser } from "@/types";
import { useGetUsersQuery } from "@/redux/features/user/user.api";
import { toast } from "sonner";
import { useSendMoneyMutation } from "@/redux/features/wallet/wallet.api";
import { useUser } from "@/contexts/UserContext";



const sendMoneySchema = z.object({
    email: z.email({ message: "Enter a valid email" }),
    amount: z
        .string()
        .min(1, { message: "Amount must be valid and greater than 0" })
        .regex(/^\d+(\.\d{1,2})?$/, {
            message: "Enter a valid amount (up to 2 decimal places)",
        })
});



const SendMoney = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedEmail, setSelectedEmail] = useState("");
    const [disabled, setDisabled] = useState(true);
    const { data } = useGetUsersQuery({ searchTerm });
    const { userInfo } = useUser();
    const [sendMoney] = useSendMoneyMutation({});

    const form = useForm<z.infer<typeof sendMoneySchema>>({
        resolver: zodResolver(sendMoneySchema),
        defaultValues: { email: "", amount: "" },
    });

    const onSubmit = async (values: z.infer<typeof sendMoneySchema>) => {
        const toastId = toast.loading("Processing! Please Wait...", { position: "top-center" });
        const info = {
            receiverEmail: values.email,
            amount: Number(values.amount)
        };

        try {
            const res = await sendMoney(info).unwrap();

            if (res.success) {
                form.reset();
                toast.success(res.message, { id: toastId, position: "top-center" });
            } else {
                toast.error(res.message, { id: toastId, position: "top-center" });
            }
        } catch (error: any) {
            toast.error(error.data.message, { id: toastId, position: "top-center" });
        }
    };

    return (
        <div className="p-4 sm:p-6">
            <h1 className="text-2xl font-bold text-center mb-10">Send Money</h1>
            <div className="max-w-md mx-auto p-6 space-y-6 bg-card rounded-2xl shadow-md">

                {/* Form */}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        {/* Email Field */}
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <div className="flex gap-2">
                                        <FormControl>
                                            <Input placeholder="Enter user's email" {...field} />
                                        </FormControl>
                                        {/* Search Modal Trigger */}
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="outline" type="button" className="cursor-pointer">
                                                    <Search className="h-4 w-4" />
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="max-w-md flex flex-col">
                                                <DialogHeader>
                                                    <DialogTitle>Select a User</DialogTitle>
                                                    <DialogDescription className="sr-only">
                                                        Choose a user from the list below to auto-fill the email field.
                                                    </DialogDescription>
                                                </DialogHeader>

                                                {/* Search Input */}
                                                <Input
                                                    placeholder="Search user..."
                                                    value={searchTerm}
                                                    onChange={(e) => setSearchTerm(e.target.value)}
                                                    className="mb-3"
                                                />

                                                {/* User List */}
                                                <div className="flex-1 max-h-60 overflow-y-auto space-y-2">
                                                    {data?.data.length > 0 ? (
                                                        data?.data.filter((user: IUser) => user.email !== (userInfo as IUser).email).map((user: IUser) => (
                                                            <div
                                                                key={user._id}
                                                                className={`p-2 border rounded-lg cursor-pointer hover:bg-accent ${selectedEmail === user.email ? "bg-accent" : ""}`}
                                                                onClick={() => setSelectedEmail(user.email)}
                                                            >
                                                                <p>{user.name}</p>
                                                                <p className="text-sm">{user.email}</p>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <p className="text-sm text-muted-foreground">No user found</p>
                                                    )}
                                                </div>

                                                <DialogFooter className="sticky bottom-0 flex justify-end">
                                                    <DialogClose asChild>
                                                        <Button
                                                            disabled={!selectedEmail || !data?.data.length}
                                                            onClick={() => form.setValue("email", selectedEmail)}
                                                            className="text-white cursor-pointer disabled:bg-gray-500 disabled:pointer-events-none"
                                                        >
                                                            Select User
                                                        </Button>
                                                    </DialogClose>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Amount Field */}
                        <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Amount</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            step="0.01"
                                            placeholder="Enter amount"
                                            {...field}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (/^\d*\.?\d{0,2}$/.test(value)) {
                                                    field.onChange(value);
                                                };
                                                if (value && Number(value) > 0) {
                                                    setDisabled(false);
                                                } else {
                                                    setDisabled(true);
                                                }
                                            }}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            disabled={disabled}
                            className="w-full text-white cursor-pointer disabled:bg-gray-500 disabled:pointer-events-none"
                        >
                            Confirm Send
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}


export default SendMoney;