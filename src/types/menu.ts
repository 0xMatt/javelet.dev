import type {LucideIcon} from "lucide-react";

export type MenuItem = {
    title: string
    url: string
    icon: LucideIcon
    isActive?: boolean
    items?: {
        title: string
        url: string
    }[]
};