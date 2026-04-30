"use client";
import { Layout } from "@/components/Layout";
import { Eyebrow } from "@/components/Editorial";
import { ProviderCard, type Provider } from "@/components/ProviderCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const PROVIDERS: Provider[] = [
  {
    name: "Rebecca Williams",
    credentials: "PA-C",
    title: "Physician Assistant - Certified",
    description: "Specializes in acute illness, minor injuries, and preventive wellness visits.",
    image: "https://quickurgentcareok.com/wp-content/uploads/2022/09/IMG_1005.jpg",
    yearsExperience: 7,
    patientsServed: "4.5k+",
  },
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
    name: "James Le",
    credentials: "DO",
    title: "Doctor of Osteopathic Medicine",
    description: "Whole-person care with deep expertise in family and emergency medicine.",
    image: "https://quickurgentcareok.com/wp-content/uploads/2022/04/Untitled.png",
    yearsExperience: 12,
    patientsServed: "15k+",
  },
  {
    name: "Crystal Richerson",
    credentials: "PA-C",
    title: "Physician Assistant - Certified",
    description: "Compassionate care for the whole family, with a focus on clear answers and fast recovery.",
    yearsExperience: 6,
    patientsServed: "4k+",
  },
  {
    name: "Jessi Siler",
    credentials: "PA-C",
    title: "Physician Assistant - Certified",
    description: "Patient-first care with a focus on clear communication and quick results.",
    yearsExperience: 5,
    patientsServed: "3k+",
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
