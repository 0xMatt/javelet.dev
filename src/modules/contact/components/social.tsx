import {Button} from "@/components/ui/button";
import {SOCIAL_ITEMS} from "@/constants/socials";
import {cn} from "@/lib/utils";


const Social = () => {

    return (
        <div className='pb-2'>
            <h3 className='text-lg font-medium py-3'>Fastest methods to reach me</h3>
            <div className='flex flex-col justify-between gap-2 md:flex-row'>
                {SOCIAL_ITEMS.map((item) => (
                    <Button key={item.name} size="sm"
                        className={cn(
                            "flex flex-1 items-center justify-center transition-all duration-300 hover:scale-105 w-full dark:text-white",
                            item.color.light,
                            "dark:" + item.color.dark,
                            "hover:" + item.color.light,
                            "hover:dark:" + item.color.dark,
                        )}
                    >
                        <item.icon/> {item.name}
                    </Button>
                    ))}
            </div>
        </div>
    );
};

export default Social;