import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Outlet } from "react-router";
import { useUser } from "@/contexts/UserContext";
import PageLoading from "@/components/PageLoading";


const MainLayout = () => {

    const { userInfo, setUserInfo, isLoading, isFetching } = useUser();

    if (isLoading || isFetching) {
        return <PageLoading />;
    };

    return (
        <div className=" min-h-screen flex flex-col">
            <Navbar user={userInfo} setUser={setUserInfo}/>
            <div className="grow-1">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;