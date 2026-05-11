import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Phone, Clock, Printer } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Eyebrow } from "@/components/Editorial";
import { Button } from "@/components/ui/button";
import { CLINICS, SITE_URL } from "@/lib/clinics";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact Quick Urgent Care in Moore and Oklahoma City. Open daily 7am–8pm. Walk in or call — no appointment needed.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Quick Urgent Care",
    description: "Walk-in urgent care in Moore and Oklahoma City. Open daily 7am–8pm including holidays.",
    url: `${SITE_URL}/contact`,
  },
};

export default function Contact() {
  return (
    <Layout>
      <section className="container pt-20 lg:pt-28 pb-12 grid lg:grid-cols-12 gap-10 items-end">
        <div className="lg:col-span-8">
          <Eyebrow tone="primary">Contact</Eyebrow>
          <h1 className="mt-5 text-display-xl font-display">
            Oklahoma Best<br />Urgent Care Services.
          </h1>
        </div>
        <p className="lg:col-span-4 text-on-surface-variant text-lg leading-relaxed">
          Walk in any day 7am–8pm — no appointment needed. Or call ahead and our team will tell you exactly what to expect.
        </p>
      </section>

      <section className="container py-12">
        <div className="grid lg:grid-cols-2 gap-6">
          {CLINICS.map((c) => (
            <div key={c.id} className="surface-lowest rounded-xl p-8 lg:p-10 space-y-6">
              <div>
                <Eyebrow>{c.city}, {c.state}</Eyebrow>
                <h2 className="mt-3 font-display text-display-md">{c.city}</h2>
              </div>

              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="size-4 text-primary mt-0.5 shrink-0" />
                  <div>
                    <div className="font-medium">{c.street}</div>
                    <div className="text-on-surface-variant">{c.city}, {c.state} {c.zip}</div>
                    <a
                      href={c.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary text-xs mt-1 inline-block hover:underline"
                    >
                      Get directions →
                    </a>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="size-4 text-primary shrink-0" />
                  <a href={`tel:${c.phone.replace(/-/g, "")}`} className="hover:text-primary transition-colors font-medium">
                    {c.phone}
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Printer className="size-4 text-primary shrink-0" />
                  <span className="text-on-surface-variant">Fax {c.fax}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="size-4 text-primary shrink-0" />
                  <span>Open daily · 7am – 8pm (including holidays)</span>
                </li>
              </ul>

              <div className="flex gap-3 pt-2">
                <Button asChild size="sm">
                  <Link href="/book">Book a visit</Link>
                </Button>
                <Button asChild variant="ghost" size="sm">
                  <a href={`tel:${c.phone.replace(/-/g, "")}`}>Call</a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container pb-12">
        <div className="surface-lowest rounded-xl overflow-hidden lift-soft">
          <iframe
            title="Quick Urgent Care clinic locations"
            src="https://maps.google.com/maps?q=Quick+Urgent+Care+2212+N+Broadway+Ave+Moore+OK&z=10&output=embed"
            className="w-full h-[420px] border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </section>

      <section className="container py-12">
        <div className="surface-low rounded-xl p-10 lg:p-14 max-w-2xl">
          <Eyebrow>Send a message</Eyebrow>
          <h2 className="mt-4 font-display text-display-md">Get in touch.</h2>
          <p className="mt-3 text-on-surface-variant">
            For billing or general inquiries — not for medical questions. For medical concerns, please call or walk in.
          </p>
          <form
            action="/api/contact"
            method="POST"
            className="mt-8 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="label-eyebrow mb-2 block" htmlFor="name">Full name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full surface-lowest border border-outline-variant/30 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary"
                  placeholder="Jane Smith"
                />
              </div>
              <div>
                <label className="label-eyebrow mb-2 block" htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full surface-lowest border border-outline-variant/30 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary"
                  placeholder="jane@example.com"
                />
              </div>
            </div>
            <div>
              <label className="label-eyebrow mb-2 block" htmlFor="subject">Subject</label>
              <input
                id="subject"
                name="subject"
                type="text"
                className="w-full surface-lowest border border-outline-variant/30 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary"
                placeholder="Billing question, general inquiry, etc."
              />
            </div>
            <div>
              <label className="label-eyebrow mb-2 block" htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                className="w-full surface-lowest border border-outline-variant/30 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary resize-none"
                placeholder="How can we help?"
              />
            </div>
            <Button type="submit" size="lg">Send message</Button>
          </form>
        </div>
      </section>
    </Layout>
  );
}
