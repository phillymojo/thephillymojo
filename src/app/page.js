import Link from "next/link";
import HomeFunCards from "@/components/HomeFunCards";

const FEATURE_LINKS = [
  {
    href: "/dashboard",
    title: "Dashboard",
    description: "Your command center for schedules, widgets, and activity.",
    cta: "Open dashboard",
  },
  {
    href: "/backgammon",
    title: "Backgammon",
    description: "Play a quick round with a cleaner board experience.",
    cta: "Play backgammon",
  },
  {
    href: "/snake",
    title: "Snake",
    description: "A fast break game that works smoothly on mobile.",
    cta: "Play snake",
  },
];

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,_rgba(14,116,144,0.14),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.12),_transparent_30%)]" />

      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
        <section className="gradient-hero fade-up rounded-3xl p-6 sm:p-8">
          <p className="mb-3 inline-flex rounded-full border border-white/50 bg-white/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-700">
            thephillymojo
          </p>
          <h1 className="max-w-3xl text-3xl font-semibold leading-tight text-slate-900 sm:text-4xl">
            A cleaner, smarter personal hub built for both desktop and mobile.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-700 sm:text-base">
            Quick access to your dashboard and games, with a lighter visual system and better spacing on small screens.
          </p>
        </section>

        <section className="fade-up mt-8" style={{ animationDelay: "60ms" }}>
          <h2 className="mb-4 text-lg font-semibold text-slate-900 md:text-xl">Jump In</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURE_LINKS.map((item) => (
              <article key={item.href} className="soft-surface rounded-2xl p-5">
                <h3 className="text-base font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-700">{item.description}</p>
                <Link
                  href={item.href}
                  className="mt-5 inline-flex items-center rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
                >
                  {item.cta}
                </Link>
              </article>
            ))}
          </div>
        </section>

        <div className="mt-8">
          <HomeFunCards />
        </div>
      </div>
    </div>
  );
}
