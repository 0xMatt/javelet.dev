'use client';

import {
  AIInputButton,
  AIInputModelSelect,
  AIInputModelSelectContent,
  AIInputModelSelectItem,
  AIInputModelSelectTrigger,
  AIInputModelSelectValue,
  AIInputSubmit,
  AIInputTextarea,
  AIInputToolbar,
  AIInputTools,
} from '@/components/elements/input-ai';
import { CheckCircle2, GlobeIcon, MicIcon, PlusIcon, SendIcon } from 'lucide-react';
import { useActionState, useState } from 'react';
import { AIActionResponse, ask } from '@/app/apps/ai/actions';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Form from 'next/form';

const models = [
  { id: 'gpt-4', name: 'GPT-4' },
  { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo' },
  { id: 'claude-2', name: 'Claude 2' },
  { id: 'claude-instant', name: 'Claude Instant' },
  { id: 'palm-2', name: 'PaLM 2' },
  { id: 'llama-2-70b', name: 'Llama 2 70B' },
  { id: 'llama-2-13b', name: 'Llama 2 13B' },
  { id: 'cohere-command', name: 'Command' },
  { id: 'mistral-7b', name: 'Mistral 7B' },
];

const initialState: AIActionResponse = {
  success: false,
  message: '',
};

export default function Page() {
  const [model, setModel] = useState<string>(models[0].id);

  const [state, action, pending] = useActionState(ask, initialState);

  return (
    <>
      {state?.message && (
        <Alert variant={state.success ? 'default' : 'destructive'}>
          {state.success && <CheckCircle2 className="h-4 w-4" />}
          <AlertDescription>{state.message}</AlertDescription>
        </Alert>
      )}
      <Form action={action}>
        {state?.errors?.text && (
          <p id="title-error" className="text-sm text-red-400">
            {state.errors.text[0]}
          </p>
        )}
        <AIInputTextarea id="text" name="text" defaultValue={state?.payload?.text} />

        <AIInputToolbar>
          <AIInputTools>
            <AIInputButton>
              <PlusIcon size={16} />
            </AIInputButton>
            <AIInputButton>
              <MicIcon size={16} />
            </AIInputButton>
            <AIInputButton>
              <GlobeIcon size={16} />
              <span>Search</span>
            </AIInputButton>
            <AIInputModelSelect value={model} onValueChange={setModel}>
              <AIInputModelSelectTrigger>
                <AIInputModelSelectValue />
              </AIInputModelSelectTrigger>
              <AIInputModelSelectContent>
                {models.map((model) => (
                  <AIInputModelSelectItem key={model.id} value={model.id}>
                    {model.name}
                  </AIInputModelSelectItem>
                ))}
              </AIInputModelSelectContent>
            </AIInputModelSelect>
          </AIInputTools>
          <AIInputSubmit className={pending ? 'opacity-50' : 'opacity-100'}>
            <SendIcon size={16} />
          </AIInputSubmit>
        </AIInputToolbar>
      </Form>
    </>
  );
}
