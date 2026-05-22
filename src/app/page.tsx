import Reveal from "@/components/Reveal";
import Slideshow from "@/components/Slideshow";
import ExperienceList from "@/components/ExperienceList";
import ContactList from "@/components/ContactList";
import MiniTerminal from "@/components/MiniTerminal";
import RandomPicture from "@/components/RandomPicture";
import { projects } from "@/data/projects";

export default function Home() {
  return (
    /*
     * On desktop the <main> is a dvh-height flex column (see layout.tsx).
     * This wrapper takes the remaining space after the nav with flex-1,
     * and passes it down to the bento grid.
     * On mobile everything is normal document flow (flex-1 has no effect).
     */
    <div className="md:flex md:flex-1 md:min-h-0 md:flex-col md:pb-2">
      <Reveal />
      <div className="bento mt-8 pb-20 md:mt-0 md:pb-0 md:flex-1 md:min-h-0 md:[grid-template-rows:2fr_3fr_2fr]">

        {/* ── Row 1: Hero (3 cols) + About (1 col) ── */}
        <div className="bento-cell reveal col-span-3 flex flex-col justify-center overflow-hidden rounded-lg bg-neutral-100 px-8 py-10 dark:bg-neutral-900 md:p-5 lg:p-8 xl:p-10">
          <h1
            className="font-serif text-3xl font-extralight text-neutral-900 dark:text-neutral-100 lg:text-4xl xl:text-5xl"
            style={{ letterSpacing: "-0.05em", lineHeight: "109%" }}
          >
            Hey, I&apos;m <span className="font-medium">Andrew</span>.
            <br />
            I turn ideas into <em>software</em>,
            <br />
            from napkin sketch to <span className="font-medium">production</span>.
          </h1>
        </div>

        <div className="bento-cell reveal col-span-1 flex flex-col overflow-hidden rounded-lg bg-neutral-100 p-5 dark:bg-neutral-900 md:p-4 lg:p-5">
          <p className="text-xs uppercase tracking-widest text-neutral-800 dark:text-neutral-200">
            About
          </p>
          <p className="mt-3 text-xs leading-relaxed tracking-tight text-neutral-500 dark:text-neutral-400">
            Software engineer based in NYC area, currently at Sirinti building AI-powered prospecting infrastructure.
            Started with Tic-tac-toe in high school, ended up at Northeastern, and stuck around because I like building things end to end, from figuring out what to build to getting it in front of real users.
            Most of my work lately has been in applied AI and full-stack development.
            Off the clock: food, photography, travel. Mostly the kind of travel that revolves around food, photographed badly with a phone and occasionally well with a compact camera.
          </p>
        </div>

        {/* ── Row 2: Experience (2 cols) + Projects slideshow (2 cols) ── */}
        <div className="bento-cell reveal col-span-2 flex flex-col overflow-y-auto rounded-lg bg-neutral-100 p-5 no-scrollbar dark:bg-neutral-900 md:p-4 lg:p-6">
          <p className="text-xs uppercase tracking-widest text-neutral-800 dark:text-neutral-200">
            Experience
          </p>
          <p className="mt-1 text-xs tracking-tight text-neutral-400 dark:text-neutral-500">
            Click any role to expand details.
          </p>
          <ExperienceList />
        </div>

        <div className="bento-cell reveal col-span-2 overflow-hidden rounded-lg bg-neutral-100 dark:bg-neutral-900">
          <Slideshow projects={projects} />
        </div>

        {/* ── Row 3: Contact (2 cols) + Terminal (1 col) + Random photo (1 col) ── */}
        <div className="bento-cell reveal col-span-2 flex flex-col overflow-hidden rounded-lg bg-neutral-100 p-4 dark:bg-neutral-900 lg:p-5">
          <p className="text-xs uppercase tracking-widest text-neutral-800 dark:text-neutral-200">
            Contact
          </p>
          <p className="mt-1 text-xs tracking-tight text-neutral-400 dark:text-neutral-500">
            Feel free to reach out!
          </p>
          <ContactList />
        </div>

        {/* Terminal: absolutely fills the grid cell so content never expands the row */}
        <div className="bento-cell reveal relative col-span-1 overflow-hidden rounded-lg">
          <div className="absolute inset-0">
            <MiniTerminal />
          </div>
        </div>

        <div className="bento-cell reveal relative col-span-1 overflow-hidden rounded-lg bg-neutral-200 dark:bg-neutral-800">
          <RandomPicture />
        </div>

      </div>
    </div>
  );
}
