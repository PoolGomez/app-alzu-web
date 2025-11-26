import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import imageUser from "@/assets/images/user.png"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar"
import { BadgeCheck, Building2, ChevronsUpDown, LogOut } from "lucide-react"
import { useAppDispatch, useAppSelector } from "@/hooks/hooks"
import { useNavigate } from "react-router-dom"
import { useMutation } from "@tanstack/react-query"
import { logout } from "@/https"
import { removeUser } from "@/redux/slices/userSlice"
import { removeCompany } from "@/redux/slices/companySlice"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"

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
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
                {/* <Avatar className="h-8 w-8 rounded-full">
                    <AvatarImage src={imageUser} alt="image" />
                    <AvatarFallback>
                        CN
                    </AvatarFallback>
                </Avatar> */}
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={imageUser} alt={userData.name} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{userData.name}</span>
                <span className="truncate text-xs">{userData.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            
            // side={isMobile ? "bottom" : "right"}
            side="bottom"
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
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
            </DropdownMenuLabel>
            {/* <DropdownMenuSeparator /> */}
            {/* <DropdownMenuGroup>
              <DropdownMenuItem>
                <Sparkles />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup> */}
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={()=>navigate("/account")} className="cursor-pointer">
                <BadgeCheck />
                Cuenta
              </DropdownMenuItem>
              <DropdownMenuItem onClick={()=>navigate("/companies")} className="cursor-pointer">
                <Building2 />
                Mis Empresas
              </DropdownMenuItem>
              
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
              <LogOut />
              Cerrar Sesión
              {/* <Dialog>
                                        <DialogTrigger asChild>
                                        <Button variant={"ghost"} className="flex w-full justify-start cursor-pointer">
                                            <LogOut /> <span>Cerrar Sesión</span>
                                        </Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-md">
                                        <DialogHeader>
                                            <DialogTitle className="flex items-center justify-center">Cerrar Sesión</DialogTitle>
                                            <DialogDescription className="flex items-center justify-center">
                                            Se cerrara la sesión
                                            </DialogDescription>
                                        </DialogHeader>
                                        <DialogFooter>
                                            <div className="w-full flex items-center justify-center gap-4">
                                            <DialogClose asChild>
                                                <Button type="button" variant="secondary">
                                                Cancelar
                                                </Button>
                                            </DialogClose>
                                            
                                            <Button onClick={handleLogout}>
                                                Confirmar
                                            </Button>
                                            </div>
                                        </DialogFooter>
                                        </DialogContent>
                                    </Dialog> */}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

export default UserButton



{/* <Popover>
        <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="data-[state=open]:bg-accent cursor-pointer">
                <Avatar className="h-8 w-8 rounded-full">
                    <AvatarImage src={imageUser} alt="image" />
                    <AvatarFallback>
                        CN
                    </AvatarFallback>
                </Avatar>
            </Button>
        </PopoverTrigger>

        <PopoverContent 
            align="end"
        >
            <Sidebar collapsible="none" className="bg-transparent">
                <SidebarContent>
                    <SidebarGroup className="border-b last:border-none">
                        <SidebarGroupContent className="gap-0">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <User className="h-8 w-8 rounded-lg" />
                                
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate  text-xs">
                                    Bienvenido,
                                </span>
                                <span className="truncate font-semibold">
                                   
                                    {userData.name}
                                </span>
                                </div>
                            </div>
                        </SidebarGroupContent>
                    </SidebarGroup>

                    <SidebarGroup className="border-b last:border-none">
                        <SidebarGroupContent className="gap-0">
                            <SidebarMenu>

                                <SidebarMenuItem>
                                    <SidebarMenuButton className="cursor-pointer" onClick={()=>navigate("/account")}>
                                        <BadgeCheck /> <span>Cuenta</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>

                               

                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>

                    <SidebarGroup className="border-b last:border-none">
                      <SidebarGroupContent className="gap-0">
                        <SidebarMenu>
                          
                            
                            
                       

                                      <Dialog>
                                        <DialogTrigger asChild>
                                        <Button className="cursor-pointer">
                                            <LogOut /> <span>Cerrar Sesión</span>
                                        </Button>
                                        </DialogTrigger>
                                        <DialogContent className="sm:max-w-md">
                                        <DialogHeader>
                                            <DialogTitle className="flex items-center justify-center">Cerrar Sesión</DialogTitle>
                                            <DialogDescription className="flex items-center justify-center">
                                            Se cerrara la sesión
                                            </DialogDescription>
                                        </DialogHeader>
                                        <DialogFooter>
                                            <div className="w-full flex items-center justify-center gap-4">
                                            <DialogClose asChild>
                                                <Button type="button" variant="secondary">
                                                Cancelar
                                                </Button>
                                            </DialogClose>
                                            
                                            <Button onClick={handleLogout}>
                                                Confirmar
                                            </Button>
                                            </div>
                                        </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
    
    
                          
                        </SidebarMenu>
                      </SidebarGroupContent>
                    </SidebarGroup>

                </SidebarContent>
            </Sidebar>
            
        </PopoverContent>
    </Popover> */}