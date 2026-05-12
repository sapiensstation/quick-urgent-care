"use client";
import { Layout } from "@/components/Layout";
import { Eyebrow } from "@/components/Editorial";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowUpRight, MapPin, Phone, Clock } from "lucide-react";
import { CLINICS } from "@/lib/clinics";
const clinicMoore = "/assets/Moore_QUC_8191.jpeg";
const clinicOkc = "/assets/okc-exterior-front.jpg";

const LOCATIONS = CLINICS.map((c) => ({
  img: c.id === "moore" ? clinicMoore : clinicOkc,
  city: c.city,
  state: c.state,
  addr: c.street,
  zip: `${c.city}, ${c.state} ${c.zip}`,
  phone: c.phone,
  fax: c.fax,
  wait: c.wait,
  note:
    c.id === "moore"
      ? "Flagship clinic on N Broadway Ave. On-site digital X-ray and ultrasound."
      : "Conveniently located on NW 122nd St. On-site digital X-ray. Serving north OKC and surrounding neighborhoods.",
}));

const Locations = () => (
  <Layout>
    <section className="container pt-20 lg:pt-28 pb-12 grid lg:grid-cols-12 gap-10 items-end">
      <div className="lg:col-span-8">
        <Eyebrow tone="primary">Locations</Eyebrow>
        <h1 className="mt-5 text-display-xl font-display">Two clinics.<br />Both built for calm, fast care.</h1>
      </div>
      <p className="lg:col-span-4 text-on-surface-variant text-lg">Walk in any day, 7am to 8pm — including holidays. Or reserve your time online and skip the line.</p>
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

    <section className="container py-12 space-y-8">
      {LOCATIONS.map((loc, i) => (
        <article
          key={loc.city}
          className={`surface-lowest rounded-xl overflow-hidden grid lg:grid-cols-12 gap-0 ${i % 2 ? "lg:[&>div:first-child]:order-2" : ""}`}
        >
          <div className="lg:col-span-6">
            <img src={loc.img} alt={`${loc.city} clinic`} loading="lazy" width={1280} height={960} className="w-full h-full min-h-[320px] object-cover" />
          </div>
          <div className="lg:col-span-6 p-10 lg:p-14 flex flex-col justify-between gap-8">
            <div>
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary-container text-secondary-on-container text-xs font-medium">
                  <span className="size-1.5 rounded-full bg-secondary" /> {loc.wait} min wait
                </span>
                <span className="label-eyebrow">Open today · 7a – 8p</span>
              </div>
              <h2 className="mt-6 text-display-lg font-display">{loc.city}, <span className="text-on-surface-variant">{loc.state}</span></h2>
              <p className="mt-4 text-on-surface-variant max-w-md">{loc.note}</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-6 text-sm">
              <div>
                <div className="label-eyebrow mb-2">Address</div>
                <div className="flex items-start gap-2"><MapPin className="size-4 mt-0.5 text-primary" /><div>{loc.addr}<br />{loc.zip}</div></div>
              </div>
              <div>
                <div className="label-eyebrow mb-2">Contact</div>
                <div className="flex items-center gap-2"><Phone className="size-4 text-primary" /> {loc.phone}</div>
                <div className="text-on-surface-muted text-xs mt-1">Fax {loc.fax}</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild><Link href="/book">Book this clinic <ArrowUpRight className="size-4" /></Link></Button>
              <Button variant="ghost" asChild><a href={`tel:${loc.phone.replace(/-/g, "")}`}>Call</a></Button>
            </div>
          </div>
        </article>
      ))}
    </section>

    <section className="container py-20">
      <div className="surface-low rounded-xl p-12 lg:p-16 grid md:grid-cols-3 gap-8 text-center md:text-left">
        {[
          { icon: Clock, title: "Open daily", desc: "7am to 8pm, every single day — including holidays." },
          { icon: MapPin, title: "Two locations", desc: "Moore (X-ray & ultrasound) and Oklahoma City (X-ray) — walk in any time." },
          { icon: Phone, title: "Call ahead", desc: "Our team will tell you exactly what to expect." },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="flex flex-col items-center md:items-start gap-3">
            <div className="size-11 rounded-lg bg-surface-lowest grid place-items-center text-primary"><Icon className="size-5" /></div>
            <h3 className="font-display text-lg font-semibold">{title}</h3>
            <p className="text-sm text-on-surface-variant">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  </Layout>
);

export default Locations;
