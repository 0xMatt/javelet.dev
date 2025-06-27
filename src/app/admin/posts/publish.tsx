import { Badge } from '@/components/ui/badge';
import { BadgeAlert, BadgeCheck } from 'lucide-react';
import { Post } from '@/types/blog';
import { togglePublish } from '@/app/admin/posts/actions';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export default function Publish({ post }: { post: Post }) {
  const [data, setData] = useState(post);

  const toggle = () => {
    const response = togglePublish(post);
    response.then(setData);
  };

  return (
    <Badge
      variant="secondary"
      className={cn(
        'cursor-pointer',
        data.publishedAt ? 'bg-blue-500 dark:bg-blue-600' : 'bg-red-500 dark:bg-red-600',
      )}
      onClick={toggle}
    >
      {data.publishedAt !== null ? (
        <>
          <BadgeCheck /> published
        </>
      ) : (
        <>
          <BadgeAlert /> unpublished
        </>
      )}
    </Badge>
  );
}
