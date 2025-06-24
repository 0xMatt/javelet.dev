'use client';

import { useActionState, useState } from 'react';
import { AlertCircleIcon, EyeIcon, EyeOffIcon, Lock, Mail, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { register } from '@/app/auth/actions';
import Link from 'next/link';
import Form from 'next/form';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { RegisterActionResponse } from '@/types/user';

const initialState: RegisterActionResponse = {
  success: false,
  message: '',
  payload: null,
};

export default function RegisterForm() {
  const [state, action, pending] = useActionState(register, initialState);
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className={'flex flex-col gap-6'}>
        <Card className="relative">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Welcome</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            <Form action={action}>
              <div className="grid gap-6">
                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                  <span className="bg-card text-muted-foreground relative z-10 px-2">
                    Register a new account
                  </span>
                </div>
                <div className="grid gap-6">
                  {state?.message && (
                    <Alert variant="destructive">
                      <AlertCircleIcon />
                      <AlertDescription className="text-xs">{state.message}</AlertDescription>
                    </Alert>
                  )}
                  <div className="grid gap-3">
                    <Label htmlFor="username">Username</Label>
                    <div className="focus-within:ring-ring relative flex items-center gap-2 rounded-md border pl-2 focus-within:ring-1">
                      <User
                        size={14}
                        className={cn(
                          'text-muted-foreground h-5 w-5',
                          state?.errors?.username ? 'text-red-400/90 ring-0' : '',
                        )}
                      />
                      <Input
                        id="username"
                        type="text"
                        name="username"
                        placeholder="bigus"
                        defaultValue={state.payload?.username || ''}
                        autoComplete={'section-register username'}
                        className={cn(
                          'border-0 shadow-none focus-visible:ring-0',
                          state?.errors?.username ? 'border-1 border-red-400 ring-0' : '',
                        )}
                      />
                    </div>
                    {state?.errors?.username && (
                      <p id="title-error" className="text-xs text-red-400">
                        {state.errors.username}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <div className="focus-within:ring-ring relative flex items-center gap-2 rounded-md border pl-2 focus-within:ring-1">
                      <Mail
                        size={14}
                        className={cn(
                          'text-muted-foreground h-5 w-5',
                          state?.errors?.email ? 'text-red-400/90 ring-0' : '',
                        )}
                      />
                      <Input
                        id="email"
                        type="email"
                        name="email"
                        autoComplete={'section-register email'}
                        placeholder="m@example.com"
                        defaultValue={state.payload?.email || ''}
                        className={cn(
                          'border-0 shadow-none focus-visible:ring-0',
                          state?.errors?.email ? 'border-red-400' : '',
                        )}
                      />
                    </div>
                    {state?.errors?.email && (
                      <p id="title-error" className="text-xs text-red-400">
                        {state.errors.email}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-3">
                    <div className="flex items-center">
                      <Label htmlFor="password">Password</Label>
                    </div>
                    <div className="focus-within:ring-ring relative flex items-center gap-2 rounded-md border px-2 focus-within:ring-1">
                      <Lock
                        size={14}
                        className={cn(
                          'text-muted-foreground h-5 w-5',
                          state?.errors?.password ? 'text-red-400/90 ring-0' : '',
                        )}
                      />
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        autoComplete={'section-register password'}
                        defaultValue={state.payload?.password || ''}
                        className="border-0 shadow-none focus-visible:ring-0"
                        required
                      />
                      <button onClick={togglePasswordVisibility}>
                        {showPassword ? (
                          <EyeOffIcon className="text-muted-foreground h-5 w-5" />
                        ) : (
                          <EyeIcon className="text-muted-foreground h-5 w-5" />
                        )}
                      </button>
                    </div>
                    {state?.errors?.password && (
                      <Alert variant="destructive">
                        <AlertCircleIcon />
                        <AlertDescription>
                          <p className="text-xs">Password must:</p>
                          <ul className="list-inside list-disc text-xs">
                            {state.errors.password.map((error) => (
                              <li key={error} className="text-xs">
                                - {error}
                              </li>
                            ))}
                          </ul>
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                  <div className="grid gap-3">
                    <div className="flex items-center">
                      <Label htmlFor="password2">Confirm Password</Label>
                    </div>
                    <div className="focus-within:ring-ring relative flex items-center gap-2 rounded-md border px-2 focus-within:ring-1">
                      <Lock
                        size={14}
                        className={cn(
                          'text-muted-foreground h-5 w-5',
                          state?.errors?.password2 ? 'text-red-400/90 ring-0' : '',
                        )}
                      />
                      <Input
                        id="password2"
                        name="password2"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        autoComplete={'section-register password'}
                        className="border-0 shadow-none focus-visible:ring-0"
                        defaultValue={state.payload?.password2 || ''}
                      />
                      <button onClick={togglePasswordVisibility}>
                        {showPassword ? (
                          <EyeOffIcon className="text-muted-foreground h-5 w-5" />
                        ) : (
                          <EyeIcon className="text-muted-foreground h-5 w-5" />
                        )}
                      </button>
                    </div>
                    {state?.errors?.password2 && (
                      <p id="title-error" className="text-xs text-red-400">
                        {state.errors.password2}
                      </p>
                    )}
                  </div>
                  <Button
                    type="submit"
                    variant="outline"
                    className="w-full cursor-pointer"
                    disabled={pending}
                  >
                    {pending ? 'Registering...' : 'Register'}
                  </Button>
                </div>
                <div className="text-center text-sm">
                  Already have an account?{' '}
                  <Link href="/auth/login" className="underline underline-offset-4">
                    Log In
                  </Link>
                </div>
              </div>
            </Form>
          </CardContent>
        </Card>
        <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
          By clicking continue, you agree to our <a href="#">Terms of Service</a> and{' '}
          <a href="#">Privacy Policy</a>.
        </div>
      </div>
    </>
  );
}
