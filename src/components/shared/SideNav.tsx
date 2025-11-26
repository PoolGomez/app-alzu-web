
import { CheckCheck,
    //  House, LayoutDashboard, Table, TrainFrontTunnel 
    } from "lucide-react"
import { Collapsible } from "../ui/collapsible"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar"
import type { SideNavOption } from "@/types/sidenav-option"


const SideNav = ({data}:{data: SideNavOption[]}) => {

    // const routes = [
    //     {
    //         href:"/companies",
    //         label:"Inicio",
    //         active: true,
    //         icon: House,
    //     },
    //     {
    //         href:"/dashboard",
    //         label:"Dashboard",
    //         active: true,
    //         icon: LayoutDashboard,
    //     },
    //     {
    //         href:"/products",
    //         label:"Productos",
    //         active: true,
    //         icon: TrainFrontTunnel,
    //     },
    //     {
    //         href:"/tables",
    //         label:"Mesas",
    //         active: true,
    //         icon: Table,
    //     },
    // ]
  return (
    <>
    <SidebarMenu>
        <Collapsible asChild className="group/collapsible">
            <SidebarMenuItem>
                {/* <CollapsibleTrigger asChild> */}
                {
                    data.map((route)=>(
                    <SidebarMenuButton key={route._id} tooltip={route.label}  >
                        <a className="flex w-full" href={route.href}>
                            <div className="flex items-center justify-between w-full" >
                                <div className="flex items-center justify-start">
                                    <route.icon className="mr-2 w-4 h-4"/>
                                    <span>{route.label}</span>
                                </div>
                                
                                <div className="flex items-center justify-end">
                                    {location.pathname === route.href && <CheckCheck className="w-4 h-4"/>}
                                </div>
                            </div>
                        
                        {/* <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" /> */}
                        </a>
                    </SidebarMenuButton>
                    ))
                }
                    
                {/* </CollapsibleTrigger> */}
                
                {/* <CollapsibleContent>
                    <SidebarMenuSub>

                        <SidebarMenuSubItem 
                        // key={subItem.title}
                        >
                        <SidebarMenuSubButton asChild>
                            <a href={""}>
                            <span>{"title"}</span>
                            </a>
                        </SidebarMenuSubButton>
                        </SidebarMenuSubItem>

                    </SidebarMenuSub>
                </CollapsibleContent> */}
            </SidebarMenuItem>
        </Collapsible>
    </SidebarMenu>
    </>
  )
}

export default SideNav