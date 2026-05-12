import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, MapPin, Phone, Clock } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Eyebrow } from "@/components/Editorial";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { CLINICS, SITE_URL } from "@/lib/clinics";

export const dynamicParams = false;

export function generateStaticParams() {
  return CLINICS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const c = CLINICS.find((x) => x.slug === slug);
  if (!c) return {};
  return {
    title: `Quick Urgent Care — ${c.city}, ${c.state}`,
    description: `Walk-in urgent care at ${c.fullAddress}. Open daily 7am–8pm including holidays.`,
    alternates: { canonical: `/locations/${c.slug}` },
  };
}

export default async function ClinicPage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const c = CLINICS.find((x) => x.slug === slug);
  if (!c) return notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "@id": `${SITE_URL}/locations/${c.slug}`,
    name: `Quick Urgent Care — ${c.city}`,
    url: `${SITE_URL}/locations/${c.slug}`,
    telephone: `+1-${c.phone}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: c.street,
      addressLocality: c.city,
      addressRegion: c.state,
      postalCode: c.zip,
      addressCountry: "US",
    },
    geo: { "@type": "GeoCoordinates", latitude: c.geo.lat, longitude: c.geo.lng },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "07:00",
        closes: "20:00",
      },
    ],
  };

  return (
    <Layout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Locations", href: "/locations" },
          { label: c.city },
        ]}
      />

      <section className="container pt-12 lg:pt-16 pb-12 grid lg:grid-cols-12 gap-10 items-end">
        <div className="lg:col-span-8">
          <Eyebrow tone="primary">{c.city}, {c.state}</Eyebrow>
          <h1 className="mt-5 text-display-xl font-display">Quick Urgent Care — {c.city}.</h1>
        </div>
        <p className="lg:col-span-4 text-on-surface-variant text-lg leading-relaxed">
          {c.fullAddress}. Walk in any day 7am–8pm including holidays, or reserve your time online.
        </p>
      </section>

      <section className="container">
        <div className="surface-lowest rounded-xl p-6 lg:p-8 grid sm:grid-cols-3 gap-6 lift-soft">
          <div>
            <div className="label-eyebrow">Address</div>
            <div className="mt-1 flex items-start gap-2"><MapPin className="size-4 mt-0.5 text-primary" /><span>{c.fullAddress}</span></div>
          </div>
          <div>
            <div className="label-eyebrow">Phone</div>
            <a href={`tel:${c.phone.replace(/-/g, "")}`} className="mt-1 flex items-center gap-2"><Phone className="size-4 text-primary" />{c.phone}</a>
            <div className="text-on-surface-muted text-xs mt-1">Fax {c.fax}</div>
          </div>
          <div>
            <div className="label-eyebrow">Hours</div>
            <div className="mt-1 flex items-center gap-2"><Clock className="size-4 text-primary" />Daily 7am – 8pm</div>
          </div>
        </div>
      </section>

      <section className="container py-12">
        <div className="surface-lowest rounded-xl overflow-hidden lift-soft">
          <iframe
            title={`${c.city} clinic map`}
            src={`https://maps.google.com/maps?q=${encodeURIComponent(c.fullAddress)}&z=15&output=embed`}
            className="w-full h-[420px] border-0"
            loading="lazy"
          />
        </div>
      </section>

      <section className="container py-16">
        <div className="rounded-xl gradient-primary text-primary-foreground p-12 lg:p-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-display-md">Walk in or reserve your spot.</h2>
            <p className="mt-3 text-primary-foreground/80 max-w-xl">Most visits wrap in 30 minutes.</p>
          </div>
          <div className="flex gap-3">
            <Button asChild variant="glass" size="xl"><a href={`tel:${c.phone.replace(/-/g, "")}`}>Call {c.phone}</a></Button>
            <Button asChild variant="hero" size="xl"><Link href="/book">Book a visit <ArrowUpRight className="size-4" /></Link></Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
