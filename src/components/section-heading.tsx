export function SectionHeading({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="mx-auto max-w-[1000px] px-4 text-center">
      <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
      <p className="mt-3 text-base text-primary">- {sub} -</p>
      <hr className="mt-6 border-t-2 border-accent" />
    </div>
  );
}
