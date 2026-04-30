import Link from "next/link";
import { ArrowUpRight, MapPin, Phone, Clock } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Eyebrow } from "@/components/Editorial";
import { Button } from "@/components/ui/button";
import { CLINICS } from "@/lib/clinics";

export default function Book() {
  return (
    <Layout>
      <section className="container pt-20 lg:pt-28 pb-12 grid lg:grid-cols-12 gap-10 items-end">
        <div className="lg:col-span-8">
          <Eyebrow tone="primary">Book a visit</Eyebrow>
          <h1 className="mt-5 text-display-xl font-display">Pick your clinic.</h1>
        </div>
        <p className="lg:col-span-4 text-on-surface-variant text-lg leading-relaxed">
          Reserve your spot online via Clockwise. You will be redirected to the secure scheduling page for your chosen location.
        </p>
      </section>

      <section className="container py-12 grid md:grid-cols-2 gap-6">
        {CLINICS.map((c) => (
          <article key={c.id} className="surface-lowest rounded-xl p-8 lg:p-10 lift-soft flex flex-col gap-6">
            <div>
              <div className="label-eyebrow">{c.city}, {c.state}</div>
              <h2 className="mt-2 font-display text-display-md">{c.city}</h2>
              <div className="mt-4 flex items-start gap-2 text-on-surface-variant text-sm">
                <MapPin className="size-4 mt-0.5 text-primary" /> {c.fullAddress}
              </div>
              <div className="mt-2 flex items-center gap-2 text-on-surface-variant text-sm">
                <Clock className="size-4 text-primary" /> Daily 7am – 8pm, including holidays
              </div>
              <a href={`tel:${c.phone.replace(/-/g, "")}`} className="mt-2 flex items-center gap-2 text-on-surface-variant text-sm">
                <Phone className="size-4 text-primary" /> {c.phone}
              </a>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <a href={c.bookUrl} target="_blank" rel="noopener noreferrer">
                  Book {c.city} <ArrowUpRight className="size-4" />
                </a>
              </Button>
              <Button asChild variant="ghost" size="lg" className="w-full sm:w-auto">
                <Link href={`/locations/${c.slug}`}>Clinic details</Link>
              </Button>
            </div>
          </article>
        ))}
      </section>
    </Layout>
  );
}
