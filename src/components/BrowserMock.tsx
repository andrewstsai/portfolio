import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  priority?: boolean;
};

export default function BrowserMock({ src, alt, priority }: Props) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-t-xl border border-neutral-200/60 shadow-[0_16px_48px_-8px_rgba(0,0,0,0.18)]">
      <svg
        className="block w-full"
        viewBox="0 0 1288 55"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <path d="M0 0H1288V55H0V0Z" fill="#ffffff" />
        <circle cx="34" cy="28" r="7" fill="#FF5E58" />
        <circle cx="56" cy="28" r="7" fill="#FFBF30" />
        <circle cx="78" cy="28" r="7" fill="#27C840" />
      </svg>
      <div className="relative min-h-0 min-w-full max-w-none flex-1">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 620px"
          priority={priority}
          className="object-cover object-top"
          unoptimized
        />
      </div>
    </div>
  );
}
