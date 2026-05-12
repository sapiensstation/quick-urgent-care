import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Briefcase, Stethoscope, FlaskConical, ShieldCheck, Truck, Users } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Eyebrow } from "@/components/Editorial";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { SITE_URL } from "@/lib/clinics";

export const metadata: Metadata = {
  title: "For Employers — Occupational Health, Drug Testing, DOT",
  description:
    "Quick Urgent Care partners with Oklahoma employers for workers' comp, drug testing, DOT physicals, and corporate accounts. Same-day care in Moore and OKC.",
  alternates: { canonical: "/employers" },
  openGraph: {
    title: "For Employers — Quick Urgent Care",
    description: "Workers' comp, DOT physicals, drug testing, and corporate accounts in Moore and Oklahoma City.",
    url: `${SITE_URL}/employers`,
  },
};

const SERVICES = [
  { icon: Briefcase, title: "Workers' compensation", desc: "Same-day evaluation, treatment, and reporting back to the employer or carrier." },
  { icon: Truck, title: "DOT physicals", desc: "Certified medical examiner. Same-day Medical Examiner's Certificate." },
  { icon: FlaskConical, title: "Drug & alcohol testing", desc: "5- and 10-panel screens, DOT-compliant, urine and oral fluid." },
  { icon: Stethoscope, title: "Pre-employment exams", desc: "Customizable to your role and industry requirements." },
  { icon: ShieldCheck, title: "Return-to-work evaluations", desc: "Functional capacity assessments and modified-duty letters." },
  { icon: Users, title: "Corporate accounts", desc: "Volume billing, standing orders, and on-site triage protocols." },
];

const PROCESS = [
  { step: "01", title: "Initial call", desc: "We discuss your workforce, schedule, and billing setup. Most accounts are live within 48 hours." },
  { step: "02", title: "Standing orders", desc: "Pre-approved protocols mean your employees walk in and we already know what to do." },
  { step: "03", title: "Visit & reporting", desc: "Same-day care, same-day reporting back to your designated HR or safety contact." },
  { step: "04", title: "Monthly billing", desc: "Itemized invoicing for everything we did, with no surprise facility fees." },
];

export default function Employers() {
  return (
    <Layout>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "For employers" },
        ]}
      />

      <section className="container pt-12 lg:pt-16 pb-12 grid lg:grid-cols-12 gap-10 items-end">
        <div className="lg:col-span-8">
          <Eyebrow tone="primary">For employers</Eyebrow>
          <h1 className="mt-5 text-display-xl font-display">
            Occupational health<br />for Oklahoma teams.
          </h1>
        </div>
        <p className="lg:col-span-4 text-on-surface-variant text-lg leading-relaxed">
          Workers&apos; comp, DOT physicals, drug testing, and pre-employment exams — billed direct, with same-day reporting back to your HR team.
        </p>
      </section>

      <section className="container py-12">
        <Eyebrow>What we offer</Eyebrow>
        <h2 className="mt-3 font-display text-display-md">Services for your workforce.</h2>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map(({ icon: Icon, title, desc }) => (
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

      <section className="surface-low">
        <div className="container py-20">
          <Eyebrow>How it works</Eyebrow>
          <h2 className="mt-3 font-display text-display-md">From first call to monthly billing.</h2>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PROCESS.map((p) => (
              <div key={p.step} className="surface-lowest rounded-xl p-7">
                <div className="font-display text-display-md font-semibold text-primary/30">{p.step}</div>
                <h3 className="mt-4 font-display text-base font-semibold">{p.title}</h3>
                <p className="mt-2 text-on-surface-variant text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-16">
        <div className="rounded-xl gradient-primary text-primary-foreground p-12 lg:p-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-display-md">Set up a corporate account.</h2>
            <p className="mt-3 text-primary-foreground/80 max-w-xl">
              Call 405-285-7222 to talk through standing orders, billing, and on-site protocols.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="glass" size="xl">
              <a href="tel:4052857222">Call 405-285-7222</a>
            </Button>
            <Button asChild variant="hero" size="xl">
              <Link href="/contact">Send a message <ArrowUpRight className="size-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
