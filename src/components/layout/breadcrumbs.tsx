"use client"

import {usePathname} from 'next/navigation'

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {ChevronsRight, Home} from "lucide-react";
import {MENU_ITEMS} from "@/constants/menu";

const NextBreadcrumb = () => {

    const paths = usePathname() || '';
    const pathNames = paths.split('/').filter(path => path)
    const totalPages = pathNames.length;
    let currentPage = 0;

    return (
        <>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href={'/'}>
                            <Home size={20} className="inline"/> Home
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    {pathNames.length > 0}
                    {
                        pathNames.map((link, index) => {
                            currentPage++;
                            const href = `/${pathNames.slice(0, index + 1).join('/')}`
                            const itemLink = link[0].toUpperCase() + link.slice(1, link.length)
                            const page = MENU_ITEMS.filter(n => {
                                return n.title === itemLink;
                            }).shift();
                            if (typeof page === 'undefined') {
                                return;
                            }
                            return (
                                <>
                                    <BreadcrumbSeparator>
                                        <ChevronsRight/>
                                    </BreadcrumbSeparator>
                                    <BreadcrumbItem key={index}>
                                        {currentPage !== totalPages ?
                                            <BreadcrumbLink href={href}>
                                                <page.icon size={20} className="inline"/>
                                                <span className={"mt-2"}>{itemLink}</span>
                                            </BreadcrumbLink>
                                            :
                                            <BreadcrumbPage>
                                                <page.icon size={20} className="inline"/>
                                                <span className={"mt-3"}>{itemLink}</span>
                                            </BreadcrumbPage>
                                        }
                                    </BreadcrumbItem>
                                </>
                            )
                        })
                    }
                </BreadcrumbList>
            </Breadcrumb>
        </>

    )
}

export default NextBreadcrumb