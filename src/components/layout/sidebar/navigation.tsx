"use client"

import {ChevronRight} from "lucide-react"

import {Collapsible, CollapsibleContent, CollapsibleTrigger,} from "@/components/ui/collapsible"
import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
    useSidebar,
} from "@/components/ui/sidebar"
import * as React from "react";
import {MENU_ITEMS} from "@/constants/menu";
import Link from "next/link";
import {ThemeSelector} from "@/components/elements/theme-selector";

export function Navigation() {

    const {setOpenMobile} = useSidebar()

    return (
        <SidebarGroup>
            <SidebarMenu>
                {MENU_ITEMS.map((item) => (
                    <Collapsible key={item.title} asChild defaultOpen={item.isActive}>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild tooltip={item.title}>
                                <Link href={item.url} onClick={() => setOpenMobile(false)}>
                                    <item.icon/>
                                    <span>{item.title}</span>
                                </Link>
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
                                                        <Link href={subItem.url}>
                                                            <span>{subItem.title}</span>
                                                        </Link>
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
                    <ThemeSelector variant='dropdown'/>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarGroup>
    )
}
