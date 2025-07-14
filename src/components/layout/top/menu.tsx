import { MENU_ITEMS } from '@/constants/menu';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import Link from 'next/link';
import * as React from 'react';
import { NavigationMenuProps } from '@radix-ui/react-navigation-menu';

export default function TopMenu(props: NavigationMenuProps) {
  return (
    <NavigationMenu viewport={false} {...props}>
      <NavigationMenuList>
        {MENU_ITEMS.map((item) => (
          <NavigationMenuItem key={item.title}>
            {item.items?.length ? (
              <>
                <NavigationMenuTrigger className="inline-flex gap-2">
                  <item.icon size={18} />
                  {item.title}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-2">
                    {item.items?.map((subItem) => (
                      <li className="relative w-[200px]" key={subItem.title}>
                        <NavigationMenuLink key={subItem.title} asChild className="w-full">
                          <Link href={subItem.url} className="inline-flex flex-row align-middle">
                            <span className="mt-0.5 mr-1 align-middle">
                              <subItem.icon />
                            </span>
                            <span className="align-middle"> {subItem.title}</span>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </>
            ) : (
              <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                <Link href={item.url} className="inline-flex flex-row gap-2 align-middle">
                  <item.icon className="text-white" size={16} />
                  {item.title}
                </Link>
              </NavigationMenuLink>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
