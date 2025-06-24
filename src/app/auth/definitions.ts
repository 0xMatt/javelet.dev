import { z } from 'zod';

export const LoginFormSchema = z.object({
  username: z
    .string()
    .min(2, { message: 'Username must be at least 4 characters long.' })
    .trim(),
  password: z
    .string()
    .min(1, { message: 'Password is required to log in, silly' })
    .trim(),
});

export const RegisterFormSchema = z.object({
  username: z
    .string()
    .min(4, { message: 'Name must be at least 4 characters long.' })
    .trim(),
  email: z.string().email({ message: 'Please enter a valid email.' }).trim(),
  password: z
    .string()
    .min(8, { message: 'Be at least 8 characters long' })
    .regex(/[a-zA-Z]/, { message: 'Contain at least one letter.' })
    .regex(/[0-9]/, { message: 'Contain at least one number.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Contain at least one special character.',
    })
    .trim(),
  password2: z
    .string()
    .trim(),
}).refine((data) => data.password === data.password2, {
  message: 'Passwords don\'t match',
  path: ['password2'],
});


export type FormState =
  | {
  errors?: {
    username?: string[]
    email?: string[]
    password?: string[]
  }
  message?: string
}
  | undefined