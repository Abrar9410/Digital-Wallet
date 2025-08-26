import * as React from "react"
import {
  Sidebar,
  SidebarContent,
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
import { Link, NavLink } from "react-router"
import { getSidebarItems } from "@/utils/getSidebarItems"
import { useUserInfoQuery } from "@/redux/features/user/user.api"



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const {data} = useUserInfoQuery(undefined);
  const sidebarNav = getSidebarItems(data?.data.role);

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
    </Sidebar>
  )
}
