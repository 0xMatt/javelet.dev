export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex grow flex-col px-4">
      <section className="grid grid-cols-[minmax(0px,1fr)_min(calc(var(--breakpoint-md)-10rem),100%)_minmax(0px,1fr)] gap-y-6">
        {children}
      </section>
    </div>
  );
}
