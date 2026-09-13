import type { Metadata, Viewport } from "next";
import { Inter, Oswald } from "next/font/google";
import { siteUrl } from "./lib/content";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const description =
  "IronForge Fitness is a premium gym offering expert coaching, strength and personal training, and modern equipment. Join 1000+ members forging real results.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "IronForge Fitness — Premium Gym & Personal Training",
    template: "%s | IronForge Fitness",
  },
  description,
  keywords: [
    "gym",
    "fitness",
    "personal training",
    "strength training",
    "weight loss",
    "functional training",
    "IronForge Fitness",
  ],
  authors: [{ name: "IronForge Fitness" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "IronForge Fitness",
    title: "IronForge Fitness — Premium Gym & Personal Training",
    description,
    images: [
      {
        url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "IronForge Fitness gym floor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IronForge Fitness — Premium Gym & Personal Training",
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#09090b",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${oswald.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
