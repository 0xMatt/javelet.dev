import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import { BlogStory } from '@/types/blog';
import { FileText } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function Story({ stories }: { stories: BlogStory[] }) {
  const [open, setOpen] = useState(false);

  const click = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOpen((open) => !open);
  };
  return (
    <>
      <Button variant="link" className="inline-flex" onClick={click}>
        <FileText size={16} className="mt-0.5 mr-2" /> {stories.length}
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Stories">
            {stories.map((story, index) => (
              <CommandItem key={index}>{story.title}</CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Actions"></CommandGroup>
        </CommandList>
        <CommandInput placeholder="New Story Title" />
        <Button>Create</Button>
      </CommandDialog>
    </>
  );
}
