import { BookOpenCheck, LayoutDashboard, BadgeDollarSign, Boxes, PackageOpen } from "lucide-react";
import { type NavItem } from "@/Layout/types";

export const NavItems: NavItem[] = [
    {
        title: "Dashboard",
        icon: LayoutDashboard,
        href: "/dashboard",
        color: "text-sky-500",
        isChidren: true,
        children: [
            {
                title: "Resume",
                icon: LayoutDashboard,
                color: "text-red-500",
                href: "/dashboard",
            },
            {
                title: "Vendas",
                icon: BadgeDollarSign,
                color: "text-red-500",
                href: "/example/employees",
            },
        ],
    },
    {
        title: "Balanço",
        icon: Boxes,
        href: "/balanco",
        color: "text-yellow-500",
        isChidren: true,
        children: [
            {
                title: "balanco",
                icon: Boxes,
                color: "text-yellow-500",
                href: "/balanco",
            },
            {
                title: "Comparação",
                icon: PackageOpen,
                color: "text-yellow-500",
                href: "/balanco/compare",
            },
        ],
    },
];
