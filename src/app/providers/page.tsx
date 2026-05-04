"use client";
import { Layout } from "@/components/Layout";
import { Eyebrow } from "@/components/Editorial";
import { ProviderCard, type Provider } from "@/components/ProviderCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const PROVIDERS: Provider[] = [
  {
    name: "Iftikhar Sandhu",
    credentials: "PA-C",
    title: "Physician Assistant - Certified",
    description: "Brings warmth and precision to every visit, from sniffles to stitches.",
    image: "https://quickurgentcareok.com/wp-content/uploads/2022/09/IMG_1066.jpg",
    yearsExperience: 9,
    patientsServed: "6k+",
  },
  {
    name: "Lisa McConnell",
    credentials: "APRN-CNP",
    title: "Advanced Practice Registered Nurse - Certified Nurse Practitioner",
    description: "Dedicated to compassionate, evidence-based care for patients of all ages.",
    yearsExperience: 8,
    patientsServed: "5k+",
  },
  {
    name: "Rebecca Williams",
    credentials: "PA-C",
    title: "Physician Assistant - Certified",
    description: "Specializes in acute illness, minor injuries, and preventive wellness visits.",
    yearsExperience: 7,
    patientsServed: "4.5k+",
  },
  {
    name: "Shawn Fadum",
    credentials: "PA-C",
    title: "Physician Assistant - Certified",
    description: "Thorough and attentive care with a focus on fast, accurate diagnosis.",
    yearsExperience: 6,
    patientsServed: "4k+",
  },
  {
    name: "Jacalyn Honeywell",
    credentials: "PA-C",
    title: "Physician Assistant - Certified",
    description: "Patient-centered approach to urgent care with a warm, reassuring bedside manner.",
    yearsExperience: 5,
    patientsServed: "3.5k+",
  },
  {
    name: "Jessi Syler",
    credentials: "PA-C",
    title: "Physician Assistant - Certified",
    description: "Patient-first care with a focus on clear communication and quick results.",
    yearsExperience: 5,
    patientsServed: "3k+",
  },
  {
    name: "Simran Hari",
    credentials: "PA-C",
    title: "Physician Assistant - Certified",
    description: "Committed to delivering high-quality, efficient care with a personal touch.",
    yearsExperience: 4,
    patientsServed: "2.5k+",
  },
  {
    name: "Michael Stancliff",
    credentials: "PA-C",
    title: "Physician Assistant - Certified",
    description: "Skilled in managing a wide range of urgent care conditions with precision and care.",
    yearsExperience: 6,
    patientsServed: "4k+",
  },
];

const Providers = () => (
  <Layout>
    <section className="container pt-20 lg:pt-28 pb-16 grid lg:grid-cols-12 gap-10 items-end">
      <div className="lg:col-span-8">
        <Eyebrow tone="primary">Providers</Eyebrow>
        <h1 className="mt-5 text-display-xl font-display">
          Meet the team
          <br />
          behind the care.
        </h1>
      </div>
      <p className="lg:col-span-4 text-on-surface-variant text-lg leading-relaxed">
        Board-certified physicians and physician assistants with over 25 years of combined
        experience in emergency and family medicine.
      </p>
    </section>

    <section className="surface-low">
      <div className="container py-20 lg:py-28">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROVIDERS.map((p) => (
            <ProviderCard key={p.name} provider={p} />
          ))}
        </div>
      </div>
    </section>

    <section className="container py-24">
      <div className="rounded-xl gradient-primary text-primary-foreground p-12 lg:p-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lift-ambient">
        <div>
          <h2 className="font-display text-display-md">Ready to see a provider?</h2>
          <p className="mt-3 text-primary-foreground/80 max-w-xl">
            Walk in any day 7am–8pm, or reserve your spot online.
          </p>
        </div>
        <Button asChild variant="glass" size="xl">
          <Link href="/book">Book a visit</Link>
        </Button>
      </div>
    </section>
  </Layout>
);

export default Providers;
