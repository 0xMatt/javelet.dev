import {SidebarFooter} from "@/components/ui/sidebar"
import {Button} from "@/components/ui/button";
import Link from "next/link";

export function GuestProfile() {

    return (
        <SidebarFooter>
            <form>
                <div className="grid gap-2.5">
                    <Link href="/auth"><Button
                        variant="outline"
                        className="w-full cursor-pointer"
                        size="sm"
                    >
                        Log In / Sign Up
                    </Button></Link>
                </div>
            </form>
        </SidebarFooter>
    )
}
