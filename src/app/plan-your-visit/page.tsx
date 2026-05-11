import type { Metadata } from "next";
import Link from "next/link";
import { Check, ArrowUpRight, FileText, CreditCard, Briefcase, Download, Phone } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Eyebrow } from "@/components/Editorial";
import { Button } from "@/components/ui/button";
import { SITE_URL } from "@/lib/clinics";

export const metadata: Metadata = {
  title: "Plan Your Visit",
  description:
    "Everything you need to know before visiting Quick Urgent Care — insurance, patient forms, what to bring, and how to skip the wait.",
  alternates: { canonical: "/plan-your-visit" },
  openGraph: {
    title: "Plan Your Visit — Quick Urgent Care",
    description: "Insurance, patient forms, and what to bring to Quick Urgent Care in Moore and OKC.",
    url: `${SITE_URL}/plan-your-visit`,
  },
};

const INSURANCE = [
  "Aetna", "Blue Cross Blue Shield", "Cigna", "Humana", "Medicare", "Medicaid / SoonerCare",
  "United Healthcare", "Tricare", "AmeriHealth", "Coventry", "MultiPlan / PHCS",
  "Self-pay & uninsured",
];

const BRING = [
  { icon: FileText, title: "Photo ID", desc: "Driver's license, state ID, or passport." },
  { icon: CreditCard, title: "Insurance card", desc: "Front and back — we'll make a copy at check-in." },
  { icon: Briefcase, title: "Employer forms", desc: "DOT, pre-employment, or workers' comp paperwork if applicable." },
  { icon: FileText, title: "List of medications", desc: "Current prescriptions, dosages, and any known allergies." },
];

export default function PlanYourVisit() {
  return (
    <Layout>
      <section className="container pt-20 lg:pt-28 pb-12 grid lg:grid-cols-12 gap-10 items-end">
        <div className="lg:col-span-8">
          <Eyebrow tone="primary">Plan Your Visit</Eyebrow>
          <h1 className="mt-5 text-display-xl font-display">
            Walk in ready.<br />Leave with answers.
          </h1>
        </div>
        <p className="lg:col-span-4 text-on-surface-variant text-lg leading-relaxed">
          No appointment needed — but knowing what to bring and what to expect makes every visit faster and easier.
        </p>
      </section>

      {/* What to Bring */}
      <section className="container py-16">
        <Eyebrow>01</Eyebrow>
        <h2 className="mt-4 text-display-md font-display">What to bring.</h2>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {BRING.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="surface-lowest rounded-xl p-7">
              <div className="size-11 rounded-lg bg-surface-base grid place-items-center text-primary">
                <Icon className="size-5" />
              </div>
              <h3 className="mt-5 font-display text-base font-semibold">{title}</h3>
              <p className="mt-2 text-on-surface-variant text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Insurance */}
      <section className="surface-low">
        <div className="container py-20">
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4">
              <Eyebrow>02</Eyebrow>
              <h2 className="mt-4 text-display-md font-display">Insurance & self-pay.</h2>
              <p className="mt-4 text-on-surface-variant leading-relaxed">
                We accept most major commercial insurance plans, Medicare, and Medicaid (SoonerCare). Self-pay rates are available — ask at the front desk.
              </p>
              <p className="mt-4 text-on-surface-variant leading-relaxed text-sm">
                Don&apos;t see your plan? Call us — our billing team can verify your benefits before your visit.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild variant="ghost">
                  <a href="tel:4052857222">Call to verify insurance</a>
                </Button>
                <Button asChild variant="ghost">
                  <Link href="/insurance">Full insurance list <ArrowUpRight className="size-4" /></Link>
                </Button>
              </div>
            </div>
            <div className="lg:col-span-8">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {INSURANCE.map((plan) => (
                  <div key={plan} className="surface-lowest rounded-lg px-4 py-3 flex items-center gap-2 text-sm">
                    <Check className="size-3.5 text-primary shrink-0" />
                    {plan}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Patient Forms */}
      <section className="container py-20">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <Eyebrow>03</Eyebrow>
            <h2 className="mt-4 text-display-md font-display">Patient forms.</h2>
            <p className="mt-4 text-on-surface-variant leading-relaxed">
              Save time at check-in by completing your intake paperwork before you arrive, or fill it out at the clinic.
            </p>
          </div>
          <div className="lg:col-span-8 space-y-3">
            {[
              { name: "Patient Registration Form", desc: "New patient registration and medical history", href: "/forms/patient-registration.pdf" },
              { name: "Release of Information Consent", desc: "Authorize release of your medical records", href: "/forms/release-of-information.pdf" },
              { name: "Authorization to Treat a Minor", desc: "Required when a minor is not accompanied by a parent/guardian", href: "/forms/authorization-to-treat-minor.pdf" },
              { name: "Workers' Comp Authorization", desc: "Required for occupational injury visits", href: "/forms/workers-comp-authorization.pdf" },
            ].map((form) => (
              <a
                key={form.name}
                href={form.href}
                download
                className="surface-lowest rounded-xl p-6 flex items-center justify-between gap-4 hover:lift-soft transition-all group"
              >
                <div>
                  <div className="font-medium group-hover:text-primary transition-colors">{form.name}</div>
                  <div className="text-sm text-on-surface-variant mt-1">{form.desc}</div>
                </div>
                <span className="shrink-0 inline-flex items-center gap-1.5 text-xs font-medium text-primary">
                  <Download className="size-3.5" /> Download PDF
                </span>
              </a>
            ))}
            <p className="text-xs text-on-surface-muted px-1">
              Trouble downloading? Call us at <a href="tel:4052857222" className="underline inline-flex items-center gap-1"><Phone className="size-3" /> 405-285-7222</a> and we&apos;ll email the forms.
            </p>
          </div>
        </div>
      </section>

      {/* Skip the wait */}
      <section className="container py-12">
        <div className="rounded-xl gradient-primary text-primary-foreground p-12 lg:p-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lift-ambient">
          <div>
            <h2 className="font-display text-display-md">Skip the wait.</h2>
            <p className="mt-3 text-primary-foreground/80 max-w-xl">
              Reserve your time online and walk in when you&apos;re ready — no sitting in the waiting room.
            </p>
          </div>
          <Button asChild variant="glass" size="xl">
            <Link href="/book">Book a visit <ArrowUpRight className="size-4" /></Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
