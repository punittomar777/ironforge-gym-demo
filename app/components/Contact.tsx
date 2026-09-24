"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, AlertCircle, Info } from "lucide-react";
import Button from "./ui/Button";
import SectionHeading from "./ui/SectionHeading";
import { WhatsAppIcon } from "./ui/BrandIcons";
import { contactDetails, demo, plans, whatsappUrl } from "../lib/content";

interface FormState {
  name: string;
  email: string;
  phone: string;
  goal: string;
  message: string;
}

type Errors = Partial<Record<keyof FormState, string>>;

const emptyForm: FormState = {
  name: "",
  email: "",
  phone: "",
  goal: plans[1].name,
  message: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[+\d][\d\s-]{7,}$/;

function validate(values: FormState): Errors {
  const errors: Errors = {};
  if (values.name.trim().length < 2) errors.name = "Please enter your name.";
  if (!emailPattern.test(values.email.trim()))
    errors.email = "Enter a valid email address.";
  if (values.phone.trim() && !phonePattern.test(values.phone.trim()))
    errors.phone = "Enter a valid phone number.";
  if (values.message.trim().length < 10)
    errors.message = "Tell us a little more (at least 10 characters).";
  return errors;
}

const fieldBase =
  "w-full border border-border bg-surface px-4 py-3 text-foreground placeholder:text-subtle transition-colors focus:border-accent focus:outline-none";

type Status = "idle" | "sending" | "error";

export default function Contact() {
  const [values, setValues] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string | null>(null);
  // Honeypot: hidden from real users; bots that fill it are silently dropped.
  const [company, setCompany] = useState("");

  const sending = status === "sending";

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (sending) return; // guard against duplicate submissions

    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      const first = document.getElementById(
        `field-${Object.keys(nextErrors)[0]}`
      );
      first?.focus();
      return;
    }

    setServerError(null);
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, company }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as {
          error?: string;
        } | null;
        setStatus("error");
        setServerError(
          data?.error ??
            "We couldn't send your enquiry. Please try again or reach us on WhatsApp."
        );
        return;
      }

      // Success: only now do we clear the form and show confirmation.
      setValues(emptyForm);
      setStatus("idle");
      setSubmitted(true);
    } catch {
      setStatus("error");
      setServerError(
        "Network error — please check your connection and try again, or reach us on WhatsApp."
      );
    }
  }

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="border-t border-border bg-background py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          id="contact-heading"
          eyebrow="Contact"
          title="Let's get you started."
          description="Send an enquiry directly to Punit Tomar, the developer behind this demo website."
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* Form */}
          <div>
            <p className="mb-6 flex items-start gap-2 border border-border bg-surface px-4 py-3 text-sm text-muted">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
              <span>
                This is a demo website. Enquiries are sent directly to the
                developer, {demo.author}.
              </span>
            </p>
            {submitted ? (
              <div
                role="status"
                className="flex flex-col items-start gap-4 border border-accent/40 bg-accent-soft p-8"
              >
                <CheckCircle2 className="h-10 w-10 text-accent" aria-hidden />
                <h3 className="font-display text-2xl font-semibold uppercase tracking-wide text-foreground">
                  Enquiry received
                </h3>
                <p className="text-muted">
                  Thanks for reaching out — we&apos;ll be in touch within one business
                  day. Keen to start sooner? Chat with us now.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button
                    href={whatsappUrl}
                    variant="whatsapp"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <WhatsAppIcon className="h-5 w-5" aria-hidden />
                    Chat on WhatsApp
                  </Button>
                  <Button variant="secondary" onClick={() => setSubmitted(false)}>
                    Send another enquiry
                  </Button>
                </div>
              </div>
            ) : (
              <form noValidate onSubmit={onSubmit} className="space-y-5">
                {/* Honeypot — visually hidden, off the tab order, ignored by humans */}
                <div aria-hidden className="hidden">
                  <label htmlFor="field-company">Company</label>
                  <input
                    id="field-company"
                    name="company"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    id="field-name"
                    label="Name"
                    error={errors.name}
                    required
                  >
                    <input
                      id="field-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      className={fieldBase}
                      placeholder="Your full name"
                      value={values.name}
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "error-name" : undefined}
                      onChange={(e) => update("name", e.target.value)}
                    />
                  </Field>
                  <Field
                    id="field-email"
                    label="Email"
                    error={errors.email}
                    required
                  >
                    <input
                      id="field-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className={fieldBase}
                      placeholder="you@example.com"
                      value={values.email}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "error-email" : undefined}
                      onChange={(e) => update("email", e.target.value)}
                    />
                  </Field>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <Field id="field-phone" label="Phone" error={errors.phone}>
                    <input
                      id="field-phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      className={fieldBase}
                      placeholder="+91 90000 00000"
                      value={values.phone}
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? "error-phone" : undefined}
                      onChange={(e) => update("phone", e.target.value)}
                    />
                  </Field>
                  <Field id="field-goal" label="I'm interested in">
                    <select
                      id="field-goal"
                      name="goal"
                      className={`${fieldBase} appearance-none`}
                      value={values.goal}
                      onChange={(e) => update("goal", e.target.value)}
                    >
                      {plans.map((plan) => (
                        <option key={plan.name} value={plan.name}>
                          {plan.name} membership
                        </option>
                      ))}
                      <option value="Personal Training">Personal training</option>
                      <option value="Just exploring">Just exploring</option>
                    </select>
                  </Field>
                </div>

                <Field
                  id="field-message"
                  label="Message"
                  error={errors.message}
                  required
                >
                  <textarea
                    id="field-message"
                    name="message"
                    rows={5}
                    className={`${fieldBase} resize-y`}
                    placeholder="Tell us about your goals and what you're looking for."
                    value={values.message}
                    aria-invalid={!!errors.message}
                    aria-describedby={
                      errors.message ? "error-message" : undefined
                    }
                    onChange={(e) => update("message", e.target.value)}
                  />
                </Field>

                {serverError && (
                  <p
                    role="alert"
                    className="flex items-start gap-2 border border-accent/40 bg-accent-soft px-4 py-3 text-sm text-foreground"
                  >
                    <AlertCircle
                      className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                      aria-hidden
                    />
                    {serverError}
                  </p>
                )}

                <Button
                  type="submit"
                  size="lg"
                  className="w-full sm:w-auto"
                  disabled={sending}
                  aria-busy={sending}
                >
                  {sending ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
                      Sending…
                    </>
                  ) : (
                    "Send Enquiry"
                  )}
                </Button>
              </form>
            )}
          </div>

          {/* Details */}
          <div className="space-y-8">
            {/* Quick chat — the fastest lead channel for a local gym */}
            <div className="border border-[#25D366]/30 bg-[#25D366]/[0.06] p-6">
              <p className="font-display text-lg font-semibold uppercase tracking-wide text-foreground">
                Prefer to talk now?
              </p>
              <p className="mt-1 text-sm text-muted">
                Chat directly with Punit Tomar about your website project.
              </p>
              <Button
                href={whatsappUrl}
                variant="whatsapp"
                size="lg"
                className="mt-5 w-full"
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon className="h-5 w-5" aria-hidden />
                Chat on WhatsApp
              </Button>
            </div>

            <ul className="space-y-5">
              {contactDetails.map((item) => {
                const Icon = item.icon;
                const content = (
                  <>
                    <span className="grid h-11 w-11 shrink-0 place-items-center bg-accent-soft text-accent">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <span>
                      <span className="block text-xs uppercase tracking-wider text-subtle">
                        {item.label}
                      </span>
                      <span className="text-foreground">{item.value}</span>
                    </span>
                  </>
                );
                return (
                  <li key={item.label}>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="flex items-center gap-4 transition-colors hover:text-accent"
                      >
                        {content}
                      </a>
                    ) : (
                      <div className="flex items-center gap-4">{content}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

function Field({ id, label, error, required, children }: FieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-foreground"
      >
        {label}
        {required && <span className="text-accent"> *</span>}
      </label>
      {children}
      {error && (
        <p id={`error-${id.replace("field-", "")}`} className="mt-1.5 text-sm text-accent">
          {error}
        </p>
      )}
    </div>
  );
}
