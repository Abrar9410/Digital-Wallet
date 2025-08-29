/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import Password from "../ui/Password";
import { useChangePasswordMutation } from "@/redux/features/auth/auth.api";


interface IProps {
    children: ReactNode;
};

const changePasswordSchema = z
    .object({
        oldPassword: z.string(),
        newPassword: z
            .string()
            .min(8, { error: "Password must be at least 8 characters long" })
            .regex(/^(?=.*[A-Z])/, {
                message: "Password must contain at least 1 uppercase letter.",
            })
            .regex(/^(?=.*[!@#$%^&*])/, {
                message: "Password must contain at least 1 special character.",
            })
            .regex(/^(?=.*\d)/, {
                message: "Password must contain at least 1 number.",
            }),
    });

export function ChangePassword({ children }: IProps) {

    const [open, setOpen] = useState(false);
    const [changePassword] = useChangePasswordMutation();

    const form = useForm<z.infer<typeof changePasswordSchema>>({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {
            oldPassword: "",
            newPassword: ""
        },
    });

    const onSubmit = async (data: z.infer<typeof changePasswordSchema>) => {
        const toastId = toast.loading("Saving Info...")
        const passwordInfo = {
            oldPassword: data.oldPassword,
            newPassword: data.newPassword,
        };

        try {
            const res = await changePassword(passwordInfo).unwrap();
            if (res.success) {
                toast.success("Password Changed Successfully! You Must Use your New Password the next time you Login.",
                    { id: toastId }
                );
                setOpen(false);
            } else {
                toast.error(res.message, {id: toastId});
            };
        } catch (error: any) {
            toast.error(error.data.message, { id: toastId });
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Change Password</DialogTitle>
                    <DialogDescription>
                        Change your password from here. Click save when you&apos;re
                        done.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
                        <div className="space-y-6">
                            <FormField
                                control={form.control}
                                name="oldPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Old Password</FormLabel>
                                        <FormControl>
                                            <Password {...field} />
                                        </FormControl>
                                        <FormDescription className="sr-only">
                                            This is a Password field for your old Password.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="newPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>New Password</FormLabel>
                                        <FormControl>
                                            <Password {...field} />
                                        </FormControl>
                                        <FormDescription className="sr-only">
                                            Type your new Password you wish to set.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline" className="cursor-pointer">Cancel</Button>
                            </DialogClose>
                            <Button type="submit" className="cursor-pointer text-white">Save changes</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
