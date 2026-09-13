import { brand, siteUrl, plans } from "../lib/content";

/*
 * LocalBusiness (gym) structured data for local SEO / rich results.
 * Kept in sync with the visible contact + membership details.
 */
const prices = plans.map((p) => p.price);
const inr = new Intl.NumberFormat("en-IN");

const schema = {
  "@context": "https://schema.org",
  "@type": ["HealthClub", "ExerciseGym"],
  name: brand.full,
  description:
    "Premium gym in Kolkata offering expert coaching, strength and personal training, weight loss and functional programs.",
  url: siteUrl,
  telephone: "+91-74659-45752",
  email: "punittomar777@gmail.com",
  image:
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80",
  priceRange: `₹${inr.format(Math.min(...prices))} - ₹${inr.format(Math.max(...prices))}`,
  currenciesAccepted: "INR",
  address: {
    "@type": "PostalAddress",
    streetAddress: "14 Camac Street",
    addressLocality: "Kolkata",
    addressRegion: "West Bengal",
    postalCode: "700017",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 22.5488,
    longitude: 88.3529,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "05:00",
      closes: "23:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "06:00",
      closes: "22:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Sunday",
      opens: "07:00",
      closes: "20:00",
    },
  ],
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
