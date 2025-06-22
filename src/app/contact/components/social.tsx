import {Button} from "@/components/ui/button";
import {SOCIAL_ITEMS} from "@/constants/socials";
import {cn} from "@/lib/utils";
import Link from "next/link";

export default function Social() {
    return (
        <div className='pb-2'>
            <div className='flex flex-wrap justify-between gap-2 flex-col'>
                {SOCIAL_ITEMS.map((item) => (
                    <Link href={item.link.href} key={item.name} target={item.link.target ? item.link.target : '_self'}>
                        <Button size="sm"
                                key={item.name}
                                className={cn(
                                    "flex flex-1 items-center justify-center transition-all duration-300 hover:scale-105 w-full dark:text-white",
                                    "transition-all duration-300 hover:scale-105 w-full dark:text-white cursor-pointer",
                                    item.color.light,
                                    "dark:" + item.color.dark,
                                    "hover:" + item.color.light,
                                    "hover:dark:" + item.color.dark,
                                )}
                        >
                            <item.icon/>
                            {item.name}
                        </Button>
                    </Link>
                ))}
            </div>
        </div>
    );
};

