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
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2 } from 'lucide-react';
import { Project, ProjectActionResponse } from '@/types/project';
import { saveProject } from '@/app/admin/projects/actions';

const initialState: ProjectActionResponse = {
  success: false,
  message: '',
};

export default function ProjectDrawer({ item }: { item?: Project }) {
  const [state, action, pending] = useActionState(saveProject, initialState);

  const isMobile = useIsMobile();

  return (
    <Drawer direction={isMobile ? 'bottom' : 'right'}>
      <DrawerTrigger asChild>
        <Button
          variant={item?.name ? 'link' : 'default'}
          className={cn('text-foreground w-fit text-left', item?.name ? 'px-0' : '')}
        >
          {item?.name ? item.name : 'Create'}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="gap-1">
          <DrawerTitle>{item?.name}</DrawerTitle>
          <DrawerDescription>{!item ? 'Create' : 'Update'} project</DrawerDescription>
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
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                name="name"
                defaultValue={item ? item.name : state?.payload?.name}
              />
              {state?.errors?.name && (
                <p id="title-error" className="text-sm text-red-400">
                  {state.errors.name[0]}
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
              <Label htmlFor="repository">Repository</Label>
              <Input
                id="repository"
                type="text"
                name="repository"
                defaultValue={item ? (item.repository as string) : state?.payload?.repository}
              />
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="repository">Website</Label>
              <Input
                id="website"
                type="text"
                name="website"
                defaultValue={item ? (item.website as string) : state?.payload?.website}
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
