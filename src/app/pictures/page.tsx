import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { albums } from "@/data/albums";


export const metadata = { title: "Pictures" };

export default function PicturesPage() {
  return (
    <>
      <Reveal />
      <section className="mt-8 px-2">
        <h1
          className="font-serif text-4xl font-extralight text-neutral-900 dark:text-neutral-100 lg:text-5xl"
          style={{ letterSpacing: "-0.05em", lineHeight: "109%" }}
        >
          A small view into my life off the clock
        </h1>
      </section>

      <div className="mt-10 grid grid-cols-2 gap-3 px-2 lg:grid-cols-4">
        {albums.map((album) => (
          <Link key={album.slug} href={`/pictures/${album.slug}`} className="group">
            <figure className="relative aspect-[3/4] overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-800">
              <Image
                src={album.cover}
                alt={album.title}
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-3 py-4">
                <p className="text-sm font-medium tracking-tight text-white">
                  {album.title}
                </p>
              </div>
            </figure>
          </Link>
        ))}
      </div>
    </>
  );
}
