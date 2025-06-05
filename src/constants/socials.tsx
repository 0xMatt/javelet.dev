import {SocialItem} from "@/types/social";
import {AtSign, Github, Linkedin, Phone} from "lucide-react";

export const SOCIAL_ITEMS: Array<SocialItem> = [
    {
        name: "Phone",
        href: "tel:501-293-4512",
        icon: Phone,
        color: {
            light: 'bg-emerald-500',
            dark: 'bg-emerald-700'
        }
    },
    {
        name: "Email",
        href: "mailto:matthew.javelet@gmail.com",
        icon: AtSign,
        color: {
            light: 'bg-red-500',
            dark: 'bg-red-700'
        }
    },
    {
        name: "Github",
        href: "https://github.com/0xMatt",
        icon: Github,
        class: 'border-white-500 dark:border-white-700',
        color: {
            light: 'bg-zinc-500',
            dark: 'bg-zinc-700'
        }
    },
    {
        name: "Linkedin",
        href: "https://www.linkedin.com/in/matthew-javelet/",
        icon: Linkedin,
        color: {
            light: 'bg-blue-500',
            dark: 'bg-blue-700'
        }
    },
]