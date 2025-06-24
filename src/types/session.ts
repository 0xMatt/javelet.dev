import {User} from "@/types/user";

export interface SessionType {
    id: number
    sid: string
    userId: number | null
    browser: string
    os: string
    device: string
    engine: string
    isBot: boolean
    location: string
    ip: string
    lastClick: Date
    expiresAt: Date
    user?: User | null
}