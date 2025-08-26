import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Outlet } from "react-router";
import { useUserInfoQuery } from "@/redux/features/user/user.api";
import PageLoading from "@/components/PageLoading";


const MainLayout = () => {

    const { data, isLoading, isFetching } = useUserInfoQuery(undefined);

    if (isLoading || isFetching) {
        return <PageLoading />;
    };

    return (
        <div className=" min-h-screen flex flex-col">
            <Navbar user={data?.data}/>
            <div className="grow-1">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;