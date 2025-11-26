import type { ReactNode } from "react"
import { Separator } from "../ui/separator"
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarInset, SidebarProvider, SidebarRail, SidebarTrigger } from "../ui/sidebar"
import { ToggleTheme } from "./ToggleTheme"
import SideNav from "./SideNav"
import { useAppSelector } from "@/hooks/hooks"


import UserButton from "./UserButton";
import type { SideNavOption } from "@/types/sidenav-option"
import { Building2, LayoutDashboard, Settings, Table, TrainFrontTunnel } from "lucide-react"
import CompanySwitcher from "./CompanySwitcher"

    const Header = ({children}:{children: ReactNode}) => {

    const companyData = useAppSelector((state) => state.company);

     const routes : SideNavOption[] = [
        {
            _id: 1,
            href: "/companies",
            label: "Empresas",
            active: true,
            icon: Building2,
        },
        {
            _id: 2,
            href:"/configurations",
            label:"Ajustes",
            active: true,
            icon: Settings,
        }
     ]

     const routes2 : SideNavOption[] = [
        // {
        //     _id: 1,
        //     href:"/companies",
        //     label:"Inicio",
        //     active: true,
        //     icon: House,
        // },
        {
            _id: 3,
            href:"/dashboard",
            label:"Dashboard",
            active: true,
            icon: LayoutDashboard,
        },
        {
            _id: 4,
            href:"/products",
            label:"Productos",
            active: true,
            icon: TrainFrontTunnel,
        },
        {
            _id: 5,
            href:"/tables",
            label:"Mesas",
            active: true,
            icon: Table,
        },
    ]

  return (
    <SidebarProvider>
        {
            companyData.isSelect && (
            <Sidebar collapsible='icon' className='pt-12'>
                <SidebarContent>
                    <SidebarGroup>

                        {/* {
                            companyData.name
                        } */}
                        <SidebarGroupLabel>Inicio</SidebarGroupLabel>
                        <SideNav data={routes} />

                    </SidebarGroup>
                    <Separator />
                    <SidebarGroup>
                        <SidebarGroupLabel>Modulos</SidebarGroupLabel>

                        <SideNav data={routes2} />
                    </SidebarGroup>
                </SidebarContent>
                <SidebarRail />
            </Sidebar>
            )
        }
        
        <SidebarInset>
            <header className="fixed top-0 left-0 w-full z-50 flex h-12 shrink-0 items-center justify-between gap-2 pr-2 gap-x-4 md:pr-6 border-b transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 bg-background">
                <div className="flex items-center gap-2 px-4">
                    <SidebarTrigger className="p-2" />
                    <Separator orientation="vertical" className="mr-2 h-8" />
                    {/* <ShowOnlyScreen screen='desktop'>
                        <CompanySwitcher myCompanies={myCompanies} sharedCompanies={otherCompanies} />
                    </ShowOnlyScreen> */}
                    {
                        companyData.isSelect && <CompanySwitcher />
                    }
                    {/* <CompanySwitcher /> */}

                </div>
                <div className="flex gap-x-2 items-center">

                   <ToggleTheme /> 

                    <UserButton />
                   
                </div>
            </header>
            <main className='pt-12'>
                {children}
            </main>
        </SidebarInset>
    </SidebarProvider>
  )
}

export default Header