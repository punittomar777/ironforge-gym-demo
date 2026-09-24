import { brand, demo, siteUrl } from "../lib/content";

/*
 * WebSite structured data. This is a portfolio demo and IronForge Fitness is a
 * fictional gym, so we deliberately avoid LocalBusiness/HealthClub schema
 * (address, hours, prices) that would describe a business that doesn't exist.
 * For a real client, swap this for a LocalBusiness schema with their details.
 */
const schema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: `${brand.full} — Gym Website Demo`,
  url: siteUrl,
  description:
    "A portfolio demo website for a fictional gym, designed and built by Punit Tomar.",
  inLanguage: "en",
  creator: {
    "@type": "Person",
    name: demo.author,
    url: demo.authorUrl,
    sameAs: [demo.portfolioUrl],
  },
} as const;

export default function StructuredData() {
  return (
    <script
      type="application/ld+json"
      // Static, trusted content built at render time — safe to inject.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
