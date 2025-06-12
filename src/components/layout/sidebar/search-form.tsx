"use client"

import {CreditCard, Search, Settings, User} from "lucide-react"

import {Label} from "@/components/ui/label"
import {SidebarGroup, SidebarGroupContent, SidebarInput,} from "@/components/ui/sidebar"

import React, {useState} from "react";

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"
import {MENU_ITEMS} from "@/constants/menu";
import Link from "next/link";

export function SearchForm({...props}: React.ComponentProps<"form">) {

    const [open, setOpen] = useState(false);
    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }
        const click = (e: MouseEvent) => {
            if (e.type === 'click' && document.getElementById('search')?.contains(e.target as Node)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }
        document.addEventListener("keydown", down)
        document.addEventListener("click", click)
        return () => document.removeEventListener("keydown", down)
    }, [])

    return (
        <form {...props}>
            <SidebarGroup className="py-0">
                <SidebarGroupContent className="relative">
                    <kbd
                        className="absolute right-4 top-1.5 size-8 bg-muted text-muted-foreground pointer-events-none inline-flex h-5 items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 select-none">
                        <span className="text-xs">⌘k</span>
                    </kbd>
                    <Label htmlFor="search" className="sr-only">
                        SearchForm
                    </Label>
                    <SidebarInput
                        id="search"
                        className="pl-12"
                    />
                    <Search
                        className="pointer-events-none absolute top-1/2 left-2 size-4 -translate-y-1/2 opacity-50 select-none"/>
                </SidebarGroupContent>
            </SidebarGroup>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Type a command or search..."/>
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Pages">
                        {MENU_ITEMS.map((item) => (
                            <Link href={item.url} key={item.title}>
                                <CommandItem key={item.title} className={"cursor-pointer"}>
                                    <item.icon/>
                                    <span>{item.title}</span>
                                </CommandItem>
                            </Link>
                        ))}
                    </CommandGroup>
                    <CommandSeparator/>
                    <CommandGroup heading="Settings">
                        <CommandItem>
                            <User/>
                            <span>Profile</span>
                            <CommandShortcut>⌘P</CommandShortcut>
                        </CommandItem>
                        <CommandItem>
                            <CreditCard/>
                            <span>Billing</span>
                            <CommandShortcut>⌘B</CommandShortcut>
                        </CommandItem>
                        <CommandItem>
                            <Settings/>
                            <span>Settings</span>
                            <CommandShortcut>⌘S</CommandShortcut>
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </form>
    )
}
