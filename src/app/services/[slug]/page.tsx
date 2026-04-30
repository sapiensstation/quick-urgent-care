import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Check, MapPin, Clock } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Eyebrow } from "@/components/Editorial";
import { Button } from "@/components/ui/button";
import { SERVICE_PAGES } from "@/lib/service-pages";
import { CLINICS, SITE_URL } from "@/lib/clinics";

export const dynamicParams = false;

export function generateStaticParams() {
  return SERVICE_PAGES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const svc = SERVICE_PAGES.find((s) => s.slug === slug);
  if (!svc) return {};
  return {
    title: svc.metaTitle,
    description: svc.metaDescription,
    alternates: { canonical: `/services/${svc.slug}` },
    openGraph: { title: svc.metaTitle, description: svc.metaDescription, url: `${SITE_URL}/services/${svc.slug}` },
  };
}

export default async function ServiceDetail(
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const svc = SERVICE_PAGES.find((s) => s.slug === slug);
  if (!svc) return notFound();

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: svc.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: svc.title,
    description: svc.metaDescription,
    url: `${SITE_URL}/services/${svc.slug}`,
    provider: {
      "@type": "MedicalOrganization",
      name: "Quick Urgent Care",
      url: SITE_URL,
    },
  };

  return (
    <Layout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <section className="container pt-20 lg:pt-28 pb-12 grid lg:grid-cols-12 gap-10 items-end">
        <div className="lg:col-span-8">
          <Eyebrow tone="primary">{svc.eyebrow}</Eyebrow>
          <h1 className="mt-5 text-display-xl font-display">{svc.hero}</h1>
        </div>
        <p className="lg:col-span-4 text-on-surface-variant text-lg leading-relaxed">{svc.intro}</p>
      </section>

      {svc.price && (
        <section className="container">
          <div className="surface-lowest rounded-xl p-6 lg:p-8 flex items-center justify-between gap-4 lift-soft">
            <div>
              <div className="label-eyebrow">Self-pay rate</div>
              <div className="mt-1 font-display text-2xl font-semibold">{svc.price}</div>
            </div>
            <Button asChild><Link href="/book">Book a visit <ArrowUpRight className="size-4" /></Link></Button>
          </div>
        </section>
      )}

      <section className="container py-16 grid md:grid-cols-3 gap-4">
        {svc.highlights.map((h) => (
          <div key={h.title} className="surface-lowest rounded-xl p-7">
            <div className="size-10 rounded-lg bg-surface-base grid place-items-center text-primary">
              <Check className="size-4" />
            </div>
            <h3 className="mt-5 font-display text-lg font-semibold">{h.title}</h3>
            <p className="mt-2 text-on-surface-variant text-sm leading-relaxed">{h.desc}</p>
          </div>
        ))}
      </section>

      <section className="surface-low">
        <div className="container py-16 lg:py-24 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <Eyebrow>FAQ</Eyebrow>
            <h2 className="mt-4 text-display-md font-display">Common questions.</h2>
          </div>
          <div className="lg:col-span-8 space-y-3">
            {svc.faqs.map((f) => (
              <details key={f.q} className="group surface-lowest rounded-xl p-6">
                <summary className="cursor-pointer list-none flex items-center justify-between gap-4 font-medium">
                  {f.q}
                  <span className="text-primary group-open:rotate-45 transition-transform text-xl">+</span>
                </summary>
                <p className="mt-3 text-on-surface-variant text-sm leading-relaxed">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-16">
        <div className="grid md:grid-cols-2 gap-4">
          {CLINICS.map((c) => (
            <Link
              key={c.id}
              href="/locations"
              className="surface-lowest rounded-xl p-6 hover:lift-soft transition-all"
            >
              <div className="flex items-center gap-2 text-xs text-on-surface-muted">
                <Clock className="size-3" /> Open today · 7a – 8p
              </div>
              <div className="mt-3 font-display text-lg font-semibold">{c.city}, {c.state}</div>
              <div className="mt-1 text-sm text-on-surface-variant flex items-center gap-2">
                <MapPin className="size-4" /> {c.fullAddress}
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="container py-16">
        <div className="rounded-xl gradient-primary text-primary-foreground p-12 lg:p-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-display-md">Walk in or reserve your spot.</h2>
            <p className="mt-3 text-primary-foreground/80 max-w-xl">
              Most {svc.title.toLowerCase()} visits wrap up in 30 minutes or less.
            </p>
          </div>
          <Button asChild variant="glass" size="xl">
            <Link href="/book">Book a visit</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
