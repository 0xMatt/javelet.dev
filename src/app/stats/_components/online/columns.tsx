'use client';

import { ColumnDef } from '@tanstack/react-table';
import { BadgeCheckIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { User } from '@/types/user';
import { SessionType } from '@/types/session';
import { getRelativeDate } from '@/lib/utils';

export const columns: ColumnDef<SessionType>[] = [
  {
    accessorKey: 'userId',
    header: () => <div>User</div>,
    cell: ({ row }) => {
      let username = 'Guest';
      const user = row.original.user as User;
      if (user) {
        username = user.username;
      }
      return (
        <Badge variant="secondary" className="bg-blue-500 text-white dark:bg-blue-600">
          <BadgeCheckIcon /> {username}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'location',
    header: 'Location',
  },
  {
    accessorKey: 'lastClick',
    header: () => <div>Last Click</div>,
    cell: ({ row }) => {
      return getRelativeDate(row.original.lastClick);
    },
  },
];
