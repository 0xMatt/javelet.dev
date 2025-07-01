'use cache';

import { columns } from './columns';
import { DataTable } from './data-table';
import prisma from '@/services/prisma';
import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import PostDrawer from '@/app/admin/posts/post';
import { Post } from '@/types/blog';

export default async function Page() {
  const session = await getSession();
  if (!session?.user?.isAdmin) {
    return redirect('/');
  }

  const data = (await prisma.post.findMany({
    include: {
      author: true,
      stories: {
        orderBy: {
          id: 'asc',
        },
      },
    },
  })) as Post[];

  return (
    <div className="container mx-auto pb-10">
      <div className="flex justify-end pb-2">
        <PostDrawer />
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
