import { differentiators } from "../lib/content";
import SectionHeading from "./ui/SectionHeading";

export default function WhyIronForge() {
  return (
    <section
      aria-labelledby="why-heading"
      className="border-t border-border bg-background py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          id="why-heading"
          eyebrow="Why IronForge"
          title="What actually makes the difference."
          description="Plenty of gyms have weights. Here's what you won't find just anywhere — the reasons members stay with us for years."
          align="center"
        />

        <ol className="mt-16 grid gap-x-12 gap-y-12 sm:grid-cols-2">
          {differentiators.map((item, index) => {
            const Icon = item.icon;
            return (
              <li
                key={item.title}
                className="group relative flex gap-6 border-t border-border pt-8"
              >
                <span
                  className="display select-none text-5xl leading-none text-elevated transition-colors duration-300 group-hover:text-accent-soft"
                  aria-hidden
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <div className="mb-3 flex items-center gap-3">
                    <Icon className="h-5 w-5 text-accent" aria-hidden />
                    <h3 className="font-display text-lg font-semibold uppercase tracking-wide text-foreground">
                      {item.title}
                    </h3>
                  </div>
                  <p className="leading-relaxed text-muted">{item.description}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
