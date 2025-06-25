import { Tech } from '@/app/colophon/_components/tech';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Colophon',
  description: 'A page meant to provide the transparency of the design of this website.',
};

export default function Page() {
  return (
    <>
      <h2>Tech Stack</h2>
      <p className="text-primary-foreground">
        This website is created with{' '}
        <a
          href="#"
          className="text-foreground/70 hover:text-foreground/60 list-none underline decoration-transparent underline-offset-[3px] transition-colors duration-200 hover:decoration-inherit"
        >
          Next.js
        </a>
        , Tailwind CSS, ShadCN, MDX, Framer Motion and Prisma. It is hosted on Vercel, and if you
        are curious, feel free to explore the source code on GitHub.
      </p>
      <Tech />
      <h2>Typography</h2>
      <p>
        For the website typography, I am only using my favorite font for coding, Source Code Pro.
      </p>
      <div className="border-divider grid border-collapse grid-cols-1 place-items-center items-center border border-dashed sm:grid-cols-2">
        <p className="border-divider w-full border border-dashed p-4 text-center font-sans font-normal">
          Source Code Pro Regular
        </p>
        <p className="border-divider w-full border border-dashed p-4 text-center font-sans font-medium">
          Source Code Pro Medium
        </p>
        <p className="border-divider --font-sans w-full border border-dashed p-4 text-center font-semibold">
          Source Code Pro Semibold
        </p>
        <p className="border-divider font-monospace w-full border border-dashed p-4 text-center font-bold">
          Source Code Pro Bold
        </p>
      </div>
      <h2>Design & Colors</h2>
      <h2>Logo</h2>
      <h2>Carbon Footprint</h2>
      <p>
        This website produces less than 0.11g of CO2 per per visit, according to{' '}
        <a href="https://www.websitecarbon.com/website/javelet-work/" target="_blank">
          Website Carbon Calculator
        </a>
        and
        <a href="https://digitalbeacon.co/report/javelet-work" target="_blank">
          Digital Beacon
        </a>
        , achieving a carbon rating of A 🌳
      </p>
    </>
  );
}
