import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import ProfileField from "@/components/ProfileField";
import { useUserInfoQuery } from "@/redux/features/user/user.api";
import PageLoading from "@/components/PageLoading";
import { Crown } from "lucide-react";
import { EditProfile } from "@/components/Modals/EditProfile";
import { ChangePassword } from "@/components/Modals/ChangePassword";


const AdminProfile = () => {

    const {data, isLoading, isFetching} = useUserInfoQuery(undefined);

    const user = data?.data;

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
                        <AvatarFallback><Crown className="text-yellow-500"/></AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-2xl font-bold text-center">
                        Admin Profile
                    </CardTitle>
                </CardHeader>

                {/* Content Section */}
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <ProfileField label="Name" value={user.name} />
                        <ProfileField label="Email" value={user.email} />
                        <ProfileField label="Phone" value={user.phone || "N/A"} />
                        <ProfileField label="Address" value={user.address || "N/A"} />
                    </div>

                    <Separator />

                    {/* Action Buttons */}
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
                </CardContent>
            </Card>
        </div>
    );
};

export default AdminProfile;