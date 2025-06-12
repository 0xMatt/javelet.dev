"use client"

import {ChevronRight, ChevronsUpDown, Moon, Sun} from "lucide-react"

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem, useSidebar,
} from "@/components/ui/sidebar"
import {useTheme} from "next-themes";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import * as React from "react";
import SystemIcon from "next/dist/client/components/react-dev-overlay/ui/icons/system-icon";
import {MenuItem} from "@/types/menu";

export function Navigation({
                               items,
                           }: {
    items: Array<MenuItem>
}) {

    const {setTheme} = useTheme()
    const {isMobile} = useSidebar()

    return (
        <SidebarGroup>
            <SidebarMenu>
                {items.map((item) => (
                    <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild tooltip={item.title}>
                                <a href={item.url}>
                                    <item.icon/>
                                    <span>{item.title}</span>
                                </a>
                            </SidebarMenuButton>
                            {item.items?.length ? (
                                <>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuAction className="data-[state=open]:rotate-90">
                                            <ChevronRight/>
                                            <span className="sr-only">Toggle</span>
                                        </SidebarMenuAction>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            {item.items?.map((subItem) => (
                                                <SidebarMenuSubItem key={subItem.title}>
                                                    <SidebarMenuSubButton asChild>
                                                        <a href={subItem.url}>
                                                            <span>{subItem.title}</span>
                                                        </a>
                                                    </SidebarMenuSubButton>
                                                </SidebarMenuSubItem>
                                            ))}
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </>
                            ) : null}
                        </SidebarMenuItem>
                    </Collapsible>
                ))}
                <SidebarMenuItem>
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
                            side={isMobile ? "bottom" : "right"}
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
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarGroup>
    )
}
