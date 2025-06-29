'use server';

import prisma from '@/services/prisma';
import { z } from 'zod';
import { getSession } from '@/lib/session';

export interface Profile {
  name: string;
}

export interface ProfileActionResponse {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof Profile]?: string[];
  };
  payload?: Profile | null;
}

const schema = z.object({
  name: z.string().min(2, 'Name is required and must be at least 2 characters.'),
});

export async function profile(
  prevState: ProfileActionResponse | null,
  formData: FormData,
): Promise<ProfileActionResponse> {
  const rawData: Profile = {
    name: formData.get('name') as string,
  };

  // Validate the form data
  const validatedData = schema.safeParse(rawData);

  if (!validatedData.success) {
    return {
      success: false,
      message: 'Please fix the errors in the form',
      errors: validatedData.error.flatten().fieldErrors,
      payload: rawData,
    };
  }

  const session = await getSession();

  try {
    await prisma.user.update({
      where: { id: session?.user?.id },
      data: {
        name: validatedData.data.name,
      },
    });

    return {
      success: true,
      message: 'Profile updated successfully!',
    };
  } catch (e) {
    console.log(e);
    return {
      success: false,
      message: 'An error occurred while updating your profile.',
      payload: rawData,
    };
  }
}
