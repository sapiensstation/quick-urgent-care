"use client";
import { Layout } from "@/components/Layout";
import { Eyebrow, SectionHeader } from "@/components/Editorial";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

/* Categorized pricing intentionally hidden — keep only ER vs urgent care comparison.
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
      { service: "Drug screen (5-panel)", price: "55", note: "Employer programs available" },
    ],
  },
];
*/

const Pricing = () => (
  <Layout>
    <section className="container pt-20 lg:pt-28 pb-16 grid lg:grid-cols-12 gap-10 items-end">
      <div className="lg:col-span-8">
        <Eyebrow tone="primary">Pricing</Eyebrow>
        <h1 className="mt-5 text-display-xl font-display">A fraction of the cost.<br />Often a fraction of the wait.</h1>
      </div>
      <p className="lg:col-span-4 text-on-surface-variant text-lg leading-relaxed">
        For most non-life-threatening issues, urgent care delivers the same diagnosis and treatment without the emergency-room markup.
      </p>
    </section>

    <section className="container py-12">
      <SectionHeader
        eyebrow="ER vs urgent care"
        title={<>What an average visit costs.</>}
        description="Average emergency room cost vs Quick Urgent Care self-pay. Source: Health Care Cost Institute."
      />
      <div className="mt-12 grid md:grid-cols-2 gap-6">
        <article className="surface-lowest rounded-xl p-10 lg:p-12 border border-outline-variant/20">
          <div className="label-eyebrow text-on-surface-muted">Average ER visit</div>
          <div className="mt-6 flex items-baseline gap-2">
            <span className="font-display text-display-lg font-semibold tracking-tight text-on-surface-variant">$2,200</span>
          </div>
          <ul className="mt-8 space-y-3 text-sm text-on-surface-variant">
            <li className="flex items-start gap-3"><span className="mt-1.5 size-1.5 rounded-full bg-on-surface-muted" /><span>Hours-long wait for non-critical issues</span></li>
            <li className="flex items-start gap-3"><span className="mt-1.5 size-1.5 rounded-full bg-on-surface-muted" /><span>Facility fees billed separately from physician fees</span></li>
            <li className="flex items-start gap-3"><span className="mt-1.5 size-1.5 rounded-full bg-on-surface-muted" /><span>Surprise out-of-network charges</span></li>
          </ul>
        </article>
        <article className="rounded-xl gradient-primary text-primary-foreground p-10 lg:p-12 lift-soft">
          <div className="label-eyebrow text-primary-foreground/70">Quick Urgent Care visit</div>
          <div className="mt-6 flex items-baseline gap-2">
            <span className="font-display text-display-lg font-semibold tracking-tight">$89</span>
            <span className="text-primary-foreground/80 text-sm">self-pay</span>
          </div>
          <ul className="mt-8 space-y-3 text-sm">
            <li className="flex items-start gap-3"><span className="mt-1.5 size-1.5 rounded-full bg-primary-foreground" /><span>~15 min average door-to-doctor</span></li>
            <li className="flex items-start gap-3"><span className="mt-1.5 size-1.5 rounded-full bg-primary-foreground" /><span>One transparent price — imaging and labs billed at posted rates</span></li>
            <li className="flex items-start gap-3"><span className="mt-1.5 size-1.5 rounded-full bg-primary-foreground" /><span>Most major insurance accepted</span></li>
          </ul>
          <p className="mt-8 text-xs text-primary-foreground/70">
            Life-threatening symptoms (chest pain, stroke signs, severe bleeding) — call 911 or go to the nearest ER.
          </p>
        </article>
      </div>
    </section>

    <section className="container py-24">
      <div className="rounded-xl gradient-primary text-primary-foreground p-12 lg:p-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lift-ambient">
        <div>
          <h2 className="font-display text-display-md">Questions about cost?</h2>
          <p className="mt-3 text-primary-foreground/80 max-w-xl">Call us before your visit and we will give you an honest estimate based on your insurance.</p>
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
