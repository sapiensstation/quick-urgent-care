import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, MapPin, Phone, Clock, Stethoscope } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Eyebrow } from "@/components/Editorial";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { SEO_LANDINGS } from "@/lib/seo-landings";
import { SITE_URL } from "@/lib/clinics";

export const dynamicParams = false;

export function generateStaticParams() {
  return SEO_LANDINGS.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const lp = SEO_LANDINGS.find((l) => l.slug === slug);
  if (!lp) return {};
  return {
    title: lp.metaTitle,
    description: lp.metaDescription,
    alternates: { canonical: `/${lp.slug}` },
    openGraph: { title: lp.metaTitle, description: lp.metaDescription, url: `${SITE_URL}/${lp.slug}` },
  };
}

export default async function SeoLandingPage(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const lp = SEO_LANDINGS.find((l) => l.slug === slug);
  if (!lp) return notFound();

  const c = lp.clinic;
  const localBizJsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "@id": `${SITE_URL}/${lp.slug}`,
    name: `Quick Urgent Care — ${c.city}`,
    url: `${SITE_URL}/${lp.slug}`,
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBizJsonLd) }} />

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: lp.h1.replace(/\.$/, "") },
        ]}
      />

      <section className="container pt-12 lg:pt-16 pb-12 grid lg:grid-cols-12 gap-10 items-end">
        <div className="lg:col-span-8">
          <Eyebrow tone="primary">{c.city}, {c.state}</Eyebrow>
          <h1 className="mt-5 text-display-xl font-display">{lp.h1}</h1>
        </div>
        <p className="lg:col-span-4 text-on-surface-variant text-lg leading-relaxed">
          {lp.intent === "walk-in"
            ? `No appointment needed. Walk in any day 7am–8pm including holidays at ${c.fullAddress}.`
            : `Board-certified urgent care at ${c.fullAddress}. On-site X-ray, transparent pricing, most insurance accepted.`}
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
          </div>
          <div>
            <div className="label-eyebrow">Hours</div>
            <div className="mt-1 flex items-center gap-2"><Clock className="size-4 text-primary" />Daily 7am – 8pm</div>
          </div>
        </div>
      </section>

      <section className="container py-16 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7">
          <Eyebrow>What we treat</Eyebrow>
          <h2 className="mt-3 text-display-md font-display">Most of what sends you to the ER — without the ER bill.</h2>
          <p className="mt-5 text-on-surface-variant leading-relaxed">
            Cold and flu, strep, sinus and ear infections, sprains, fractures, lacerations, asthma flare-ups,
            UTIs, rashes, vaccinations, and more. We also handle sports physicals, DOT exams, and occupational
            medicine for {c.city} employers.
          </p>
          <div className="mt-8 grid sm:grid-cols-2 gap-3">
            {[
              "Digital X-ray on-site",
              "Pediatric care 6 months+",
              "Sports / DOT physicals",
              "Vaccinations",
              "Lab testing",
              "Occupational medicine",
            ].map((s) => (
              <div key={s} className="flex items-center gap-2 text-sm">
                <Stethoscope className="size-4 text-primary" /> {s}
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-5">
          <div className="surface-lowest rounded-xl overflow-hidden lift-soft">
            <iframe
              title={`${c.city} clinic map`}
              src={`https://maps.google.com/maps?q=${encodeURIComponent(c.fullAddress)}&z=14&output=embed`}
              className="w-full h-[320px] border-0"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {(lp.longCopy?.length || lp.neighborhoods?.length) && (
        <section className="surface-low">
          <div className="container py-16 lg:py-20 grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7 space-y-5">
              <Eyebrow>About this clinic</Eyebrow>
              <h2 className="font-display text-display-md">{c.city}, {c.state} — built around walk-in care.</h2>
              {lp.longCopy?.map((p, i) => (
                <p key={i} className="text-on-surface-variant leading-relaxed">{p}</p>
              ))}
            </div>
            {lp.neighborhoods?.length ? (
              <div className="lg:col-span-5">
                <Eyebrow>Neighborhoods we serve</Eyebrow>
                <div className="mt-4 flex flex-wrap gap-2">
                  {lp.neighborhoods.map((n) => (
                    <span key={n} className="px-3 py-1.5 rounded-full surface-lowest text-sm border border-outline-variant/15">
                      {n}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </section>
      )}

      <section className="container py-16">
        <div className="rounded-xl gradient-primary text-primary-foreground p-12 lg:p-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-display-md">Walk in or reserve your time.</h2>
            <p className="mt-3 text-primary-foreground/80 max-w-xl">
              Most visits wrap in 30 minutes. Confirmed by text in minutes when you book online.
            </p>
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
