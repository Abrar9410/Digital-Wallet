import PageLoading from "@/components/PageLoading";
import { useUserInfoQuery } from "@/redux/features/user/user.api";
import type { TRole } from "@/types";
import type { ComponentType } from "react";
import { Navigate, useLocation } from "react-router";
import { toast } from "sonner";

export const withAuth = (Component: ComponentType, requiredRole?: TRole) => {
  return function AuthWrapper() {
    const { data, isLoading, isFetching } = useUserInfoQuery(undefined);
    const location = useLocation()

    if (isLoading || isFetching) {
      return <PageLoading />;
    };

    if (!isLoading && !isFetching && !data?.data?.email) {
      return <Navigate state={location.pathname} to="/login" />;
    };

    if (data?.data?.activeStatus === "BLOCKED") {
      toast.error("Your Account has been Blocked! Please contact Admin for details.");
      return <Navigate to="/" />;
    };

    if (requiredRole && !isLoading && requiredRole !== data?.data?.role) {
      return <Navigate to="/unauthorized" />;
    };

    return <Component />;
  };
};
