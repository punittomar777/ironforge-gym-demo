import {
  Dumbbell,
  UserRoundCog,
  Flame,
  Activity,
  ShieldCheck,
  HeartPulse,
  Users,
  Sparkles,
  Phone,
  Mail,
  type LucideIcon,
} from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import {
  InstagramIcon,
  FacebookIcon,
  YoutubeIcon,
} from "../components/ui/BrandIcons";

/* ------------------------------------------------------------------ */
/* Brand + navigation                                                  */
/* ------------------------------------------------------------------ */

export const brand = {
  name: "IronForge",
  full: "IronForge Fitness",
  tagline: "Forge a stronger you.",
} as const;

// Canonical/production URL — replace with the client's real domain on deploy.
export const siteUrl = "https://gym-demo.punittomar.com";

/*
 * This site is a portfolio demo — IronForge Fitness is a fictional gym.
 * Used for the demo notice, metadata and structured data.
 */
export const demo = {
  author: "Punit Tomar",
  authorUrl: "https://punittomar.com",
  portfolioUrl: "https://studio.punittomar.com",
} as const;

/*
 * WhatsApp click-to-chat.
 * `number` is the full international number, digits only, no "+" (country code + number).
 * For a real client, replace `number` and `display` with theirs — nothing else changes.
 */
export const whatsapp = {
  number: "917465945752",
  display: "+91 74659 45752",
  message: "Hi IronForge! I'd like to know more about your memberships.",
} as const;

export const whatsappUrl = `https://wa.me/${whatsapp.number}?text=${encodeURIComponent(
  whatsapp.message
)}`;

export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Programs", href: "#programs" },
  { label: "Trainers", href: "#trainers" },
  { label: "Membership", href: "#membership" },
  { label: "Contact", href: "#contact" },
];

/* ------------------------------------------------------------------ */
/* Hero stats                                                          */
/* ------------------------------------------------------------------ */

export interface Stat {
  value: string;
  label: string;
}

export const stats: Stat[] = [
  { value: "1000+", label: "Active members" },
  { value: "15+", label: "Expert trainers" },
  { value: "8", label: "Years in the game" },
];

/* ------------------------------------------------------------------ */
/* About — benefits                                                    */
/* ------------------------------------------------------------------ */

