import {SocialItem} from "@/types/social";
import {AtSign, Github, Linkedin, Phone} from "lucide-react";

export const SOCIAL_ITEMS: Array<SocialItem> = [
    {
        name: "Phone",
        link: {
            href: "tel:501-293-4512",
        },
        icon: Phone,
        color: {
            light: 'bg-emerald-500',
            dark: 'bg-emerald-700'
        }
    },
    {
        name: "Email",
        link: {
            href: "mailto:matthew.javelet@gmail.com",
        },
        icon: AtSign,
        color: {
            light: 'bg-red-500',
            dark: 'bg-red-700'
        }
    },
    {
        name: "Github",
        link: {
            href: "https://github.com/0xMatt",
            target: '_blank'
        },
        icon: Github,
        class: 'border-white-500 dark:border-white-700',
        color: {
            light: 'bg-zinc-500',
            dark: 'bg-zinc-700'
        }
    },
    {
        name: "Linkedin",
        link: {
            href: "https://www.linkedin.com/in/matthew-javelet/",
            target: '_blank'
        },
        icon: Linkedin,
        color: {
            light: 'bg-blue-500',
            dark: 'bg-blue-700'
        }
    },
]