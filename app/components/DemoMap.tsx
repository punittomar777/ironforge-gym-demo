import { MapPin, Navigation } from "lucide-react";
import { demoLocation, demoMapUrl, demoDirectionsUrl } from "../lib/content";
import Button from "./ui/Button";

export default function DemoMap() {
  return (
    <section aria-labelledby="demo-location-heading" className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
      <div className="p-6">
        <p className="eyebrow">{demoLocation.notice}</p>
        <h3 id="demo-location-heading" className="mt-3 flex items-center gap-2 font-display text-xl font-semibold text-foreground">
          <MapPin className="h-5 w-5 shrink-0 text-accent" aria-hidden />{demoLocation.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">This public landmark illustrates the location feature. IronForge is fictional and does not operate here.</p>
      </div>
      <iframe src={demoMapUrl} title={`Illustrative Google Map of ${demoLocation.name}; not a gym address`}
        loading="lazy" referrerPolicy="no-referrer-when-downgrade"
        className="block aspect-[4/3] min-h-64 w-full border-0" allowFullScreen />
      <div className="p-6">
        <Button href={demoDirectionsUrl} variant="secondary" target="_blank" rel="noopener noreferrer" className="w-full">
          <Navigation className="h-4 w-4" aria-hidden />Get Directions
        </Button>
        <p className="mt-3 text-xs text-subtle">Directions lead to the sample landmark only.</p>
      </div>
    </section>
  );
}
