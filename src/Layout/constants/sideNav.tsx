import { BookOpenCheck, LayoutDashboard, BadgeDollarSign } from "lucide-react";
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
        title: "Example",
        icon: BookOpenCheck,
        href: "/example",
        color: "text-orange-500",
        isChidren: true,
        children: [
            {
                title: "Example-01",
                icon: BookOpenCheck,
                color: "text-red-500",
                href: "/example/employees",
            },
            {
                title: "Example-02",
                icon: BookOpenCheck,
                color: "text-red-500",
                href: "/example/example-02",
            },
            {
                title: "Example-03",
                icon: BookOpenCheck,
                color: "text-red-500",
                href: "/example/example-03",
            },
        ],
    },
];
