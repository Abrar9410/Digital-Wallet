/* eslint-disable @typescript-eslint/no-explicit-any */
import Logo from "@/assets/icons/Logo";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ThemeToggle } from "./ThemeToggle";
import { Link, NavLink, useNavigate } from "react-router";
import { authApi, useLogoutMutation } from "@/redux/features/auth/auth.api";
import { useAppDispatch } from "@/redux/hook";
import { role } from "@/constants/role";
import type { IUser } from "@/types";
import ConfirmationAlert from "./ConfirmationAlert";
import { toast } from "sonner";

// Navigation links array to be used in both desktop and mobile menus
const navigationLinks = [
  { to: "/", label: "Home", role: "PUBLIC" },
  { to: "/features", label: "Features", role: "PUBLIC" },
  { to: "/about", label: "About", role: "PUBLIC" },
  { to: "/contact", label: "Contact", role: "PUBLIC" },
  { to: "/faq", label: "FAQs", role: "PUBLIC" },
  { to: "/admin", label: "Dashboard", role: role.admin },
  { to: "/agent", label: "Dashboard", role: role.agent },
  { to: "/user", label: "Dashboard", role: role.user },
];

const Navbar = ({ user, setUser }: { user: IUser | null, setUser: (any: any) => void}) => {

  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate()

  const handleLogout = async () => {
    const toastId = toast.loading("Logging Out...");
    const res = await logout(undefined).unwrap();
    if (res.success) {
      dispatch(authApi.util.resetApiState());
      setUser(null);
      toast.success("Logged Out Successfully", {id: toastId});
      navigate("/");
    } else {
      toast.error("Failed to Logout! Please try again.", { id: toastId });
    };
  };

  return (
    <header className="border-b bg-primary sticky top-0 z-10 bg-opacity-30 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-2">
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden"
                variant="ghost"
                size="icon"
              >
                <svg
                  className="pointer-events-none"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12L20 12"
                    className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                  />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-36 p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {navigationLinks.map((link, index) => (
                    <div key={index}>
                      {
                        link.role === "PUBLIC" && (
                          <NavigationMenuItem className="w-full">
                            <NavigationMenuLink asChild className="py-1.5">
                              <NavLink to={link.to}>{link.label}</NavLink>
                            </NavigationMenuLink>
                          </NavigationMenuItem>
                        )
                      }
                      {
                        link.role === user?.role && (
                          <NavigationMenuItem className="w-full">
                            <NavigationMenuLink asChild className="py-1.5">
                              <NavLink to={link.to}>{link.label}</NavLink>
                            </NavigationMenuLink>
                          </NavigationMenuItem>
                        )
                      }
                    </div>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>
          {/* Main nav */}
          <div className="flex items-center gap-6">
            <Link to="/">
              <Logo />
            </Link>
            {/* Navigation menu */}
            <NavigationMenu className="max-md:hidden">
              <NavigationMenuList className="gap-2">
                {navigationLinks.map((link, index) => (
                  <div key={index}>
                    {
                      link.role === "PUBLIC" && (
                        <NavigationMenuItem>
                          <NavigationMenuLink asChild className="text-white hover:text-primary py-1.5 font-medium">
                            <NavLink to={link.to}>{link.label}</NavLink>
                          </NavigationMenuLink>
                        </NavigationMenuItem>
                      )
                    }
                    {
                      link.role === user?.role && (
                        <NavigationMenuItem>
                          <NavigationMenuLink asChild className="text-white hover:text-primary py-1.5 font-medium">
                            <NavLink to={link.to}>{link.label}</NavLink>
                          </NavigationMenuLink>
                        </NavigationMenuItem>
                      )
                    }
                  </div>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
        {/* Right side */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {
            !user?.email ?
              <>
                <Button asChild variant="ghost" size="sm" className="text-sm text-white hover:bg-[#3200e8] hover:text-white dark:hover:bg-[#3200e8]">
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button asChild size="sm" className="text-sm bg-white text-primary hover:bg-[#3200e8] hover:text-white">
                  <Link to="/register">Register</Link>
                </Button>
              </> :
              <ConfirmationAlert onConfirm={handleLogout} dialogDescription="You are going to log out from your account.">
                <Button className="text-sm text-white hover:bg-destructive border border-white/30 cursor-pointer">
                  Logout
                </Button>
              </ConfirmationAlert>
          }
        </div>
      </div>
    </header>
  )
}

export default Navbar;
