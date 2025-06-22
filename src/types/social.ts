import type {LucideIcon} from "lucide-react";

type SocialItemColor = {
    light: string
    dark: string
}

export type SocialItem = {
    name: string
    link: {
        href: string
        target?: string
    }
    icon: LucideIcon,
    class?: string
    color: SocialItemColor
};