import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Star } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Eyebrow } from "@/components/Editorial";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { SITE_URL, SITE_NAME } from "@/lib/clinics";

export const metadata: Metadata = {
  title: "Patient Reviews",
  description:
    "Read patient reviews of Quick Urgent Care in Moore and Oklahoma City. 4.9 stars across 1,600+ Google, Solv, and BirdEye reviews.",
  alternates: { canonical: "/reviews" },
  openGraph: {
    title: "Patient Reviews — Quick Urgent Care",
    description: "4.9 stars across 1,600+ patient reviews on Google, Solv, and BirdEye.",
    url: `${SITE_URL}/reviews`,
  },
};

const REVIEWS = [
  { stars: 5, quote: "Absolutely love this place. Friendly, quick service, well organized. Top notch. Highly recommend.", author: "William F.", date: "Mar 2021" },
  { stars: 5, quote: "The physician was wonderful — she made sure I was comfortable during the procedure and was very kind and gentle.", author: "Laura R.", date: "Apr 2021" },
  { stars: 5, quote: "This place is great! They provide excellent compassionate medical care.", author: "Tara R.", date: "Apr 2021" },
  { stars: 5, quote: "The staff is always so nice! We've been here a few times!", author: "Kaylynn M.", date: "May 2021" },
  { stars: 5, quote: "This is the only place we go. They do a great job and are very good at what they do.", author: "Alex S.", date: "May 2021" },
  { stars: 5, quote: "This is my return visit from yesterday. You followed up with injections and I already feel better. Thank you for helping our community.", author: "Shirley C.", date: "Apr 2021" },
  { stars: 5, quote: "You guys are always professional and courteous. I always recommend you. Thank you.", author: "D.R. Anderson", date: "Mar 2026" },
  { stars: 5, quote: "They were great! I never have any problems — very patient and answer all questions. In and out and all taken care of.", author: "Corrie Hankins", date: "Feb 2026" },
  { stars: 5, quote: "Exceptional experience! A+ I have been going here for several years. I highly recommend!", author: "Verified Patient", date: "Feb 2026" },
  { stars: 5, quote: "Very nice and professional, seen quickly.", author: "Ken Bradley", date: "Feb 2026" },
  { stars: 5, quote: "Never a long wait and always professional.", author: "Linda McMillin", date: "Feb 2026" },
  { stars: 5, quote: "Everyone is always very nice. The doctor is excellent.", author: "Charley D.", date: "Apr 2021" },
];

export default function Reviews() {
  const aggregateJsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    name: SITE_NAME,
    url: SITE_URL,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "1600",
      bestRating: "5",
      worstRating: "1",
    },
    review: REVIEWS.slice(0, 6).map((r) => ({
      "@type": "Review",
      reviewBody: r.quote,
      reviewRating: { "@type": "Rating", ratingValue: r.stars, bestRating: 5 },
      author: { "@type": "Person", name: r.author },
      datePublished: r.date,
    })),
  };

  return (
    <Layout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aggregateJsonLd) }} />

      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Reviews" }]} />

      <section className="container pt-12 lg:pt-16 pb-12 grid lg:grid-cols-12 gap-10 items-end">
        <div className="lg:col-span-8">
          <Eyebrow tone="primary">Patient reviews</Eyebrow>
          <h1 className="mt-5 text-display-xl font-display">
            4.9 ★ across<br />1,600+ reviews.
          </h1>
        </div>
        <p className="lg:col-span-4 text-on-surface-variant text-lg leading-relaxed">
          Reviews collected on Google, Solv, and BirdEye from patients across Moore and Oklahoma City.
        </p>
      </section>

      <section className="container py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {REVIEWS.map((r, i) => (
            <figure key={i} className="surface-lowest rounded-xl p-8 flex flex-col gap-4">
              <div className="flex gap-0.5 text-primary">
                {Array.from({ length: r.stars }).map((_, j) => (
                  <Star key={j} className="size-4 fill-current" />
                ))}
              </div>
              <blockquote className="text-on-surface text-base font-display leading-relaxed">
                &ldquo;{r.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-auto flex items-center gap-2 text-xs text-on-surface-muted">
                <span className="font-medium text-on-surface-variant">{r.author}</span>
                <span>·</span>
                <span>{r.date}</span>
                <span>·</span>
                <span>Google Review</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="container py-16">
        <div className="rounded-xl gradient-primary text-primary-foreground p-12 lg:p-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-display-md">Visited us? Leave a review.</h2>
            <p className="mt-3 text-primary-foreground/80 max-w-xl">
              Reviews help neighbors find us and let our team know what&apos;s working. Thank you.
            </p>
          </div>
          <Button asChild variant="glass" size="xl">
            <Link href="/book">Book another visit <ArrowUpRight className="size-4" /></Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
