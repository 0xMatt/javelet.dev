'use client';
import Form from 'next/form';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useActionState } from 'react';
import { Button } from '@/components/ui/button';
import { profile, ProfileActionResponse } from '@/app/user/actions';
import { useSession } from '@/lib/session-context';

const initialState: ProfileActionResponse = {
  success: false,
  message: '',
  payload: null,
};

export default function Profile() {
  const [state, action, pending] = useActionState(profile, initialState);

  const session = useSession();

  return (
    <div className="flex w-full flex-col gap-4 overflow-y-auto px-4 text-sm">
      <Form className="flex w-full flex-col gap-4" action={action} id="form">
        <div className="flex flex-col gap-3">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            type="text"
            name="name"
            defaultValue={state?.payload?.name ? state?.payload?.name : session?.user?.username}
          />
          {state?.errors?.name && (
            <p id="title-error" className="text-sm text-red-400">
              {state.errors.name[0]}
            </p>
          )}
        </div>
      </Form>
      <Button type="submit" form="form">
        {pending ? 'Updating...' : 'Update'}
      </Button>
    </div>
  );
}
