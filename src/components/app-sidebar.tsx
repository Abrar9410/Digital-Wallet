import * as React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import Logo from "@/assets/icons/Logo"
import { Link, NavLink, useNavigate } from "react-router"
import { getSidebarItems } from "@/utils/getSidebarItems"
import { useUserInfoQuery } from "@/redux/features/user/user.api"
import ConfirmationAlert from "./ConfirmationAlert"
import { authApi, useLogoutMutation } from "@/redux/features/auth/auth.api"
import { useAppDispatch } from "@/redux/hook"
import { toast } from "sonner"



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const { data } = useUserInfoQuery(undefined);
  const sidebarNav = getSidebarItems(data?.data.role);

  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate()

  const handleLogout = async () => {
    const toastId = toast.loading("Logging Out...");
    const res = await logout(undefined).unwrap();
    if (res.success) {
      dispatch(authApi.util.resetApiState());
      toast.success("Logged Out Successfully", {id: toastId});
      navigate("/");
    } else {
      toast.error("Failed to Logout! Please try again.", { id: toastId });
    };
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Link to="/" className="mt-2 ml-4"><Logo /></Link>
      </SidebarHeader>
      <SidebarContent className="pl-3">
        {/* We create a SidebarGroup for each parent. */}
        {sidebarNav.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink to={item.url}>{item.title}</NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter>
        <ConfirmationAlert onConfirm={handleLogout} dialogDescription="You are going to log out from your account.">
          <SidebarMenuButton className="cursor-pointer hover:text-red-500 mb-2 *:ml-4">
            <span>Logout</span>
          </SidebarMenuButton>
        </ConfirmationAlert>
      </SidebarFooter>
    </Sidebar>
  )
}
