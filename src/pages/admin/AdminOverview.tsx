import AdminOverviewStats from "@/components/Overview/AdminOverviewStats";
import AdminOverviewChart from "@/components/Overview/AdminOverviewChart";


const AdminOverview = () => {
    return (
        <div className="p-2 space-y-6">
            {/* Top Stats */}
            <AdminOverviewStats />

            {/* Chart Section */}
            <AdminOverviewChart />
        </div>
    );
};

export default AdminOverview;