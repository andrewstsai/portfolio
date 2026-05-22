import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import PicturePreloader from "@/components/PicturePreloader";
import { pictures } from "@/data/pictures";
import { albums } from "@/data/albums";
import { columnTopIndices } from "@/lib/columnTop";

export function generateStaticParams() {
  return albums.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const album = albums.find((a) => a.slug === slug);
  if (!album) return { title: "Not found" };
  return { title: album.title };
}

export default async function AlbumPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const album = albums.find((a) => a.slug === slug);
  if (!album) notFound();

  const albumPictures = pictures.filter((p) => p.album === slug);
  const priority = columnTopIndices(albumPictures, 3, 4);

  return (
    <>
      <Reveal />
      <section className="mt-8 px-2">
        <Link
          href="/pictures"
          className="text-xs tracking-tight text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-300"
        >
          ← cd . . /
        </Link>
        <h1
          className="mt-4 font-serif text-4xl font-extralight text-neutral-900 dark:text-neutral-100 lg:text-5xl"
          style={{ letterSpacing: "-0.05em", lineHeight: "109%" }}
        >
          {album.title}
        </h1>
        {album.description && (
          <p className="mt-3 max-w-prose text-sm tracking-tight text-neutral-500 dark:text-neutral-400">
            {album.description}
          </p>
        )}
      </section>

      <PicturePreloader />

      <div className="mt-10 columns-1 gap-3 px-2 sm:columns-2 lg:columns-3 [&>*]:mb-3">
        {albumPictures.map((pic, i) => (
          <figure
            key={i}
            data-index={i}
            className="reveal relative overflow-hidden rounded-lg bg-neutral-100 break-inside-avoid dark:bg-neutral-800"
          >
            <Image
              src={pic.src}
              alt={pic.alt}
              width={pic.orientation === "portrait" ? 800 : 1067}
              height={pic.orientation === "portrait" ? 1067 : 800}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="h-auto w-full object-cover"
              priority={priority.has(i)}
              loading={priority.has(i) ? "eager" : "lazy"}
            />
            {pic.caption && (
              <figcaption className="px-3 py-2 text-[10px] uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
                {pic.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </>
  );
}
