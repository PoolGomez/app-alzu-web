import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import imageUser from "@/assets/images/user.png"
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarSeparator } from "../ui/sidebar"
import { BadgeCheck, Building2, LogOut } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/hooks/hooks"
import { useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { logout } from "@/https"
import { removeUser } from "@/redux/slices/userSlice"
import { removeCompany } from "@/redux/slices/companySlice"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { Button } from "../ui/button"

const UserButton = () => {

    const userData = useAppSelector((state) => state.user );
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const logoutMutation = useMutation({
        mutationFn: ()=> logout(),
        onSuccess: ()=> {
            dispatch(removeUser());
            dispatch(removeCompany());
            
            navigate("/auth")
        },
        onError: (error)=>{
            console.log(error)
        }
    })

    const handleLogout = () => {
        logoutMutation.mutate();
    }

  return (
<div className="flex items-center gap-2 text-sm">
      
      <Popover >
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="data-[state=open]:bg-accent h-7 w-7"
          >
            <Avatar className="h-8 w-8 rounded-lg">
                 <AvatarImage src={imageUser} alt={userData.name} />
                 <AvatarFallback className="rounded-lg">CN</AvatarFallback>
               </Avatar>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          side="bottom"
          sideOffset={4}
        >
          <Sidebar collapsible="none" className="bg-transparent">
            <SidebarContent
            className="w-56 overflow-hidden rounded-lg p-0"
            >

                <SidebarGroup className="p-0">
                  <SidebarGroupContent>

                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage src={imageUser} alt={userData.name} />
                        <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-medium">{userData.name}</span>
                        <span className="truncate text-xs">{userData.email}</span>
                      </div>
                    </div>

                  </SidebarGroupContent>
                </SidebarGroup>
                
                <SidebarSeparator />

                <SidebarGroup className="p-0">
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem className="p-0 font-semibold">
                          <SidebarMenuButton onClick={()=>navigate("/account")} className="cursor-pointer">
                            <BadgeCheck /> <span>Cuenta</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>

                        <SidebarMenuItem className="p-0 font-semibold">
                          <SidebarMenuButton onClick={()=>navigate("/companies")} className="cursor-pointer">
                            <Building2 /> <span>Mis empresas</span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>

                </SidebarGroup>

                <SidebarSeparator/>

                <SidebarGroup className="p-0">
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem className="p-0 font-semibold">
                        <SidebarMenuButton onClick={handleLogout} className="cursor-pointer">
                          <LogOut /> <span>Cerrar sesión</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              
            </SidebarContent>
          </Sidebar>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default UserButton
