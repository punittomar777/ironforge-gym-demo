import { Quote, Star } from "lucide-react";
import { testimonials } from "../lib/content";
import SectionHeading from "./ui/SectionHeading";

export default function Testimonials() {
  return (
    <section
      aria-labelledby="testimonials-heading"
      className="border-t border-border bg-surface py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          id="testimonials-heading"
          eyebrow="Results"
          title="The proof is in the people."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <figure
              key={testimonial.name}
              className="flex flex-col border border-border bg-background p-8"
            >
              <Quote className="h-8 w-8 text-accent" aria-hidden />
              <div className="mt-4 flex gap-1" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-accent text-accent"
                    aria-hidden
                  />
                ))}
              </div>
              <blockquote className="mt-5 flex-1 text-lg leading-relaxed text-foreground/90">
                {testimonial.quote}
              </blockquote>
              <figcaption className="mt-7 border-t border-border pt-5">
                <p className="font-display font-semibold uppercase tracking-wide text-foreground">
                  {testimonial.name}
                </p>
                <p className="text-sm text-subtle">{testimonial.result}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
