import { Check } from "lucide-react";
import { plans } from "../lib/content";
import Button from "./ui/Button";
import SectionHeading from "./ui/SectionHeading";

const inr = new Intl.NumberFormat("en-IN");

export default function Membership() {
  return (
    <section
      id="membership"
      aria-labelledby="membership-heading"
      className="border-t border-border bg-background py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          id="membership-heading"
          eyebrow="Membership"
          title="Pick a plan. Start this week."
          description="Straightforward monthly pricing with no joining fee. Upgrade, downgrade or pause whenever you need — commitment to your goals, not to fine print."
          align="center"
        />

        <div className="mt-16 grid items-start gap-8 lg:grid-cols-3">
          {plans.map((plan) => {
            const featured = plan.featured;
            return (
              <div
                key={plan.name}
                className={[
                  "relative flex flex-col p-8",
                  featured
                    ? "bg-surface-2 ring-1 ring-accent lg:-mt-6 lg:pb-14 lg:pt-14"
                    : "border border-border bg-surface",
                ].join(" ")}
              >
                {featured && (
                  <span className="absolute -top-3 left-8 bg-accent px-3 py-1 font-display text-xs font-semibold uppercase tracking-widest text-white">
                    Most popular
                  </span>
                )}

                <h3 className="font-display text-xl font-semibold uppercase tracking-wide text-foreground">
                  {plan.name}
                </h3>
                <p className="mt-2 text-sm text-subtle">{plan.tagline}</p>

                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-lg text-muted">₹</span>
                  <span className="display text-5xl text-foreground">
                    {inr.format(plan.price)}
                  </span>
                  <span className="text-sm text-subtle">{plan.period}</span>
                </div>

                <ul className="mt-8 flex-1 space-y-3.5 border-t border-border pt-7">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <Check
                        className={[
                          "mt-0.5 h-4 w-4 shrink-0",
                          featured ? "text-accent" : "text-subtle",
                        ].join(" ")}
                        aria-hidden
                      />
                      <span className="text-muted">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  href="#contact"
                  size="lg"
                  variant={featured ? "primary" : "secondary"}
                  className="mt-8 w-full"
                >
                  {plan.cta}
                </Button>
              </div>
            );
          })}
        </div>

        <p className="mt-10 text-center text-sm text-subtle">
          Prices in INR. All plans include a free facility tour and fitness assessment.
        </p>
      </div>
    </section>
  );
}
