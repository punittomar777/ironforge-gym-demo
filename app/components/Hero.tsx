import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Button from "./ui/Button";
import { stats } from "../lib/content";

export default function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="relative flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* Background image + scrim */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=2000&q=80"
          alt="Athlete training with a barbell in a dark gym"
          fill
          preload
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/60" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-5 pb-16 pt-28 sm:px-8 lg:pt-32">
        <div className="max-w-3xl">
          <p className="eyebrow flex items-center gap-3">
            <span className="h-px w-10 bg-accent" aria-hidden />
            Strength · Discipline · Community
          </p>

          <h1
            id="hero-heading"
            className="display mt-6 text-5xl text-foreground sm:text-6xl lg:text-7xl"
          >
            Transform your body.
            <br />
            <span className="text-accent">Forge</span> your strongest self.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
            IronForge Fitness is where serious training meets real coaching. Expert
            programming, premium equipment and a community that shows up — so you
            finally get the results you came for.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Button href="#membership" size="lg">
              Join Now
              <ArrowRight className="h-5 w-5" aria-hidden />
            </Button>
            <Button href="#programs" size="lg" variant="secondary">
              View Programs
            </Button>
          </div>

          {/* Trust / stats */}
          <dl className="mt-14 grid max-w-lg grid-cols-3 gap-6 border-t border-border pt-8">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse gap-1">
                <dt className="text-sm text-subtle">{stat.label}</dt>
                <dd className="display text-3xl text-foreground sm:text-4xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
