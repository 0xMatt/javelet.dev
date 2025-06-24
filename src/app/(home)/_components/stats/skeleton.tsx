import { PlaceholderPattern } from '@/components/elements/placeholder-pattern';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ShineBorder } from '@/components/magicui/shine-border';

export default function StatSkeleton() {
  return (
    <Card className="border-sidebar-border/90 dark:border-sidebar-border @container/card relative h-[130px] animate-pulse transition-all duration-300 hover:scale-101">
      <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-300/20 dark:stroke-neutral-100/20" />
      <CardHeader>
        <CardDescription className={'flex flex-1'}>
          <Skeleton className="h-[20px] w-25 rounded-xl" />
        </CardDescription>
        <CardTitle className="text-lg">
          <Skeleton className="h-[30px] w-60 rounded-xl" />
        </CardTitle>
        <div className="line-clamp-1 flex gap-2 font-medium">
          <Skeleton className="h-[20px] w-20 rounded-xl" />{' '}
          <Skeleton className="h-[20px] w-20 rounded-xl" />
        </div>
      </CardHeader>
      <ShineBorder shineColor={['#A07CFE', '#FE8FB5', '#FFBE7B']} />
    </Card>
  );
}
