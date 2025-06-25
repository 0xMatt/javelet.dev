'use client';

import { usePathname } from 'next/navigation';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import { ChevronsRight, Home } from 'lucide-react';
import { MENU_ITEMS } from '@/constants/menu';

const NextBreadcrumb = () => {
  const paths = usePathname() || '';
  const pathNames = paths.split('/').filter((path) => path);
  const totalPages = pathNames.length;
  let currentPage = 0;

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList key={'bc-' + pathNames[currentPage]}>
          <BreadcrumbItem key={'home'}>
            <BreadcrumbLink
              href={'/'}
              className="inline-flex gap-2"
              aria-label="Navigate to homepage"
            >
              <Home size={18} className="inline" />
            </BreadcrumbLink>
          </BreadcrumbItem>
          {pathNames.length > 0}
          {pathNames.map((link, index) => {
            currentPage++;
            const href = `/${pathNames.slice(0, index + 1).join('/')}`;
            const itemLink = link[0].toUpperCase() + link.slice(1, link.length);
            const page = MENU_ITEMS.find((n) => {
              return n.title === itemLink;
            });

            if (typeof page === 'undefined') {
              return;
            }
            return (
              <div className="inline-flex" key={index}>
                <ChevronsRight size={14} className="mt-1 mr-2" />
                <BreadcrumbItem>
                  {currentPage !== totalPages ? (
                    <BreadcrumbLink href={href} className="mt-0.5 inline-flex gap-2">
                      <page.icon size={18} className="mt-1 inline" />
                      <span>{itemLink}</span>
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage className="mt-0.5 inline-flex gap-2">
                      <page.icon size={18} className="inline" />
                      <span>{itemLink}</span>
                    </BreadcrumbPage>
                  )}
                </BreadcrumbItem>
              </div>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </>
  );
};

export default NextBreadcrumb;
