import { useState, useEffect, type ReactNode } from "react";
import { UserContext } from "@/contexts/UserContext";
import { useUserInfoQuery } from "@/redux/features/user/user.api";
import type { IUser } from "@/types";



export const UserProvider = ({ children }: { children: ReactNode }) => {
    const { data, isLoading, isFetching, refetch } = useUserInfoQuery(undefined);
    const [userInfo, setUserInfo] = useState<IUser | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (isLoading || isFetching) {
            return;
        };
        if (data?.data) {
            setUserInfo(data.data);
            setLoading(false);
        } else {
            setUserInfo(null);
            setLoading(false);
        };
    }, [data, isLoading, isFetching]);


    return (
        <UserContext.Provider
            value={{
                userInfo,
                setUserInfo,
                isLoading,
                isFetching,
                refetch,
                loading,
                setLoading
            }}
        >
            {children}
        </UserContext.Provider>
    );
};
