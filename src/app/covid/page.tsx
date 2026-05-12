import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Eyebrow } from "@/components/Editorial";
import { Button } from "@/components/ui/button";
import { SITE_URL } from "@/lib/clinics";

export const metadata: Metadata = {
  title: "COVID-19 Testing Oklahoma — Moore & OKC",
  description:
    "COVID-19 testing at Quick Urgent Care in Moore and Oklahoma City. Rapid antigen tests available walk-in, 7am–8pm daily.",
  alternates: { canonical: "/covid" },
  openGraph: {
    title: "COVID-19 Testing — Quick Urgent Care",
    description: "Rapid COVID-19 testing in Moore and Oklahoma City. Walk in 7am–8pm, no appointment needed.",
    url: `${SITE_URL}/covid`,
  },
};

const SYMPTOMS = [
  "Fever or chills", "Cough", "Shortness of breath", "Fatigue", "Body aches",
  "Headache", "Loss of taste or smell", "Sore throat", "Congestion or runny nose",
  "Nausea or vomiting", "Diarrhea",
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Do I need an appointment for COVID-19 testing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "No appointment needed. Walk in any day 7am–8pm at our Moore or Oklahoma City clinic.",
      },
    },
    {
      "@type": "Question",
      name: "How fast are COVID test results?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Rapid antigen results are available in 15–30 minutes during your visit.",
      },
    },
    {
      "@type": "Question",
      name: "Does insurance cover COVID testing?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most insurance plans cover COVID testing when ordered by a provider. Self-pay rates are available.",
      },
    },
    {
      "@type": "Question",
      name: "Can I get a COVID test if I have no symptoms?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. We test both symptomatic and asymptomatic patients. Walk in or reserve online.",
      },
    },
  ],
};

export default function Covid() {
  return (
    <Layout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section className="container pt-20 lg:pt-28 pb-12 grid lg:grid-cols-12 gap-10 items-end">
        <div className="lg:col-span-8">
          <Eyebrow tone="primary">COVID-19 Testing</Eyebrow>
          <h1 className="mt-5 text-display-xl font-display">
            COVID-19 Testing<br />Oklahoma.
          </h1>
        </div>
        <p className="lg:col-span-4 text-on-surface-variant text-lg leading-relaxed">
          Rapid antigen testing available walk-in at both locations. Results in 15–30 minutes. Open daily 7am–8pm.
        </p>
      </section>

      <section className="container py-12">
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { title: "Rapid antigen test", desc: "Results during your visit — 15 to 30 minutes. Most accurate within 5 days of symptom onset." },
            { title: "Walk in, no appointment", desc: "Both Moore and OKC locations accept walk-ins for COVID testing any day, 7am–8pm." },
            { title: "Return-to-work notes", desc: "We provide documentation for employers and schools upon request." },
          ].map((item) => (
            <div key={item.title} className="surface-lowest rounded-xl p-7">
              <div className="size-10 rounded-lg bg-surface-base grid place-items-center text-primary">
                <Check className="size-4" />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-on-surface-variant text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="surface-low">
        <div className="container py-20 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <Eyebrow>Symptoms</Eyebrow>
            <h2 className="mt-4 text-display-md font-display">Common COVID-19 symptoms.</h2>
            <p className="mt-4 text-on-surface-variant">
              If you&apos;re experiencing any of these symptoms, come in for a test. You don&apos;t need symptoms to get tested.
            </p>
          </div>
          <div className="lg:col-span-8">
            <div className="grid sm:grid-cols-2 gap-3">
              {SYMPTOMS.map((s) => (
                <div key={s} className="surface-lowest rounded-lg px-4 py-3 flex items-center gap-2 text-sm">
                  <span className="size-1.5 rounded-full bg-primary shrink-0" />
                  {s}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container py-20">
        <Eyebrow>FAQ</Eyebrow>
        <h2 className="mt-4 text-display-md font-display">Common questions.</h2>
        <div className="mt-8 space-y-3 max-w-2xl">
          {faqJsonLd.mainEntity.map((f) => (
            <details key={f.name} className="group surface-lowest rounded-xl p-6">
              <summary className="cursor-pointer list-none flex items-center justify-between gap-4 font-medium">
                {f.name}
                <span className="text-primary group-open:rotate-45 transition-transform text-xl">+</span>
              </summary>
              <p className="mt-3 text-on-surface-variant text-sm leading-relaxed">{f.acceptedAnswer.text}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="container py-12">
        <div className="rounded-xl gradient-primary text-primary-foreground p-12 lg:p-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lift-ambient">
          <div>
            <h2 className="font-display text-display-md">Walk in or reserve your spot.</h2>
            <p className="mt-3 text-primary-foreground/80 max-w-xl">
              COVID testing visits typically take 20–30 minutes. Reserve online to skip the wait.
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
