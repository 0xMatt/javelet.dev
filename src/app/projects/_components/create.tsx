'use client';

import Form from 'next/form';
import { Label } from '@/components/ui/label';
import { AlertCircleIcon, FolderPen, Github, Link2, Mail } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useActionState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { createProject } from '@/app/projects/actions';
import { Textarea } from '@/components/ui/textarea';
import { ProjectActionResponse } from '@/types/project';
import { Alert, AlertDescription } from '@/components/ui/alert';

const initialState: ProjectActionResponse = {
  success: false,
  message: '',
  payload: null,
  errors: {},
};

export default function CreateProjectForm() {
  const [state, action, pending] = useActionState(createProject, initialState);

  const errors = [];
  for (const key in state.errors) {
    if (Object.prototype.hasOwnProperty.call(state.errors, key)) {
      errors.push(state.errors[key as keyof typeof state.errors]);
    }
  }

  return (
    <Form action={action}>
      {errors.length !== 0 && (
        <Alert variant="destructive">
          <AlertCircleIcon />
          <AlertDescription>
            <p className="text-xs">Errors encountered:</p>
            <ul className="list-inside list-disc text-sm">
              {errors.map((error, key) => (
                <li key={key}>{error}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}
      <div className="grid grid-cols-3 gap-5">
        <div className="grid gap-3">
          <Label htmlFor="name">Name</Label>
          <div className="focus-within:ring-ring relative flex items-center gap-2 rounded-md border pl-2 focus-within:ring-1">
            <FolderPen size={14} className="text-muted-foreground h-5 w-5" />
            <Input
              id="name"
              type="text"
              name="name"
              defaultValue={state.payload?.name || ''}
              className={cn(
                'border-0 shadow-none focus-visible:ring-0',
                state?.errors?.name ? 'border-red-400' : '',
              )}
            />
          </div>
        </div>
        <div className="grid gap-3">
          <Label htmlFor="website">Website</Label>
          <div className="focus-within:ring-ring relative flex items-center gap-2 rounded-md border pl-2 focus-within:ring-1">
            <Link2 size={14} className="text-muted-foreground h-5 w-5" />
            <Input
              id="website"
              type="text"
              name="website"
              defaultValue={state.payload?.website || ''}
              className={cn(
                'border-0 shadow-none focus-visible:ring-0',
                state?.errors?.website ? 'border-red-400' : '',
              )}
            />
          </div>
        </div>
        <div className="grid gap-3">
          <Label htmlFor="repository">Repository</Label>
          <div className="focus-within:ring-ring relative flex items-center gap-2 rounded-md border pl-2 focus-within:ring-1">
            <Github size={14} className="text-muted-foreground h-5 w-5" />
            <Input
              id="repository"
              type="text"
              name="repository"
              defaultValue={state.payload?.repository || ''}
              className={cn(
                'border-0 shadow-none focus-visible:ring-0',
                state?.errors?.repository ? 'border-red-400' : '',
              )}
            />
          </div>
        </div>
      </div>
      <br />
      <div className="grid gap-3">
        <Label htmlFor="summary">Summary</Label>
        <div className="focus-within:ring-ring relative flex items-center gap-2 rounded-md border pl-2 focus-within:ring-1">
          <Mail size={14} className="text-muted-foreground h-5 w-5" />
          <Textarea
            id="summary"
            name="summary"
            cols={30}
            defaultValue={state.payload?.summary || ''}
            className={cn(
              'h-30 border-0 shadow-none focus-visible:ring-0',
              state?.errors?.summary ? 'border-red-400' : '',
            )}
          />
        </div>
      </div>
      <br />
      <div className="grid gap-3">
        <Button type="submit" disabled={pending}>
          {pending ? 'Creating...' : 'Create'}
        </Button>
      </div>
    </Form>
  );
}
