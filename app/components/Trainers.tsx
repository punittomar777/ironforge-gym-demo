import Image from "next/image";
import { trainers } from "../lib/content";
import SectionHeading from "./ui/SectionHeading";

export default function Trainers() {
  return (
    <section
      id="trainers"
      aria-labelledby="trainers-heading"
      className="border-t border-border bg-surface py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          id="trainers-heading"
          eyebrow="The Team"
          title="Coaches worth training under."
          description="You don't get results from equipment — you get them from people who know how to program, correct and push. Meet a few of them."
        />

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {trainers.map((trainer) => (
            <article key={trainer.name} className="group">
              <div className="relative aspect-[3/4] overflow-hidden bg-elevated">
                <Image
                  src={trainer.image}
                  alt={`${trainer.name}, ${trainer.specialty}`}
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="eyebrow">{trainer.specialty}</p>
                  <h3 className="display mt-1.5 text-2xl text-white">
                    {trainer.name}
                  </h3>
                </div>
              </div>
              <p className="mt-5 leading-relaxed text-muted">
                {trainer.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
