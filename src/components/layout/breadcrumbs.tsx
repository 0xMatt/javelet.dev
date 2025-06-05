'use client'

import {usePathname} from 'next/navigation'

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
} from "@/components/ui/breadcrumb"
import {Component, Home} from "lucide-react";

const NextBreadcrumb = () => {

    const paths = usePathname()
    const pathNames = paths.split('/').filter(path => path)

    return (
        <>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href={'/'}>
                            <Home className="mr-1 h-4 w-4 inline"/> Home
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    {pathNames.length > 0}
                    {
                        pathNames.map((link, index) => {
                            const href = `/${pathNames.slice(0, index + 1).join('/')}`
                            const itemLink = link[0].toUpperCase() + link.slice(1, link.length)
                            return (
                                <BreadcrumbItem key={index}>
                                    <BreadcrumbLink href={href}>
                                        <Component className="mr-1 h-4 w-4 inline"/> {itemLink}
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                            )
                        })
                    }
                </BreadcrumbList>
            </Breadcrumb>
        </>

    )
}

export default NextBreadcrumb