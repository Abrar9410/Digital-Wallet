import PageLoading from "@/components/PageLoading";
import { useUser } from "@/contexts/UserContext";
import type { TRole } from "@/types";
import type { ComponentType } from "react";
import { Navigate } from "react-router";
import { toast } from "sonner";

export const withAuth = (Component: ComponentType, requiredRole?: TRole) => {
  return function AuthWrapper() {
    const { userInfo, isLoading, isFetching, loading } = useUser();

    if (isLoading || isFetching || loading) {
      return <PageLoading />;
    };

    if (!isLoading && !isFetching && !loading && !userInfo?.email) {
      return <Navigate to="/login" />;
    };

    if (userInfo?.activeStatus === "BLOCKED") {
      toast.error("Your Account has been Blocked! Please contact Admin for details.");
      return <Navigate to="/" />;
    };

    if (requiredRole && !isLoading && requiredRole !== userInfo?.role) {
      return <Navigate to="/unauthorized" />;
    };

    return <Component />;
  };
};
