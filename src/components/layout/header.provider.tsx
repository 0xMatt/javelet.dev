"use client"

import HeaderSiderbar from "@/components/layout/headers/sidebar";
import {usePathname} from "next/navigation";
import HeaderTop from "@/components/layout/headers/top";

export default function HeaderProvider({children}: { children: React.ReactNode }) {
    if (usePathname().includes("blog")) {
        return (<HeaderTop>{children}</HeaderTop>)
    }
    return (<HeaderSiderbar>{children}</HeaderSiderbar>)
}