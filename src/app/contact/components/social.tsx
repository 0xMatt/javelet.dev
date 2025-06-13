import {Button} from "@/components/ui/button";
import {SOCIAL_ITEMS} from "@/constants/socials";
import {cn} from "@/lib/utils";


export default function Social() {
    return (
        <div className='pb-2'>
            <div className='flex flex-wrap justify-items-start gap-2 md:flex-row'>
                {SOCIAL_ITEMS.map((item) => (
                    <Button key={item.name} size="sm"
                            className={cn(
                                "transition-all duration-300 hover:scale-105 w-full dark:text-white",
                                item.color.light,
                                "dark:" + item.color.dark,
                                "hover:" + item.color.light,
                                "hover:dark:" + item.color.dark,
                            )}
                    >
                        <item.icon/>
                        {item.name}
                    </Button>
                ))}
            </div>
        </div>
    );
};

