import {Button} from "@/components/ui/button";
import {Sheet, SheetContent, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import {Menu} from "lucide-react";
import TopMenu from "@/components/layout/top/menu";

export const NavigationSheet = () => {
    return (
        <Sheet>
            <SheetTitle className="sr-only m-0">
                menu
            </SheetTitle>
            <SheetTrigger asChild>
                <Button variant="outline" size="sm">
                    <Menu/>
                </Button>
            </SheetTrigger>
            <SheetContent>
                {/*<Logo/>*/}
                <TopMenu orientation="vertical" className="mt-12"/>
            </SheetContent>
        </Sheet>
    );
};