export interface Benefit {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const benefits: Benefit[] = [
  {
    icon: ShieldCheck,
    title: "Coaching that holds you accountable",
    description:
      "Certified coaches build your plan, track your numbers and keep you honest — no guesswork, no plateaus.",
  },
  {
    icon: HeartPulse,
    title: "Training built around your body",
    description:
      "Every program is scaled to your fitness level and goals, whether you're on day one or chasing a PR.",
  },
  {
    icon: Sparkles,
    title: "A floor that pushes you",
    description:
      "Premium equipment, serious energy and members who show up. The room does half the work.",
  },
];

/* ------------------------------------------------------------------ */
/* Programs                                                            */
/* ------------------------------------------------------------------ */

export interface Program {
  icon: LucideIcon;
  title: string;
  description: string;
  highlights: string[];
}

export const programs: Program[] = [
  {
    icon: Dumbbell,
    title: "Strength Training",
    description:
      "Build raw, functional strength on a periodised barbell program guided by coaches who know progressive overload.",
    highlights: ["Barbell & compound focus", "Progressive overload plan", "Form-first coaching"],
  },
  {
    icon: UserRoundCog,
    title: "Personal Training",
    description:
      "One-on-one sessions engineered around your goals, schedule and starting point — with a coach in your corner.",
    highlights: ["Dedicated coach", "Custom programming", "Weekly check-ins"],
  },
  {
    icon: Flame,
    title: "Weight Loss",
    description:
      "A sustainable mix of conditioning, strength and nutrition guidance that burns fat without burning you out.",
    highlights: ["Metabolic conditioning", "Nutrition guidance", "Progress tracking"],
  },
  {
    icon: Activity,
    title: "Functional Training",
    description:
      "Move better in and out of the gym with athletic, full-body sessions built around real-world movement.",
    highlights: ["Mobility & stability", "Athletic conditioning", "Injury-resilient training"],
  },
];

/* ------------------------------------------------------------------ */
/* Why IronForge — differentiators                                     */
/* ------------------------------------------------------------------ */

export interface Differentiator {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const differentiators: Differentiator[] = [
  {
    icon: ShieldCheck,
    title: "Expert coaching",
    description:
      "Every coach is certified and vetted. You train under people who compete, teach and genuinely care about your progress.",
  },
  {
    icon: Dumbbell,
    title: "Modern equipment",
    description:
      "Rogue racks, calibrated plates, sleds and premium cardio — maintained daily so nothing stands between you and the work.",
  },
  {
    icon: UserRoundCog,
    title: "Personalized programs",
    description:
      "No cookie-cutter plans. Your training is written for your body, your goals and the time you can actually commit.",
  },
  {
    icon: Users,
    title: "Supportive community",
    description:
      "A crew that celebrates every rep and every milestone. The accountability here is the reason members stay for years.",
  },
];

/* ------------------------------------------------------------------ */
/* Trainers                                                            */
/* ------------------------------------------------------------------ */

export interface Trainer {
  name: string;
  specialty: string;
  description: string;
  image: string;
}

export const trainers: Trainer[] = [
  {
    name: "Arjun Mehta",
    specialty: "Head Strength Coach",
    description:
      "Former national powerlifter with a decade of coaching. Arjun turns beginners into confident lifters and lifters into competitors.",
    image:
      "https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Neha Kapoor",
    specialty: "Personal Training & Nutrition",
    description:
      "A precision-nutrition specialist who blends smart programming with sustainable habits for lasting, visible results.",
    image:
      "https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "Rohit Verma",
    specialty: "Functional & Conditioning",
    description:
      "Athletic-performance coach who builds engines. Expect mobility, power and the kind of conditioning that carries into real life.",
    image:
      "https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?auto=format&fit=crop&w=900&q=80",
  },
];

/* ------------------------------------------------------------------ */
/* Membership plans                                                    */
/* ------------------------------------------------------------------ */

export interface Plan {
  name: string;
  price: number;
  period: string;
  tagline: string;
  features: string[];
  featured: boolean;
  cta: string;
}

export const plans: Plan[] = [
  {
    name: "Basic",
    price: 1499,
    period: "/month",
    tagline: "Everything you need to build the habit.",
    features: [
      "Full gym floor access",
      "Locker room & showers",
      "2 group classes / week",
      "Guided onboarding session",
    ],
    featured: false,
    cta: "Choose Basic",
  },
  {
    name: "Pro",
    price: 2999,
    period: "/month",
    tagline: "Structured coaching to actually see change.",
    features: [
      "Everything in Basic",
      "Unlimited group classes",
      "Personalised training plan",
      "Monthly progress assessment",
      "Nutrition starter guide",
    ],
    featured: true,
    cta: "Choose Pro",
  },
  {
    name: "Elite",
    price: 5499,
    period: "/month",
    tagline: "A dedicated coach in your corner.",
    features: [
      "Everything in Pro",
      "4 personal-training sessions / month",
      "1:1 nutrition coaching",
      "Recovery & mobility access",
      "Priority class booking",
    ],
    featured: false,
    cta: "Choose Elite",
  },
];

/* ------------------------------------------------------------------ */
/* Testimonials                                                        */
/* ------------------------------------------------------------------ */

export interface Testimonial {
  quote: string;
  name: string;
  result: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "I'd bounced between gyms for years. IronForge is the first place a coach actually built me a plan and checked in. Down 12 kg and lifting more than I ever have.",
    name: "Priya S.",
    result: "Member for 2 years",
  },
  {
    quote:
      "The coaching is the difference. My deadlift went from 60 kg to 120 kg in eight months, and my form has never felt safer.",
    name: "Karan D.",
    result: "Pro member",
  },
  {
    quote:
      "Walked in nervous and out of shape. The community here carried me through the hard weeks. It's the only membership I've never thought about cancelling.",
    name: "Ananya R.",
    result: "Member for 3 years",
  },
];

/* ------------------------------------------------------------------ */
/* Contact                                                             */
/* ------------------------------------------------------------------ */

export interface ContactItem {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
}

export const contactDetails: ContactItem[] = [
  {
    icon: Phone,
    label: "Phone",
    value: "+91 74659 45752",
    href: "tel:+917465945752",
  },
  {
    icon: Mail,
    label: "Email",
    value: "punittomar777@gmail.com",
    href: "mailto:punittomar777@gmail.com",
  },
];

/* ------------------------------------------------------------------ */
/* Social                                                              */
/* ------------------------------------------------------------------ */

export interface Social {
  label: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export const socials: Social[] = [
  { label: "Instagram", href: "https://instagram.com", icon: InstagramIcon },
  { label: "Facebook", href: "https://facebook.com", icon: FacebookIcon },
  { label: "YouTube", href: "https://youtube.com", icon: YoutubeIcon },
];
