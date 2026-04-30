"use client";
import { Layout } from "@/components/Layout";
import { Eyebrow } from "@/components/Editorial";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";

const CATEGORIES = [
  {
    label: "Office visits",
    items: [
      { service: "Self-pay urgent care visit", price: "89", note: "All-inclusive provider visit, most conditions" },
      { service: "Established patient follow-up", price: "75", note: "Within 14 days of initial visit" },
      { service: "Telehealth virtual visit", price: "59", note: "From your car or home, 7am–7pm" },
    ],
  },
  {
    label: "Imaging & procedures",
    items: [
      { service: "Digital X-ray (per region)", price: "75", note: "Read on-site, in minutes" },
      { service: "Laceration repair (simple)", price: "150", note: "Sutures or staples, includes follow-up" },
      { service: "Splinting / immobilization", price: "65", note: "Materials included" },
      { service: "Nebulizer treatment", price: "45", note: "For acute asthma or bronchitis" },
    ],
  },
  {
    label: "Tests & labs",
    items: [
      { service: "Rapid strep test", price: "35", note: "Results in 10 minutes" },
      { service: "Rapid flu A & B", price: "45", note: "Results in 15 minutes" },
      { service: "COVID-19 PCR test", price: "95", note: "Results next business day" },
      { service: "COVID-19 rapid antigen", price: "65", note: "Results in 15 minutes" },
      { service: "Urinalysis", price: "25", note: "On-site, 5 minutes" },
      { service: "Comprehensive metabolic panel", price: "85", note: "Send-out, 24–48 hours" },
    ],
  },
  {
    label: "Physicals & employer",
    items: [
      { service: "Sports / school physical", price: "45", note: "Form completed at visit" },
      { service: "DOT physical", price: "85", note: "Certified medical examiner" },
      { service: "Pre-employment physical", price: "75", note: "Employer programs available" },
      { service: "Drug screen (5-panel)", price: "55", note: "Chain-of-custody available" },
    ],
  },
];

const Pricing = () => (
  <Layout>
    <section className="container pt-20 lg:pt-28 pb-16 grid lg:grid-cols-12 gap-10 items-end">
      <div className="lg:col-span-8">
        <Eyebrow tone="primary">Pricing transparency ledger</Eyebrow>
        <h1 className="mt-5 text-display-xl font-display">What it costs.<br />Before you walk in.</h1>
      </div>
      <p className="lg:col-span-4 text-on-surface-variant text-lg leading-relaxed">
        Self-pay rates published openly. Most major insurance accepted: your visit may cost less.
      </p>
    </section>

    <section className="container pb-12 grid lg:grid-cols-3 gap-4">
      {[
        ["Most major insurance accepted", "Aetna, BCBS, Cigna, United, Tricare and more."],
        ["No facility fees", "What you see is what you pay. No hidden charges."],
        ["HSA & FSA accepted", "Use pre-tax dollars at the time of visit."],
      ].map(([title, desc]) => (
        <div key={title as string} className="surface-low rounded-xl p-6 flex items-start gap-3">
          <div className="size-8 rounded-lg bg-secondary-container text-secondary grid place-items-center shrink-0">
            <Check className="size-4" />
          </div>
          <div>
            <div className="font-medium">{title}</div>
            <div className="text-sm text-on-surface-variant mt-1">{desc}</div>
          </div>
        </div>
      ))}
    </section>

    {CATEGORIES.map((cat, i) => (
      <section key={cat.label} className={i % 2 ? "surface-low" : ""}>
        <div className="container py-16 grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <Eyebrow>{`Category 0${i + 1}`}</Eyebrow>
            <h2 className="mt-4 text-display-md font-display">{cat.label}</h2>
          </div>
          <div className="lg:col-span-8">
            <div className="surface-lowest rounded-xl p-2">
              {cat.items.map((row, j) => (
                <div
                  key={row.service}
                  className={`px-6 py-5 flex items-center justify-between gap-6 ${j !== cat.items.length - 1 ? "" : ""}`}
                  style={{ marginBottom: j !== cat.items.length - 1 ? 4 : 0 }}
                >
                  <div className="flex-1">
                    <div className="font-medium">{row.service}</div>
                    <div className="text-xs text-on-surface-muted mt-1">{row.note}</div>
                  </div>
                  <div className="font-display text-2xl font-semibold tracking-tight">${row.price}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    ))}

    <section className="container py-24">
      <div className="rounded-xl gradient-primary text-primary-foreground p-12 lg:p-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lift-ambient">
        <div>
          <h2 className="font-display text-display-md">Questions about cost?</h2>
          <p className="mt-3 text-primary-foreground/80 max-w-xl">Call us before your visit and we'll give you an honest estimate based on your insurance.</p>
        </div>
        <div className="flex gap-3">
          <Button asChild variant="glass" size="lg"><a href="tel:4052857222">Call 405-285-7222</a></Button>
          <Button asChild variant="glass" size="lg"><Link href="/book">Book a visit <ArrowUpRight className="size-4" /></Link></Button>
        </div>
      </div>
    </section>
  </Layout>
);

export default Pricing;
