import Image from "next/image";
import { benefits, stats } from "../lib/content";
import SectionHeading from "./ui/SectionHeading";

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="border-t border-border bg-background py-24 sm:py-32"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        {/* Image */}
        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80"
              alt="Coach guiding a member through a strength session"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
          {/* Floating stat card */}
          <div className="absolute -bottom-6 -right-4 hidden bg-accent px-7 py-6 sm:block lg:-right-8">
            <p className="display text-4xl text-white">{stats[2].value}</p>
            <p className="mt-1 text-sm font-medium uppercase tracking-wider text-white/80">
              Years forging results
            </p>
          </div>
        </div>

        {/* Copy */}
        <div>
          <SectionHeading
            id="about-heading"
            eyebrow="About IronForge"
            title="A gym built for people who are done starting over."
            description="For eight years we've helped over a thousand members in the heart of the city get genuinely stronger. No fads, no intimidation — just expert coaching, serious equipment and a room full of people chasing the same thing you are."
          />

          <ul className="mt-10 space-y-6">
            {benefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <li key={benefit.title} className="flex gap-4">
                  <span className="mt-0.5 grid h-11 w-11 shrink-0 place-items-center bg-accent-soft text-accent">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold uppercase tracking-wide text-foreground">
                      {benefit.title}
                    </h3>
                    <p className="mt-1 leading-relaxed text-muted">
                      {benefit.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
