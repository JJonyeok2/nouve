export function PageHeading({ eyebrow, title }: { eyebrow?: string; title: string }) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16">
      {eyebrow ? (
        <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-primary)]">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="mt-3 text-3xl font-semibold">{title}</h1>
    </section>
  );
}

export function AdminHeading({ title }: { title: string }) {
  return (
    <section>
      <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-text-secondary)]">
        Operations
      </p>
      <h1 className="mt-2 text-3xl font-semibold">{title}</h1>
    </section>
  );
}

