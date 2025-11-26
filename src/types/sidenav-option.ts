import { type ElementType } from "react";

export interface SideNavOption
{
    _id: number;
    href: string;
    label: string;
    active: boolean;
    icon: ElementType;

    //  href:"/companies",
    //         label:"Inicio",
    //         active: true,
    //         icon: House,
}