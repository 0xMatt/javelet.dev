'use client';

import { useIsMobile } from '@/hooks/use-mobile';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import Form from 'next/form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { useActionState } from 'react';
import { createPost } from '@/app/blog/actions';
import { BlogPostActionResponse, BlogPostBasicData } from '@/types/blog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2 } from 'lucide-react';

const initialState: BlogPostActionResponse = {
  success: false,
  message: '',
};

export default function PostDrawer({ item }: { item?: BlogPostBasicData }) {
  const [state, action, pending] = useActionState(createPost, initialState);

  const isMobile = useIsMobile();

  return (
    <Drawer direction={isMobile ? 'bottom' : 'right'}>
      <DrawerTrigger asChild>
        <Button
          variant={item?.title ? 'link' : 'default'}
          className={cn('text-foreground w-fit text-left', item?.title ? 'px-0' : '')}
        >
          {item?.title ? item.title : 'Create'}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>{item?.title}</DrawerTitle>
          <DrawerDescription>Quickly edit your post details</DrawerDescription>
          {state?.message && (
            <Alert variant={state.success ? 'default' : 'destructive'}>
              {state.success && <CheckCircle2 className="h-4 w-4" />}
              <AlertDescription>{state.message}</AlertDescription>
            </Alert>
          )}
        </DrawerHeader>
        <div className="flex flex-col gap-4 overflow-y-auto px-4 text-sm">
          <Form className="flex flex-col gap-4" action={action} id="form">
            <div className="flex flex-col gap-3">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                type="text"
                name="title"
                defaultValue={item ? item.title : state?.payload?.title}
              />
              {state?.errors?.title && (
                <p id="title-error" className="text-sm text-red-400">
                  {state.errors.title[0]}
                </p>
              )}
            </div>
            {item && (
              <div className="flex flex-col gap-3">
                <Label htmlFor="slug">Slug</Label>
                <Input id="slug" defaultValue={item.slug} disabled />
              </div>
            )}
            <div className="flex flex-col gap-3">
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                type="text"
                name="tags"
                defaultValue={item ? item.tags : state?.payload?.tags}
              />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="summary">Summary</Label>
              <Textarea
                id="summary"
                name="summary"
                defaultValue={item ? item.summary : state?.payload?.summary}
              />
            </div>
            <input type="hidden" name="slug" defaultValue={item?.slug} />
          </Form>
        </div>
        <DrawerFooter>
          <Button type="submit" form="form">
            {item ? (pending ? 'Updating...' : 'Update') : pending ? 'Creating...' : 'Create'}
          </Button>
          {/*<DrawerClose asChild>
            <Button variant="outline">Done</Button>
          </DrawerClose>*/}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
