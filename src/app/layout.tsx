import type { Metadata } from "next";
import { Crimson_Pro } from "next/font/google";
import { site } from "@/data/site";
import Nav from "@/components/Nav";
import "./globals.css";

const crimson = Crimson_Pro({
  subsets: ["latin"],
  variable: "--font-crimson",
  display: "swap",
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: `${site.name} — ${site.tagline}`,
  metadataBase: new URL(site.url),
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon",        type: "image/png", sizes: "32x32" },
    ],
  },
  openGraph: {
    type: "website",
    url: site.url,
    title: `${site.name} — ${site.tagline}`,
    siteName: site.name,
    images: [{ url: "/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={crimson.variable} suppressHydrationWarning>
      <head>
        <script defer src="https://cloud.umami.is/script.js" data-website-id="7791e0c4-ea4e-48af-bfe2-76f48e3ef320"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})()`,
          }}
        />
      </head>
      <body suppressHydrationWarning className="bg-white text-neutral-900 transition-colors duration-200 dark:bg-neutral-950 dark:text-neutral-100">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:rounded focus:bg-neutral-900 focus:px-4 focus:py-2 focus:text-sm focus:text-white focus:no-underline"
        >
          Skip to main content
        </a>
        <main className="site-main mx-auto w-full max-w-screen-sm min-h-[100lvh] pb-[env(safe-area-inset-bottom)] md:max-w-screen-md md:min-h-0 md:pb-0 lg:max-w-screen-lg xl:max-w-screen-2xl md:flex md:h-dvh md:flex-col">
          <Nav />
          <div aria-hidden="true" className="h-[57px] shrink-0" />
          <div id="main-content" tabIndex={-1} className="outline-none" />
          {children}
        </main>
      </body>
    </html>
  );
}
