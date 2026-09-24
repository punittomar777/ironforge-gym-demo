import { Dumbbell } from "lucide-react";
import {
  brand,
  navLinks,
  socials,
  contactDetails,
  demo,
} from "../lib/content";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-5 pb-24 pt-16 sm:px-8 sm:pb-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <a href="#home" className="flex items-center gap-2.5" aria-label={`${brand.full} — home`}>
              <span className="grid h-9 w-9 place-items-center bg-accent text-white">
                <Dumbbell className="h-5 w-5" aria-hidden />
              </span>
              <span className="font-display text-xl font-bold uppercase tracking-wide">
                Iron<span className="text-accent">Forge</span>
              </span>
            </a>
            <p className="mt-5 max-w-xs leading-relaxed text-muted">
              Expert coaching, premium equipment and a community that shows up.
              Forge a stronger you.
            </p>
            <ul className="mt-6 flex gap-3">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="grid h-10 w-10 place-items-center border border-border text-muted transition-colors hover:border-accent hover:text-accent"
                    >
                      <Icon className="h-5 w-5" aria-hidden />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Nav */}
          <nav aria-label="Footer">
            <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-foreground">
              Explore
            </h2>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-muted transition-colors hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-foreground">
              Get in touch
            </h2>
            <ul className="mt-5 space-y-3">
              {contactDetails.map((item) => (
                <li key={item.label}>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-muted transition-colors hover:text-accent"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span className="text-muted">{item.value}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-sm text-subtle sm:flex-row">
          <p>
            © {year} {brand.full}. All rights reserved.
          </p>
          <p className="text-center sm:text-right">
            Demo website — {brand.full} is a fictional gym. Designed &amp; built by{" "}
            <a
              href={demo.portfolioUrl}
              target="_blank"
              rel="noopener"
              className="text-muted underline-offset-4 transition-colors hover:text-accent hover:underline"
            >
              {demo.author}
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
