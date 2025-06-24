'use server';

import { LoginFormSchema, RegisterFormSchema } from './definitions';
import { redirect } from 'next/navigation';
import bcrypt from 'bcryptjs';
import prisma from '@/services/prisma';
import { addUserToSession, createSession, deleteSession } from '@/lib/session';
import { revalidatePath } from 'next/cache';
import { LoginActionResponse, RegisterActionResponse, RegisterFormData } from '@/types/user';
import { Prisma } from '@prisma/client';

export async function login(
  prevState: LoginActionResponse | null | undefined,
  formData: FormData,
): Promise<LoginActionResponse> {
  const rawData = {
    username: formData.get('username') as string,
    password: formData.get('password') as string,
  };

  const validatedFields = LoginFormSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Please fix the errors in the form',
      errors: validatedFields.error.flatten().fieldErrors,
      payload: rawData,
    };
  }
  const { username, password } = validatedFields.data;
  const user = await prisma.user.findFirst({
    where: {
      username,
    },
  });

  if (user && (await bcrypt.compare(password, user.password))) {
    await createSession();
    await addUserToSession(user.id);
    revalidatePath('/', 'layout');
    return redirect('/');
  }

  return {
    success: false,
    message: 'Invalid credentials, please try again',
  };
}

export async function register(
  prevState: RegisterActionResponse | null | undefined,
  formData: FormData,
): Promise<RegisterActionResponse> {
  const rawData: RegisterFormData = {
    username: formData.get('username') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    password2: formData.get('password2') as string,
  };

  const validatedFields = RegisterFormSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      success: false,
      message: 'Please fix the errors in the form',
      errors: validatedFields.error.flatten().fieldErrors,
      payload: rawData,
    };
  }

  const { username, email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        email: email,
        username: username,
        password: hashedPassword,
        createdAt: new Date(),
      },
    });

    await addUserToSession(user.id);
    return redirect('/');
  } catch (e) {
    let errors = {};
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        errors = {
          username: 'Username is already taken.',
          email: 'Email is already taken.',
        };
      }
    }
    return {
      success: false,
      message: 'An error occurred while creating your account.',
      errors,
    };
  }
}

export async function logout() {
  await deleteSession();
  revalidatePath('/', 'layout');
  redirect('/auth/login');
}
