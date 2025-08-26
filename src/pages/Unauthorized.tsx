import { Link } from "react-router";


const Unauthorized = () => {
    return (
        <div className="flex flex-col items-center">
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