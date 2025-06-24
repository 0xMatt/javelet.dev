import { PlaceholderPattern } from '@/components/elements/placeholder-pattern';

type PageHeaderProps = {
    header: string | null | undefined;
    description: string | null | undefined;
}

const PageHeader = ({header, description}: PageHeaderProps) => {
    return (
        <div className="flex flex-col justify-items-start mb-3">
            <h1 className=" text-2xl font-medium">{header}</h1>
            <p className="mb-3 pb-3 pt-2">
                {description}
            </p>
            <div
                className="border-sidebar-border/90 dark:border-sidebar-border relative h-10 overflow-hidden rounded-xl border  hover:scale-102 transition-all duration-300">
                <PlaceholderPattern
                    className="absolute inset-0 size-full stroke-neutral-400/20 dark:stroke-neutral-100/20"/>
            </div>
        </div>
    );
}

export default PageHeader;