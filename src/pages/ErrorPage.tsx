import { useNavigate } from "react-router";


const ErrorPage = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-[100vh] flex flex-col justify-center items-center">
            <h1 className="text-5xl text-text1 text-center font-extrabold">Oops... Page Not Found</h1>
            <p className="text-center text-text2 text-xl py-8">An error occurred. Don"t worry, you can go back.</p>
            <div className="flex justify-center items-center gap-4">
                <button onClick={() => navigate(-1)} className="p-1 bg-gray-400 text-gray-600">Go Back</button>
                <button onClick={() => navigate('/')} className="p-1 bg-gray-400 text-gray-600">Go to Homepage</button>
            </div>
        </div>
    );
};

export default ErrorPage;