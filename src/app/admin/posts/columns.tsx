'use client';

import { ColumnDef } from '@tanstack/react-table';
import { BadgeAlert, BadgeCheckIcon, MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Post, Story } from '@/types/blog';
import { User } from '@/types/user';
import PostDrawer from '@/app/admin/posts/post';
import StoryCommand from '@/app/admin/posts/story';

export const columns: ColumnDef<Post>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => {
      return <PostDrawer item={row.original} />;
    },
    enableHiding: false,
  },
  {
    accessorKey: 'tags',
    header: 'Tags',
  },
  {
    accessorKey: 'author',
    header: () => <div>Author</div>,
    cell: ({ row }) => {
      const author = row.getValue('author') as User;
      return (
        <Badge variant="secondary" className="bg-blue-500 text-white dark:bg-blue-600">
          <BadgeCheckIcon /> {author.username}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'stories',
    header: () => <div>Stories</div>,
    cell: ({ row }) => {
      const stories = row.getValue('stories') as Story[];
      return <StoryCommand postId={row.original.id as number} stories={stories} />;
    },
  },
  {
    accessorKey: 'views',
    header: 'Views',
  },
  {
    accessorKey: 'publishedAt',
    header: 'Published',
    cell: ({ row }) => {
      const published = row.getValue('publishedAt');
      if (!published) {
        return (
          <Badge variant="secondary" className="bg-red-500 text-white dark:bg-red-600">
            <BadgeAlert size={'icon'} /> unpublished
          </Badge>
        );
      }
      return (
        <Badge variant="secondary" className="bg-blue-500 text-white dark:bg-blue-600">
          <BadgeCheckIcon /> {published.toString()}
        </Badge>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const post = row.original as Post;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(post.id ? post.id.toString() : '')}
            >
              Copy user ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Post</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive">Delete Post</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
