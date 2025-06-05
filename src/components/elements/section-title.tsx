import {ChevronRight} from "lucide-react";

type SectionTitleProps = {
    title: string;
    link?: {
        href: string;
        text: string;
    }
}

const SectionTitle = ({title, link}: SectionTitleProps) => {
    return (
        <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-1.5 text-xl font-medium ml-1">
                <h2 className="capitalize">{title}</h2>
            </div>
            {typeof link !== 'undefined' &&
            <div className="flex flex-col justify-between gap-2 lg:flex-row lg:items-center">
                <a href={link.href}>
                    <div
                        className="mt-1 flex cursor-pointer gap-1 text-sm  transition-all duration-300 hover:gap-3">
                        <div className="flex">{link.text}</div>
                        <ChevronRight className="ml-1 mt-1" size={12}/>
                    </div>
                </a>
            </div>
            }
        </div>
    );
}

export default SectionTitle;