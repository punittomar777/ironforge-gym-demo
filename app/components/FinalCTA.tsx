import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Button from "./ui/Button";

export default function FinalCTA() {
  return (
    <section aria-labelledby="cta-heading" className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=2000&q=80"
          alt="Weight plates racked in a gym"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-background/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/70" />
      </div>

      <div className="mx-auto max-w-3xl px-5 py-28 text-center sm:px-8 sm:py-36">
        <p className="eyebrow flex justify-center">Your first rep starts here</p>
        <h2
          id="cta-heading"
          className="display mt-5 text-4xl text-foreground sm:text-6xl"
        >
          Ready to become stronger?
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted">
          Book a free tour, meet the coaches and see the floor for yourself. No
          pressure, no contracts — just the first step toward the strongest version
          of you.
        </p>
        <div className="mt-9 flex justify-center">
          <Button href="#contact" size="lg">
            Start Your Journey
            <ArrowRight className="h-5 w-5" aria-hidden />
          </Button>
        </div>
      </div>
    </section>
  );
}
