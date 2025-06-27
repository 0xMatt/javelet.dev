import { columns } from './columns';
import { DataTable } from './data-table';
import prisma from '@/services/prisma';
import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';

export default async function Page() {
  const session = await getSession();
  if (!session?.user?.isAdmin) {
    return redirect('/');
  }

  const data = await prisma.user.findMany({});

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
