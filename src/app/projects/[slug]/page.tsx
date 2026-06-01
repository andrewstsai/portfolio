import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Not found" };
  return { title: project.title, description: project.blurb };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <article className="mt-8 px-2 pb-24">
      <Link
        href="/projects"
        className="text-xs tracking-tight text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300"
      >
        ← cd . . /
      </Link>

      <header className="mt-6">
        <div className="flex items-baseline justify-between gap-4">
          <h1
            className="font-serif text-4xl font-extralight text-neutral-900 dark:text-neutral-100 lg:text-5xl"
            style={{ letterSpacing: "-0.05em", lineHeight: "109%" }}
          >
            {project.title}
          </h1>
          {project.year && (
            <span className="text-sm tabular-nums text-neutral-400 dark:text-neutral-500">
              {project.year}
            </span>
          )}
        </div>
        <p className="mt-3 max-w-prose text-sm tracking-tight text-neutral-500 dark:text-neutral-400">
          {project.blurb}
        </p>
        {project.tags && project.tags.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <li
                key={t}
                className="rounded-full border border-neutral-200 px-3 py-1 text-[10px] uppercase tracking-widest text-neutral-500 dark:border-neutral-700 dark:text-neutral-400"
              >
                {t}
              </li>
            ))}
          </ul>
        )}
      </header>

      <div className="relative mt-10 aspect-[16/9] w-full overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-800">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="100vw"
          className="object-cover"
          priority
          unoptimized
        />
      </div>

      {project.sections && (
        <div className="mt-12 max-w-prose space-y-10">
          <section>
            <h2 className="mb-3 text-[10px] uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
              The Problem
            </h2>
            <p className="text-sm leading-relaxed tracking-tight text-neutral-700 dark:text-neutral-300">
              {project.sections.problem}
            </p>
          </section>

          <div className="border-t border-neutral-200 dark:border-neutral-800" />

          <section>
            <h2 className="mb-3 text-[10px] uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
              How It Works
            </h2>
            <p className="text-sm leading-relaxed tracking-tight text-neutral-700 dark:text-neutral-300">
              {project.sections.howItWorks}
            </p>
          </section>

          <div className="border-t border-neutral-200 dark:border-neutral-800" />

          <section>
            <h2 className="mb-3 text-[10px] uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
              Architecture
            </h2>
            <p className="text-sm leading-relaxed tracking-tight text-neutral-700 dark:text-neutral-300">
              {project.sections.architecture}
            </p>
          </section>
        </div>
      )}

      {!project.sections && project.body && (
        <div className="mt-10 max-w-prose text-sm leading-relaxed tracking-tight text-neutral-700 dark:text-neutral-300">
          {project.body}
        </div>
      )}

      {project.links && project.links.length > 0 && (
        <div className="mt-10 flex flex-wrap gap-3">
          {project.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-neutral-200 px-5 py-2.5 text-sm font-medium tracking-tight text-neutral-700 transition-colors hover:border-neutral-400 hover:text-neutral-900 dark:border-neutral-700 dark:text-neutral-300 dark:hover:border-neutral-500 dark:hover:text-neutral-100"
            >
              {l.label} →
            </a>
          ))}
        </div>
      )}
    </article>
  );
}
