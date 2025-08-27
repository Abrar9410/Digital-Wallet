import { Link } from "react-router";


const Unauthorized = () => {
    return (
        <div className="container mx-auto h-screen flex flex-col items-center justify-center gap-6">
            <p className="text-center text-3xl">
                You are not Authorized to view this page. Please Go Back!
            </p>
            <Link to="/" className="text-xl font-semibold underline cursor-pointer">
                Home
            </Link>
        </div>
    );
};

export default Unauthorized;