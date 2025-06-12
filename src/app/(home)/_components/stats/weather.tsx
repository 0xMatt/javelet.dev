import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Cloud} from "lucide-react";
import {PlaceholderPattern} from "@/components/elements/placeholder-pattern";
import {LoadingOverlay} from "@/components/elements/loading-overlay";

export default async function Weather() {

    const data = await fetch('http://localhost:3000/api/services/open-weather');
    const weather = await data.json();

    return (
        <Card className="@container/card relative border-sidebar-border/90 dark:border-sidebar-border hover:scale-101">
            <PlaceholderPattern
                className="absolute inset-0 size-full stroke-neutral-300/20 dark:stroke-neutral-100/20"/>
            <CardHeader>
                <CardDescription className={"flex flex-1"}>
                    <Cloud size={13} className={"my-1 mr-2"}/>
                    <span className={"text-sm"}>Weather</span>
                </CardDescription>
                <CardTitle className="text-lg">
                    {weather.main.temp + '\u2109'}
                </CardTitle>
            </CardHeader>
            <LoadingOverlay data={data}/>
        </Card>
    );
};