"use client"

import {usePathname} from "next/navigation";
import HeaderTop from "@/components/layout/headers/top";
import HeaderNone from "@/components/layout/headers/none";
import {HeaderSiderbar} from "@/components/layout/headers/sidebar";

export default function Header({children,}: { children: React.ReactNode; }) {
    const pathname = usePathname();
    if (pathname.includes("blog")) {
        return (<HeaderTop>{children}</HeaderTop>)
    }
    if (pathname.includes("auth")) {
        return (<HeaderNone>{children}</HeaderNone>)
    }
    return (<HeaderSiderbar>{children}</HeaderSiderbar>)
}