import type { Metadata, Viewport } from "next";
import { Inter, Oswald } from "next/font/google";
import { demo, siteUrl } from "./lib/content";
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

const title = "IronForge Fitness — Gym Website Demo";
const description =
  "IronForge Fitness is a fictional gym — a portfolio demo website by Punit Tomar showcasing a fast, mobile-first gym site with programs, trainers, membership plans, a contact form and WhatsApp chat.";
const ogImage = {
  url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&h=630&q=80",
  width: 1200,
  height: 630,
  alt: "Athlete training with a barbell in a dark gym",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | IronForge Fitness Demo",
  },
  description,
  keywords: [
    "gym website demo",
    "fitness website template",
    "gym landing page",
    "Next.js gym website",
    "web design portfolio",
    "Punit Tomar",
  ],
  authors: [{ name: demo.author, url: demo.authorUrl }],
  creator: demo.author,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "IronForge Fitness (Demo)",
    title,
    description,
    locale: "en_IN",
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImage],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
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
