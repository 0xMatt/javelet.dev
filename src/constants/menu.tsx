import {AtSignIcon, ChartAreaIcon, CoffeeIcon, HomeIcon, Rss, User} from "lucide-react";
import {MenuItem} from "@/types/menu";

export const MENU_ITEMS: Array<MenuItem> = [
    {
        title: "Home",
        url: "#",
        icon: HomeIcon,
        isActive: true,
    },
    {
        title: "Stats",
        url: "#",
        icon: ChartAreaIcon,
        isActive: true,
    },
    {
        title: "About",
        url: "#",
        icon: User,
        isActive: true,
    },

    {
        title: "Blog",
        url: "#",
        icon: Rss,
        isActive: true,
    },
    {
        title: "Projects",
        url: "#",
        icon: CoffeeIcon,
        isActive: true,
    },
    {
        title: "Contact",
        url: "#",
        icon: AtSignIcon,
        isActive: true,
    },
    // {
    //     title: "Menu",
    //     url: "#",
    //     isActive: false,
    //     icon: Settings2,
    //     items: [
    //         {
    //             title: "Child",
    //             url: "#",
    //         },
    //     ],
    // },
]