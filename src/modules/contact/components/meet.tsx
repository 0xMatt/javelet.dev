import {Calendar, Clock, Video} from "lucide-react";
import {PlaceholderPattern} from "@/components/elements/placeholder-pattern";


const Meet = () => {

    const data = {
        appointmentUrl: 'https://calendar.app.google/3k9LCCMMB7o5Q5QQ8'
    }

    return (
        <div className='space-y-5 pb-2'>
            <h3 className='text-lg font-medium'>Book a Call</h3>
            <a
                href={data.appointmentUrl}
                target='_blank'
                className='relative flex cursor-pointer flex-col space-y-5 rounded-l border px-6 py-5 transition-all duration-300 hover:scale-[101%] hover:shadow-sm'
            >
                <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-300/20 dark:stroke-neutral-100/20" />

                <div className='flex items-start justify-between gap-5 relative'>

                    <div className='space-y-1'>
                        <div className='flex items-center gap-2 text-base font-medium md:text-lg'>
                            <span>Formal Date</span>
                        </div>
                        <p className='text-sm dark:text-neutral-300 md:text-base'>
                            (seal it with a kiss?)
                        </p>
                    </div>
                    <div className='rounded-full border-2 border-neutral-400 p-3'>
                        <Calendar size={22} />
                    </div>
                </div>
                <div className='flex items-center gap-5 text-sm dark:text-neutral-200'>
                    <div className='flex items-center gap-2'>
                        <Clock size={18} />
                        <span>30 Minutes</span>
                    </div>
                    <div className='flex items-center gap-2'>
                        <Video size={18} />
                        <span>Google Meet</span>
                    </div>
                </div>
            </a>
        </div>
    );
};

export default Meet;