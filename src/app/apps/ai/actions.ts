'use server';

import { z } from 'zod';
import OpenAI from 'openai';

const schema = z.object({
  text: z.string().min(5, 'Ask a question with at least 5 characters.'),
});

interface AIForm {
  text: string;
}

export interface AIActionResponse {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof AIForm]?: string[];
  };
  payload?: AIForm | null;
}

export async function ask(
  prevState: AIActionResponse | null,
  formData: FormData,
): Promise<AIActionResponse> {
  const rawData: AIForm = {
    text: formData.get('text') as string,
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

  const client = new OpenAI();

  const response = await client.responses.create({
    model: 'gpt-4.1',
    input: validatedData.data.text,
  });

  return {
    success: true,
    message: response.output_text,
  };
}
