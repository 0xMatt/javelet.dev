"use client"

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useActionState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { createPost } from '@/app/blog/actions';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { CheckCircle2 } from 'lucide-react';
import Form from 'next/form';
import { BlogPostActionResponse } from '@/types/blog';
import { ForwardRefEditor } from '@/components/elements/mdx-editor';
import { MDXEditorMethods } from '@mdxeditor/editor';

const initialState: BlogPostActionResponse = {
    success: false,
    message: '',
}


export default function CreatePostForm() {

  const ref = useRef<MDXEditorMethods>(null)

    const [state, action, pending] = useActionState(createPost, initialState)

    return (
        <Form action={action}>
            {state?.message && (
                <Alert variant={state.success ? "default" : "destructive"}>
                    {state.success && <CheckCircle2 className="h-4 w-4"/>}
                    <AlertDescription>{state.message}</AlertDescription>
                </Alert>
            )}
            <div className="flex flex-1 flex-wrap gap-3">

                <div className="w-full">
                    <Label htmlFor="title">Title</Label>
                    <div
                        className="relative flex gap-2 items-center rounded-md border focus-within:ring-1 focus-within:ring-ring pl-2">
                        <Input
                            id="title"
                            type="text"
                            name="title"
                            className={cn(
                                'border-0 focus-visible:ring-0 shadow-none',
                                state?.errors?.title ? 'border-red-400' : ''
                            )}
                        />
                        {state?.errors?.title && (
                            <p id="title-error" className="text-sm text-red-400">
                                {state.errors.title[0]}
                            </p>
                        )}
                    </div>
                </div>


                <div className="w-full">
                    <Label htmlFor="tags">Tags</Label>
                    <div
                        className="relative flex gap-2 items-center rounded-md border focus-within:ring-1 focus-within:ring-ring pl-2">
                        <Input
                            id="tags"
                            type="text"
                            name="tags"
                            className={cn(
                                'border-0 focus-visible:ring-0 shadow-none',
                                state?.errors?.tags ? 'border-red-400' : ''
                            )}
                        />
                        {state?.errors?.tags && (
                            <p id="tags-error" className="text-sm text-red-400">
                                {state.errors.tags[0]}
                            </p>
                        )}
                    </div>
                </div>
                <div className="w-full">
                    <Label htmlFor="summary">Summary</Label>
                    <div
                        className="relative flex gap-2 items-center rounded-md border focus-within:ring-1 focus-within:ring-ring pl-2">
                        <Input
                            id="summary"
                            type="text"
                            name="summary"
                            className={cn(
                                'border-0 focus-visible:ring-0 shadow-none',
                                state?.errors?.summary ? 'border-red-400' : ''
                            )}
                        />
                        {state?.errors?.summary && (
                            <p id="title-error" className="text-sm text-red-400">
                                {state.errors.summary[0]}
                            </p>
                        )}
                    </div>
                </div>
              <div className="w-full">
                <Label htmlFor="summary">Story</Label>
                <ForwardRefEditor ref={ref} markdown={"#Hello World"} contentEditableClassName="prose"/>
                <input type="hidden" name="story" value={ref.current?.getMarkdown()}/>

                <div
                  className="relative flex gap-2 items-center rounded-md border focus-within:ring-1 focus-within:ring-ring pl-2">
                  {state?.errors?.summary && (
                    <p id="title-error" className="text-sm text-red-400">
                      {state.errors.summary[0]}
                    </p>
                  )}
                </div>
              </div>
                <div className="grid gap-3">
                    <Button
                        type="submit"
                        className="w-full cursor-pointer"
                        disabled={pending}
                    >
                        {pending ? 'Posting...' : 'Post'}
                    </Button>
                </div>
            </div>
        </Form>
    )
}