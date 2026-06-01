import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import { projects } from "@/data/projects";

export const metadata = { title: "Things I've built recently" };

export default function ProjectsIndex() {
  return (
    <>
      <Reveal />
      <section className="mt-8 px-2">
        <h1
          className="font-serif text-4xl font-extralight text-neutral-900 dark:text-neutral-100 lg:text-5xl"
          style={{ letterSpacing: "-0.05em", lineHeight: "109%" }}
        >
          Things I&apos;ve built recently
        </h1>
      </section>

      <ul className="mt-10 grid grid-cols-1 gap-3 px-2 md:grid-cols-2">
        {projects.map((p) => (
          <li key={p.slug} className="reveal">
            <Link
              href={`/projects/${p.slug}`}
              className="group block overflow-hidden rounded-lg bg-neutral-50 transition-colors hover:bg-neutral-100 dark:bg-neutral-900 dark:hover:bg-neutral-800"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  unoptimized
                />
              </div>
              <div className="p-5">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="text-sm font-medium tracking-tight text-neutral-800 dark:text-neutral-200">
                    {p.title}
                  </p>
                  {p.year && (
                    <span className="text-xs tabular-nums text-neutral-400 dark:text-neutral-500">
                      {p.year}
                    </span>
                  )}
                </div>
                <p className="mt-1 line-clamp-2 text-xs tracking-tight text-neutral-500 dark:text-neutral-400">
                  {p.blurb}
                </p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
