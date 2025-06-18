'use client';

import Link, {useLinkStatus} from 'next/link';
import {usePathname} from 'next/navigation';
import clsx from 'clsx';
import {Suspense} from 'react';
import {LucideIcon} from "lucide-react";

export type Item = { text: string; slug?: string; icon: LucideIcon, segment?: string };

export function Tabs({basePath, items}: { basePath: string; items: Item[] }) {
    return (
        <div className="inline-flex shrink items-center gap-0 w-full border-white">
            {items.map((item) => (
                <Tab key={basePath + item.slug} item={item} basePath={basePath}/>
            ))}
        </div>
    );
}

export function Tab({
                        basePath = '',
                        item,
                    }: {
    basePath?: string;
    item: Item;
}) {
    const href = item.slug ? `${basePath}/${item.slug}` : basePath;

    return (
        <Link href={href} className="text-sm font-semibold w-full">
            <Suspense fallback={<TabContent>
                <item.icon size={4} className="size-4 mr-1"/>
                <span className="ml-1">{item.text}</span></TabContent>}>
                <DynamicTabContent href={href}>
                    <item.icon size={18} className="mr-1 mt-0.5"/>
                    {item.text}</DynamicTabContent>
            </Suspense>
        </Link>
    );
}

function DynamicTabContent({
                               children,
                               href,
                           }: {
    children: React.ReactNode;
    href: string;
}) {
    const pathname = usePathname();
    const isActive = pathname === href;
    const {pending: isPending} = useLinkStatus();

    return (
        <TabContent isActive={isActive} isPending={isPending}>
            {children}
        </TabContent>
    );
}

function TabContent({
                        children,
                        isActive,
                        isPending,
                    }: {
    children: React.ReactNode;
    isActive?: boolean;
    isPending?: boolean;
}) {
    return (
        <span
            className={clsx('inline-flex w-full rounded-md px-5 py-3 transition duration-75', {
                'bg-neutral-100 dark:bg-zinc-800 text-zinc-80 dark:text-neutral-100 hover:bg-zinc-700 hover:text-white':
                    !isActive && !isPending,
                'bg-zinc-900 text-white': isActive,
                'bg-gray-600 text-gray-500 delay-75': isPending,
            })}
        >
      {children}
    </span>
    );
}