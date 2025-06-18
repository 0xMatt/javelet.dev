"use client"

import * as React from "react";
import {ChevronsUpDown, Moon, Sun} from "lucide-react";
import {useTheme} from "next-themes"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {SidebarMenuButton} from "@/components/ui/sidebar";
import SystemIcon from "next/dist/client/components/react-dev-overlay/ui/icons/system-icon";
import {Button} from "@/components/ui/button";

export function ThemeSelector({variant = 'toggle|dropdown', className}: { variant?: string, className?: string }) {
    const {setTheme, theme} = useTheme()


    if (variant === 'toggle') {
        return (
            <Button size="sm" variant="outline" onClick={() => setTheme(theme === 'dark' ? "light" : "dark")}
                    className={className}>
                <Moon
                    className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"/>
                <Sun
                    className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"/>
            </Button>
        );
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                    <Sun
                        className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"/>
                    <Moon
                        className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"/>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-medium">Theme</span>
                    </div>
                    <ChevronsUpDown className="ml-auto size-4"/>
                </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                side={'top'}
                align="end"
                sideOffset={4}
            >
                <DropdownMenuGroup>
                    <DropdownMenuItem
                        onClick={() => setTheme("system")}><SystemIcon/>System</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}><Moon/>Dark</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("light")}><Sun/>Light</DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>

    )
}
