import {updateSession} from '@/services/supabase/middleware'
import {NextRequest} from "next/server";

export async function middleware(request: NextRequest) {
    return await updateSession(request)
}


export const config = {
    // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};