import { Button } from '@/components/ui/button';
import Link from 'next/link';
import * as React from 'react';

export function GuestProfile() {
  return (
    <div className="flex items-center justify-center gap-3">
      <Link href="/auth/login">
        <Button variant="outline" className="cursor-pointer">
          Sign In
        </Button>
      </Link>
      <Link href="/auth/register">
        <Button className="cursor-pointer">Sign Up</Button>
      </Link>
    </div>
  );
}
