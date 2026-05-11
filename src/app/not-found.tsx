import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight, Phone, Home } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Eyebrow } from "@/components/Editorial";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

const QUICK_LINKS = [
  { href: "/services", label: "Services" },
  { href: "/locations", label: "Locations" },
  { href: "/providers", label: "Providers" },
  { href: "/plan-your-visit", label: "Plan your visit" },
  // { href: "/contact", label: "Contact" },
  { href: "/book", label: "Book a visit" },
];

export default function NotFound() {
  return (
    <Layout>
      <section className="container pt-20 lg:pt-28 pb-12 max-w-3xl mx-auto text-center">
        <Eyebrow tone="primary">404 — page not found</Eyebrow>
        <h1 className="mt-6 text-display-2xl font-display">
          That page is on a<br />
          <span className="italic font-light">walk-in break.</span>
        </h1>
        <p className="mt-8 text-lg text-on-surface-variant leading-relaxed">
          The page you&apos;re looking for moved, was renamed, or never existed. Our clinics, on the other hand, are open daily 7am–8pm.
        </p>

        <div className="mt-10 flex flex-wrap gap-3 justify-center">
          <Button asChild size="lg">
            <Link href="/"><Home className="size-4" /> Back to home</Link>
          </Button>
          <Button asChild variant="ghost" size="lg">
            <a href="tel:4052857222"><Phone className="size-4" /> Call 405-285-7222</a>
          </Button>
        </div>
      </section>

      <section className="container py-16">
        <Eyebrow>Try one of these</Eyebrow>
        <h2 className="mt-3 font-display text-display-md text-center">Where were you headed?</h2>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-3xl mx-auto">
          {QUICK_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="surface-lowest rounded-xl p-5 flex items-center justify-between hover:lift-soft transition-all group"
            >
              <span className="font-medium">{l.label}</span>
              <ArrowUpRight className="size-4 text-on-surface-muted group-hover:text-primary transition-colors" />
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
}
