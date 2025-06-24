import { Separator } from '../ui/separator';
import Link from 'next/link';

type SectionTitleProps = {
  title: string;
  link?: {
    href: string;
    text: string;
    target?: string;
  };
};

const SectionTitle = ({ title, link }: SectionTitleProps) => {
  return (
    <div className="my-5 flex items-center gap-4">
      <Separator className="start-0 basis-3" />
      <span className="text-muted-foreground">{title}</span>
      <Separator className="end-0 flex-1" />
      {typeof link !== 'undefined' && (
        <>
          <span className="text-muted-foreground">
            <Link
              href={link.href}
              target={link.target ? link.target : '_self'}
              className="hover:underline"
            >
              {link.text}
            </Link>
          </span>
          <Separator className="basis-3" />
        </>
      )}
    </div>
  );
};

export default SectionTitle;
