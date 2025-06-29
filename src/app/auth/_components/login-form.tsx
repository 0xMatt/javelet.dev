'use client';

import { useActionState, useState } from 'react';
import { AlertCircleIcon, EyeIcon, EyeOffIcon, Lock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { login } from '@/app/auth/actions';
import Link from 'next/link';
import Form from 'next/form';
import { LoginActionResponse } from '@/types/user';
import { Alert, AlertDescription } from '@/components/ui/alert';

const initialState: LoginActionResponse = {
  success: false,
  message: '',
  payload: null,
};

export default function LoginForm() {
  const [state, action, pending] = useActionState(login, initialState);
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className="flex-col gap-6">
        <Card className="relative">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Welcome back</CardTitle>
            <CardDescription>
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Login with your
                </span>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            {state?.message && (
              <Alert variant="destructive">
                <AlertCircleIcon />
                <AlertDescription className="text-xs">{state.message}</AlertDescription>
              </Alert>
            )}
            <Form action={action}>
              <div className="mt-3 grid gap-6">
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="username">Username</Label>
                    <div className="focus-within:ring-ring relative flex items-center gap-2 rounded-md border pl-2 focus-within:ring-1">
                      <User
                        size={14}
                        className={cn(
                          'text-muted-foreground h-5 w-5',
                          state?.errors?.username ? 'text-red-400 ring-0' : '',
                        )}
                      />
                      <Input
                        id="username"
                        type="text"
                        name="username"
                        placeholder="bingus"
                        defaultValue={state.payload?.username || ''}
                        className="border-0 shadow-none focus-visible:ring-0"
                      />
                    </div>
                    {state?.errors?.username && (
                      <p id="title-error" className="text-xs text-red-400">
                        {state.errors.username}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-3">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                      <a href="#" className="ml-auto text-xs underline-offset-4 hover:underline">
                        Forgot your password?
                      </a>
                    </div>
                    <div className="focus-within:ring-ring relative flex items-center gap-2 rounded-md border px-2 focus-within:ring-1">
                      <Lock
                        size={14}
                        className={cn(
                          'text-muted-foreground h-5 w-5',
                          state?.errors?.password ? 'text-red-400 ring-0' : '',
                        )}
                      />
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        defaultValue={state.payload?.password || ''}
                        className="border-0 shadow-none focus-visible:ring-0"
                      />
                      <button onClick={togglePasswordVisibility} tabIndex={-1}>
                        {showPassword ? (
                          <EyeOffIcon className="text-muted-foreground h-5 w-5" />
                        ) : (
                          <EyeIcon className="text-muted-foreground h-5 w-5" />
                        )}
                      </button>
                    </div>
                    {state?.errors?.password && (
                      <p id="title-error" className="text-xs text-red-400">
                        {state.errors.password}
                      </p>
                    )}
                  </div>
                  <Button type="submit" className="w-full cursor-pointer" disabled={pending}>
                    {pending ? 'Logging in...' : 'Log In'}
                  </Button>
                  <div className="text-center text-sm">
                    Don&apos;t have an account?{' '}
                    <Link href="/auth/register" className="underline underline-offset-4">
                      Register
                    </Link>
                  </div>
                </div>
              </div>
            </Form>
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
        <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
          By clicking continue, you agree to our <a href="#">Terms of Service</a> and{' '}
          <a href="#">Privacy Policy</a>.
        </div>
      </div>
    </>
  );
}
