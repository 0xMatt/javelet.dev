import {Button} from "@/components/ui/button";
import Link from "next/link";
import * as React from "react";

export function GuestProfile() {

    return (
        <div className="flex items-center gap-3 justify-center">
            <Link href="/auth">
                <Button variant="outline" className="hidden sm:inline-flex cursor-pointer">
                    Sign In
                </Button>
            </Link>
            <Link href="/auth"><Button className="cursor-pointer">Sign Up</Button></Link>
        </div>
    )
}
