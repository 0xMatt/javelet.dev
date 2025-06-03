import * as React from "react"
import {Command} from "lucide-react"

import {Navigation} from "@/components/layout/sidebar/navigation"
import {Profile} from "@/components/layout/sidebar/profile"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import {SearchForm} from "@/components/layout/sidebar/search-form";
import {MENU_ITEMS} from "@/constants/menu";

const data = {
    user: {
        name: "Matthew Javelet",
        email: "matthew@fyuze.io",
    }
}

export function AppSidebar({...props}: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar variant="inset" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="#">
                                <div
                                    className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                                    <Command className="size-4"/>
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-medium">Matthew Javelet</span>
                                    <span className="truncate text-xs">@0xMatt</span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
                <SearchForm/>
            </SidebarHeader>
            <SidebarContent>
                <Navigation items={MENU_ITEMS}/>
            </SidebarContent>
            <SidebarFooter>
                <Profile user={data.user}/>
            </SidebarFooter>
        </Sidebar>
    )
}
