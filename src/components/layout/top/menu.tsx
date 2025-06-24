import {MENU_ITEMS} from "@/constants/menu";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import * as React from "react";
import {NavigationMenuProps} from "@radix-ui/react-navigation-menu";

export default function TopMenu(props: NavigationMenuProps) {
    return (
        <NavigationMenu className="hidden md:block" {...props}>
            <NavigationMenuList
                className="gap-4 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start">

                {MENU_ITEMS?.map((subItem) => (
                    <NavigationMenuItem key={subItem.title}>
                        <NavigationMenuLink asChild>
                            <Link href={subItem.url} className="inline-flex flex-row align-middle">
                                <span className="align-middle mt-0.5 mr-1"><subItem.icon/></span>
                                <span className="align-middle">  {subItem.title}</span>
                            </Link>
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    )
}