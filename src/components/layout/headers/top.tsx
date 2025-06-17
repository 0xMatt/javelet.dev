import {Button} from "@/components/ui/button";
import {Command, SunIcon} from "lucide-react";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import * as React from "react";
import {MENU_ITEMS} from "@/constants/menu";

export default function HeaderTop({children}: { children: React.ReactNode }) {
    return (
        <>
            <div className="flex flex-col min-h-svh w-full bg-white dark:bg-zinc-950 relative border">
                <header
                    className="sticky  top-0 flex h-16 shrink-0 items-center gap-2 border-b border-b-white z-[100]">
                    <div
                        className="h-full flex items-center justify-between w-full mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center gap-4">
                            <NavigationMenu className="hidden md:block">
                                <NavigationMenuList
                                    className="gap-4 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start">
                                    <NavigationMenuItem className="flex-row">
                                        <NavigationMenuLink asChild>
                                            <Link href="/">
                                                <div
                                                    className="bg-sidebar-primary text-sidebar-primary-foreground inline-flex flex-row size-6 aspect-square items-center justify-center">
                                                    <Command size={4}/>
                                                </div>
                                            </Link>
                                        </NavigationMenuLink>
                                    </NavigationMenuItem>
                                    {MENU_ITEMS?.map((subItem) => (
                                        <NavigationMenuItem key={subItem.title}>
                                            <NavigationMenuLink asChild>
                                                <Link href={subItem.url}>
                                                    <span>{subItem.title}</span>
                                                </Link>
                                            </NavigationMenuLink>
                                        </NavigationMenuItem>
                                    ))}
                                </NavigationMenuList>
                            </NavigationMenu>
                            {/*<NavMenu className="hidden md:block" />*/}
                        </div>
                        <div className="flex items-center gap-3">
                            <Button variant="outline" className="hidden sm:inline-flex">
                                Sign In
                            </Button>
                            <Button>Sign Up</Button>
                            <Button size="icon" variant="outline">
                                <SunIcon/>
                            </Button>
                            {/* Mobile Menu */}
                            <div className="md:hidden">
                                {/*<NavigationSheet />*/}
                            </div>
                        </div>
                    </div>
                </header>
                <main
                    className="bg-white dark:bg-zinc-950">
                    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                        {children}
                    </div>
                </main>

            </div>
        </>

    )
}