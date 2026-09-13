import { Check } from "lucide-react";
import { programs } from "../lib/content";
import SectionHeading from "./ui/SectionHeading";

export default function Programs() {
  return (
    <section
      id="programs"
      aria-labelledby="programs-heading"
      className="border-t border-border bg-surface py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          id="programs-heading"
          eyebrow="Programs"
          title="Training with a purpose behind every rep."
          description="Whatever brought you here, there's a program engineered to get you there — each one led by coaches who tailor the work to you."
        />

        <div className="mt-14 grid gap-px overflow-hidden border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {programs.map((program) => {
            const Icon = program.icon;
            return (
              <article
                key={program.title}
                className="group flex flex-col bg-surface p-8 transition-colors duration-300 hover:bg-elevated"
              >
                <span className="grid h-12 w-12 place-items-center bg-accent-soft text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                  <Icon className="h-6 w-6" aria-hidden />
                </span>
                <h3 className="mt-6 font-display text-xl font-semibold uppercase tracking-wide text-foreground">
                  {program.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                  {program.description}
                </p>
                <ul className="mt-6 space-y-2 border-t border-border pt-5">
                  {program.highlights.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-sm text-subtle"
                    >
                      <Check className="h-4 w-4 shrink-0 text-accent" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
