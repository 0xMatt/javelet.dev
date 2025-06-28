'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useActionState, useState } from 'react';
import { updateStory } from '@/app/admin/posts/actions';
import { BlogPostStoryResponse, Story } from '@/types/blog';
import Form from 'next/form';
import { ForwardRefEditor } from '@/components/elements/mdx-editor';
import { Button } from '@/components/ui/button';

const initialState: BlogPostStoryResponse = {
  success: false,
  message: '',
};

export default function StoryForm({ story }: { story: Story }) {
  const [content, setContent] = useState('');
  const [state, action, pending] = useActionState(updateStory, initialState);
  return (
    <>
      <div className="flex w-3xl flex-col gap-4 overflow-x-auto px-4 text-sm">
        <Form className="flex flex-col gap-4" action={action} id="form">
          <div className="flex flex-col gap-3">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              type="text"
              name="title"
              defaultValue={story ? story.title : state?.payload?.title}
            />
            {state?.errors?.title && (
              <p id="title-error" className="text-sm text-red-400">
                {state.errors.title[0]}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="summary">Content</Label>
            <ForwardRefEditor
              markdown={story.content ? story.content : ''}
              contentEditableClassName="prose"
              onChange={setContent}
            />
            <input type="hidden" name="content" defaultValue={content} />
            <input type="hidden" name="id" defaultValue={story.id} />
          </div>
          <Button type="submit">{pending ? 'Saving...' : 'Save'}</Button>
        </Form>
      </div>
    </>
  );
}
