'use cache';

import { columns } from './columns';
import { DataTable } from './data-table';
import prisma from '@/services/prisma';
import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';
import { Project } from '@/types/project';
import ProjectDrawer from '@/app/admin/projects/drawer';

export default async function Page() {
  const session = await getSession();
  if (!session?.user?.isAdmin) {
    return redirect('/');
  }

  const data = (await prisma.project.findMany({})) as Project[];

  return (
    <div className="container mx-auto pb-10">
      <div className="flex justify-end pb-2">
        <ProjectDrawer />
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
