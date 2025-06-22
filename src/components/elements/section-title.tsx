import {Separator} from "../ui/separator";
import Link from "next/link";

type SectionTitleProps = {
    title: string;
    link?: {
        href: string;
        text: string;
        target?: string
    }
}

const SectionTitle = ({title, link}: SectionTitleProps) => {

    return (
        <div className="flex items-center gap-4 my-5">
            <Separator className="basis-3 start-0"/>
            <span className="text-muted-foreground">{title}</span>
            <Separator className="flex-1 end-0"/>
            {typeof link !== 'undefined' &&
                <>
                    <span className="text-muted-foreground"><Link href={link.href}
                                                                  target={link.target ? link.target : '_self'}
                                                                  className="hover:underline">{link.text}</Link></span>
                    <Separator className="basis-3"/>
                </>
            }
        </div>
    )

    /*    return (
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-1.5 text-xl font-medium ml-1">
                    <h2 className="capitalize">{title}</h2>
                </div>
                {typeof link !== 'undefined' &&
                    <div className="flex flex-col justify-between gap-2 lg:flex-row lg:items-center">
                        <Link href={link.href}>
                            <div
                                className="mt-1 flex cursor-pointer gap-1 text-sm  transition-all duration-300 hover:gap-3">
                                <div className="flex">{link.text}</div>
                                <ChevronRight className="ml-1 mt-1" size={12}/>
                            </div>
                        </Link>
                    </div>
                }
            </div>
        );*/
}

export default SectionTitle;