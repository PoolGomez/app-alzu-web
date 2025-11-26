import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import {
  ChevronsUpDown,
  GalleryVerticalEnd,
  Group,
  PlusCircle,
} from "lucide-react";
import { Separator } from "../ui/separator";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent } from "../ui/dialog";

import ListMyCompaniesItem from "./ListMyCompaniesItem";
import { useAppSelector } from "@/hooks/hooks";
import ModalContentAddCompany from "./ModalContentAddCompany";
import { useState } from "react";

const CompanySwitcher = () => {
  const companyData = useAppSelector((state) => state.company);

  const navigate = useNavigate();

  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const openDialog = () => setIsOpenDialog(true);
  const closeDialog = () => setIsOpenDialog(false);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              tooltip={"current"}
              size={"lg"}
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-accent text-sidebar-foreground">
                <GalleryVerticalEnd className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {companyData.isSelect
                    ? companyData.name
                    : "Seleccione Empresa"}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side="bottom"
            sideOffset={4}
          >
            <DropdownMenuLabel>Mis Empresas</DropdownMenuLabel>

            <ListMyCompaniesItem />

            <SidebarGroupLabel>Empresas Compartidas</SidebarGroupLabel>

            <div className="flex items-center px-2 py-1 hover: bg-grat-50 text-muted-foreground">
              <p className="w-full truncate text-sm whitespace-nowrap">
                No hay empresas
              </p>
            </div>

            <Separator />

            <div
              onClick={() => {
                navigate("/companies");
              }}
              className="flex items-center bg-background px-2 py-2 cursor-pointer hover:bg-accent"
            >
              <Group className="mr-2 h-4 w-4" />
              <span className="text-sm"> Ver todas las empresas</span>
            </div>

            <Separator />

            <DropdownMenuItem onSelect={openDialog}>
              <PlusCircle className="mr-2 h-4 w-4" />
              <span className="text-sm"> Crear nueva empresa</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Dialog open={isOpenDialog} onOpenChange={setIsOpenDialog}>
          <DialogContent onInteractOutside={(e) => e.preventDefault()}>
            <ModalContentAddCompany onClose={closeDialog} />
          </DialogContent>
        </Dialog>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default CompanySwitcher;
