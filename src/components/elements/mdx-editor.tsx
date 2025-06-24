'use client';
import dynamic from 'next/dynamic';
import { forwardRef } from 'react';
import { type MDXEditorMethods, type MDXEditorProps } from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';

const Editor = dynamic(() => import('./mdx-editor-init'), {
  ssr: false,
});

export const ForwardRefEditor = forwardRef<MDXEditorMethods, MDXEditorProps>((props, ref) => (
  <Editor {...props} editorRef={ref} />
));

ForwardRefEditor.displayName = 'ForwardRefEditor';
