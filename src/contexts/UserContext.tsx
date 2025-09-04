/* eslint-disable @typescript-eslint/no-explicit-any */
import type { IUser } from "@/types";
import { createContext, useContext } from "react";

export type UserContextType = {
    userInfo: IUser | null;
    setUserInfo: (user: IUser | null) => void;
    isLoading: boolean;
    isFetching: boolean;
    refetch: () => Promise<any>;
    loading: boolean,
    setLoading: (loading: boolean) => void;
};

export const UserContext = createContext<UserContextType | null>(null);

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) throw new Error("useUser must be used within UserProvider");
    return context;
};
