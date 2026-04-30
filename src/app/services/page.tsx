"use client";
import { Layout } from "@/components/Layout";
import { Eyebrow, SectionHeader } from "@/components/Editorial";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowUpRight, Activity, Stethoscope, Syringe, ScanLine, ShieldCheck, ClipboardList, FlaskConical, Briefcase, HeartPulse, Baby } from "lucide-react";
import { SERVICE_PAGES } from "@/lib/service-pages";

const SERVICE_GROUPS = [
  {
    label: "Acute & illness",
    items: [
      { icon: Stethoscope, title: "Cold, flu & COVID-19", desc: "Rapid testing, antivirals when indicated, return-to-work notes." },
      { icon: HeartPulse, title: "Strep, sinus & ear infections", desc: "On-site rapid strep, evaluation and prescriptions in one visit." },
      { icon: ScanLine, title: "Asthma, bronchitis & allergies", desc: "Nebulizer treatments, inhalers, allergy management." },
    ],
  },
  {
    label: "Injury & imaging",
    items: [
      { icon: ScanLine, title: "Digital X-ray", desc: "Read on-site for fractures, sprains, foreign bodies." },
      { icon: ShieldCheck, title: "Lacerations & burns", desc: "Sutures, staples, wound care and burn management." },
      { icon: Activity, title: "Sprains, strains & splinting", desc: "Acute orthopedic injuries with on-site immobilization." },
    ],
  },
  {
    label: "Preventive & screening",
    items: [
      { icon: ClipboardList, title: "Sports & school physicals", desc: "$45. Forms completed at visit, often within 30 minutes." },
      { icon: Briefcase, title: "DOT physicals", desc: "Certified medical examiner. $85, completed same-day." },
      { icon: Syringe, title: "Vaccinations & flu shots", desc: "Travel, school, seasonal: adults and children 6mo+." },
    ],
  },
  {
    label: "Lab & specialized",
    items: [
      { icon: FlaskConical, title: "Lab draws & STD panels", desc: "Confidential testing with results in 24–72 hours." },
      { icon: Briefcase, title: "On-site drug testing", desc: "Employer programs, pre-employment, random screenings." },
      { icon: Baby, title: "Pediatric urgent care", desc: "Gentle, family-first care from 6 months and up." },
    ],
  },
];

const Services = () => (
  <Layout>
    <section className="container pt-20 lg:pt-28 pb-16 grid lg:grid-cols-12 gap-10 items-end">
      <div className="lg:col-span-8">
        <Eyebrow tone="primary">Services</Eyebrow>
        <h1 className="mt-5 text-display-xl font-display">Full-service urgent care,<br />without the surprises.</h1>
      </div>
      <p className="lg:col-span-4 text-on-surface-variant text-lg leading-relaxed">
        Equipped for nearly everything an emergency room handles, minus the bill. Walk in any day, 7am – 8pm.
      </p>
    </section>

    {SERVICE_GROUPS.map((group, i) => (
      <section key={group.label} className={i % 2 ? "surface-low" : ""}>
        <div className="container py-20">
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4">
              <Eyebrow>{`0${i + 1}`}</Eyebrow>
              <h2 className="mt-4 text-display-md font-display">{group.label}</h2>
            </div>
            <div className="lg:col-span-8 grid md:grid-cols-2 gap-4">
              {group.items.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="surface-lowest rounded-xl p-7 hover:lift-soft transition-all duration-300">
                  <div className="size-11 rounded-lg bg-surface-base grid place-items-center text-primary">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold">{title}</h3>
                  <p className="mt-2 text-on-surface-variant text-sm leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    ))}

    <section className="container py-20">
      <Eyebrow tone="primary">Service details</Eyebrow>
      <h2 className="mt-3 text-display-md font-display">Dedicated pages, deeper detail.</h2>
      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {SERVICE_PAGES.map((s) => (
          <Link
            key={s.slug}
            href={`/services/${s.slug}`}
            className="surface-lowest rounded-xl p-6 hover:lift-soft transition-all group"
          >
            <div className="label-eyebrow">{s.eyebrow}</div>
            <h3 className="mt-2 font-display text-lg font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm text-on-surface-variant leading-relaxed line-clamp-2">{s.intro}</p>
            <div className="mt-4 inline-flex items-center gap-1 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
              Learn more <ArrowUpRight className="size-3.5" />
            </div>
          </Link>
        ))}
      </div>
    </section>

    <section className="container py-24">
      <div className="rounded-xl gradient-tertiary text-tertiary-foreground p-8 sm:p-12 lg:p-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
        <div>
          <h2 className="font-display text-display-md">Not sure if we treat it?</h2>
          <p className="mt-3 text-tertiary-foreground/80 max-w-xl">Call us first: our team will tell you whether to come in, see your PCP, or head to the ER.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <Button asChild variant="glass" size="lg" className="w-full sm:w-auto"><a href="tel:4052857222">Call 405-285-7222</a></Button>
          <Button asChild variant="hero" size="lg" className="w-full sm:w-auto"><Link href="/book">Book a visit <ArrowUpRight className="size-4" /></Link></Button>
        </div>
      </div>
    </section>
  </Layout>
);

export default Services;
