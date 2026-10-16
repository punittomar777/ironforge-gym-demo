import { Navigation } from "lucide-react";
import { demoLocation, demoDirectionsUrl } from "../lib/content";
import Button from "./ui/Button";

export default function DemoMap() {
  return (
    <section aria-label={`Map of ${demoLocation.name}`} className="min-w-0">
      <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
        <iframe
          id="contact-map"
          src={demoLocation.embedUrl}
          title={`Google Maps: ${demoLocation.name}`}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          className="block h-[340px] w-full border-0 lg:h-[480px]"
          allowFullScreen
        />
      </div>
      <div className="mt-5">
        <Button href={demoDirectionsUrl} variant="secondary" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
          <Navigation className="h-4 w-4" aria-hidden />
          Get Directions
        </Button>
      </div>
    </section>
  );
}
