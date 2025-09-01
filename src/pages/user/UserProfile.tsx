/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import ProfileField from "@/components/ProfileField";
import { useSendAgentRequestMutation, useUserInfoQuery } from "@/redux/features/user/user.api";
import PageLoading from "@/components/PageLoading";
import { EditProfile } from "@/components/Modals/EditProfile";
import { ChangePassword } from "@/components/Modals/ChangePassword";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import ConfirmationAlert from "@/components/ConfirmationAlert";


const UserProfile = () => {
    const { data, isLoading, isFetching } = useUserInfoQuery(undefined);
    const user = data?.data;
    const [sendAgentRequest] = useSendAgentRequestMutation(undefined);

    const handleSendAgentRequest = async () => {
        const toastId = toast.loading("Sending Request...");
        try {
            const res = await sendAgentRequest(undefined).unwrap();

            if (res.success) {
                toast.success(res.message, {id: toastId});
            } else {
                toast.error(res.message, { id: toastId });
            }
        } catch (error: any) {
            toast.error(error.data.message, {id: toastId});
        }
    }

    if (isLoading || isFetching) {
        return <PageLoading />;
    };

    return (
        <div className="p-4 sm:p-6">
            <Card className="max-w-3xl mx-auto shadow-md">
                {/* Header Section */}
                <CardHeader className="flex flex-col items-center">
                    <Avatar className="w-24 h-24 mb-4">
                        <AvatarImage src="/avatar-placeholder.png" alt="User avatar" />
                        <AvatarFallback className="text-4xl">{user.name.slice(0, 1).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-2xl font-bold text-center">
                        {user.name}
                    </CardTitle>
                </CardHeader>

                {/* Content Section */}
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <ProfileField label="Email" value={user.email} />
                        <ProfileField label="Phone" value={user.phone || "N/A"} />
                        <ProfileField label="Address" value={user.address || "N/A"} />
                        <ProfileField label="Role" value={user.role} />
                        <ProfileField
                            label="Active Status"
                            value={
                                <Badge
                                    variant={user.activeStatus === "ACTIVE" ? "default" : "destructive"}
                                    className={`px-2 py-1 text-xs font-semibold ${user.activeStatus === "ACTIVE" ? "bg-green-500" : "bg-red-500"
                                        } text-white`}
                                >
                                    {user.activeStatus}
                                </Badge>
                            }
                        />
                        <ProfileField
                            label="Agent Status"
                            value={
                                <Badge
                                    variant={"default"}
                                    className={cn(
                                        { "bg-yellow-500": user.agentStatus === "REQUESTED" },
                                        { "bg-gray-500": user.agentStatus === "N/A" },
                                        "px-2 py-1 text-xs font-semibold text-white"
                                    )}
                                >
                                    {user.agentStatus}
                                </Badge>
                            }
                        />
                    </div>

                    <Separator />

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row justify-between max-sm:gap-4">
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <EditProfile user={user}>
                                <Button variant="default" className="w-full sm:w-40 text-white cursor-pointer">
                                    Edit Profile
                                </Button>
                            </EditProfile>
                            <ChangePassword>
                                <Button variant="outline" className="w-full sm:w-40 cursor-pointer">
                                    Change Password
                                </Button>
                            </ChangePassword>
                        </div>
                        <ConfirmationAlert
                            onConfirm={handleSendAgentRequest}
                            dialogDescription="This action will send a request to the Admin to make you an Agent.
                            If approved, this account will turn into an Agent Account and some typical user functionalities
                            will no longer work!"
                        >
                            <Button disabled={user.agentStatus!=="N/A"}
                                variant="default"
                                className="w-full sm:w-40 bg-amber-600 disabled:bg-gray-500 text-white cursor-pointer"
                            >
                                Become an Agent
                            </Button>
                        </ConfirmationAlert>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default UserProfile;