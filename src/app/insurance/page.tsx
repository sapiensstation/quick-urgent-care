import type { Metadata } from "next";
import Link from "next/link";
import { Check, ArrowUpRight, Phone, ShieldCheck } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Eyebrow } from "@/components/Editorial";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { SITE_URL } from "@/lib/clinics";

export const metadata: Metadata = {
  title: "Insurance Accepted",
  description:
    "Quick Urgent Care accepts most major commercial insurance plans, Medicare, Medicaid (SoonerCare), and Tricare. Self-pay rates posted.",
  alternates: { canonical: "/insurance" },
  openGraph: {
    title: "Insurance Accepted — Quick Urgent Care",
    description: "Aetna, BCBS, UnitedHealthcare, Cigna, Humana, Medicare, SoonerCare, Tricare, and more.",
    url: `${SITE_URL}/insurance`,
  },
};

const COMMERCIAL = [
  "Aetna",
  "Blue Cross Blue Shield",
  "Cigna",
  "Humana",
  "UnitedHealthcare",
  "AmeriHealth",
  "Coventry",
  "Healthchoice",
  "Community Care",
  "GEHA",
  "MultiPlan / PHCS",
];

const GOVERNMENT = [
  "Medicare",
  "Medicaid (SoonerCare)",
  "Tricare",
  "VA Community Care",
];

const SELF_PAY_NOTES = [
  "Posted self-pay rates at every visit — no surprise facility fees",
  "Self-pay discount available when paid at time of service",
  "Itemized receipts for HSA / FSA reimbursement",
  "Custom employer billing for workers' comp and corporate accounts",
];

export default function InsurancePage() {
  return (
    <Layout>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Plan your visit", href: "/plan-your-visit" },
          { label: "Insurance accepted" },
        ]}
      />

      <section className="container pt-12 lg:pt-16 pb-12 grid lg:grid-cols-12 gap-10 items-end">
        <div className="lg:col-span-8">
          <Eyebrow tone="primary">Insurance</Eyebrow>
          <h1 className="mt-5 text-display-xl font-display">
            Most major plans<br />accepted.
          </h1>
        </div>
        <p className="lg:col-span-4 text-on-surface-variant text-lg leading-relaxed">
          Don&apos;t see your plan? Call us — we&apos;ll verify your benefits in minutes.
        </p>
      </section>

      <section className="container py-12">
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="surface-low rounded-xl p-8 lg:p-10">
            <Eyebrow>Commercial</Eyebrow>
            <h2 className="mt-3 font-display text-display-md">Commercial plans</h2>
            <ul className="mt-6 grid sm:grid-cols-2 gap-2">
              {COMMERCIAL.map((p) => (
                <li key={p} className="surface-lowest rounded-lg px-4 py-3 flex items-center gap-2 text-sm">
                  <Check className="size-3.5 text-primary shrink-0" /> {p}
                </li>
              ))}
            </ul>
          </div>
          <div className="surface-low rounded-xl p-8 lg:p-10">
            <Eyebrow>Government &amp; military</Eyebrow>
            <h2 className="mt-3 font-display text-display-md">Public coverage</h2>
            <ul className="mt-6 grid sm:grid-cols-2 gap-2">
              {GOVERNMENT.map((p) => (
                <li key={p} className="surface-lowest rounded-lg px-4 py-3 flex items-center gap-2 text-sm">
                  <Check className="size-3.5 text-primary shrink-0" /> {p}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-on-surface-variant leading-relaxed">
              Bring your insurance card and photo ID to every visit. If your plan requires a referral, please contact your PCP before walking in.
            </p>
          </div>
        </div>
      </section>

      <section className="surface-low">
        <div className="container py-16 lg:py-20 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <Eyebrow>Self-pay</Eyebrow>
            <h2 className="mt-3 font-display text-display-md">Uninsured? No problem.</h2>
            <p className="mt-5 text-on-surface-variant leading-relaxed">
              We treat self-pay patients with the same care and transparent pricing. Our rates are posted at the front desk and stay the same whether you have insurance or not.
            </p>
            <Button asChild variant="ghost" className="mt-6">
              <a href="tel:4052857222"><Phone className="size-4" /> Call to confirm a rate</a>
            </Button>
          </div>
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-3">
            {SELF_PAY_NOTES.map((n) => (
              <div key={n} className="surface-lowest rounded-xl p-5 flex items-start gap-3 text-sm">
                <ShieldCheck className="size-4 text-primary mt-0.5 shrink-0" />
                <span>{n}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-16">
        <div className="rounded-xl gradient-primary text-primary-foreground p-12 lg:p-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-display-md">Walk in or reserve your spot.</h2>
            <p className="mt-3 text-primary-foreground/80 max-w-xl">
              Open daily 7am–8pm including holidays. Most visits wrap in 30 minutes.
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
