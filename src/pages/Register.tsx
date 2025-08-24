import Logo from "@/assets/icons/Logo";
import { RegisterForm } from "@/components/Authentication/RegisterForm";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Link } from "react-router";


const Register = () => {
    return (
        <div className="bg-muted">
            <div className="container mx-auto h-16 flex items-center justify-between">
                <Link to="/">
                    <Logo />
                </Link>
                <ThemeToggle />
            </div>
            <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center">
                <div className="w-11/12 max-w-md">
                    <RegisterForm className="bg-card p-4 md:p-6 rounded-2xl shadow-lg"/>
                </div>
            </div>
        </div>
    );
};

export default Register;