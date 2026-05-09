"use client";
import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { ArrowUpRight, Activity, Stethoscope, Syringe, ScanLine, ShieldCheck, ClipboardList, MapPin, Star, ChevronLeft, ChevronRight } from "lucide-react";
const heroClinic = "/assets/Moore_QUC_8191.jpeg";
const clinicMoore = "/assets/Moore_QUC_8190.jpeg";
const clinicOkc = "/assets/IMG_1320.jpeg";
const imagingRoom = "/assets/Moore_QUC_8189.jpeg";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/Layout";
import { Eyebrow, SectionHeader, GeoChip } from "@/components/Editorial";

const SERVICES = [
  { icon: ScanLine, title: "On-site imaging", desc: "Digital X-ray and ultrasound, read in minutes, not days." },
  { icon: Stethoscope, title: "Illness & injury", desc: "Flu, strep, sprains, lacerations, infections: same-day care." },
  { icon: Syringe, title: "Vaccinations & testing", desc: "Flu shots, COVID-19 testing, STD panels, lab draws." },
  { icon: ClipboardList, title: "Physicals & screenings", desc: "Sports, school, DOT and pre-employment physicals." },
  { icon: Activity, title: "Occupational health", desc: "Workers' comp, drug testing, employer programs." },
  { icon: ShieldCheck, title: "Pediatric care", desc: "Gentle, family-first care for kids 6 months and up." },
];

const CONDITIONS = [
  "Abscesses", "Allergies", "Asthma & bronchitis", "Burns", "Cuts & lacerations",
  "Dehydration", "Ear infections", "Eye irritation", "Fever", "Flu & cold", "Fractures",
  "Headaches & migraines", "Insect bites", "Nausea & vomiting", "Pink eye", "Rashes",
  "Sinus infections", "Sore throat", "Sprains & strains", "UTIs",
];


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

const Index = () => {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const advance = useCallback((dir: 1 | -1) => {
    setActive((p) => (p + dir + REVIEWS.length) % REVIEWS.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => advance(1), 5000);
    return () => clearInterval(id);
  }, [paused, advance, active]);

  return (
    <Layout>
      {/* HERO: asymmetric editorial */}
      <section className="relative overflow-hidden">
        <div className="container pt-12 lg:pt-20 pb-24 lg:pb-32 grid lg:grid-cols-12 gap-10 lg:gap-16 items-end">
          <div className="lg:col-span-7 reveal-up">
            <Eyebrow tone="primary">Walk-in care · Open daily 7a–8p</Eyebrow>
            <h1 className="mt-6 text-display-2xl font-display">
              Walk in &<br />
              <span className="italic font-light">Urgent Care</span> Clinic.
            </h1>
            {/* <p className="mt-8 text-lg lg:text-xl text-on-surface-variant max-w-xl leading-relaxed">
              A calmer kind of urgent care in Moore and Oklahoma City. Led by Dr. James Le, DO,
              Iftikhar Sandhu, PA-C, and a board-certified team — with on-site imaging and transparent pricing.
            </p> */}
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button asChild variant="hero" size="xl">
                <Link href="/book">Book a visit <ArrowUpRight className="size-4" /></Link>
              </Button>
              <Button asChild variant="ghost" size="xl">
                <Link href="/locations">Find nearest clinic</Link>
              </Button>
            </div>
            {/* <label className="mt-6 inline-flex items-center gap-3 px-4 py-3 rounded-full surface-lowest lift-soft cursor-pointer select-none">
              <Switch checked={bookToggle} onCheckedChange={handleBookToggle} aria-label="Book a visit" />
              <span className="text-sm font-medium">
                {bookToggle ? "Taking you to booking…" : "Book a visit — flip the switch"}
              </span>
            </label> */}
            <div className="mt-10 flex flex-wrap gap-2">
              <GeoChip city="Moore, OK" distance="2212 N Broadway Ave" />
              <GeoChip city="Oklahoma City" distance="1421 NW 122nd St" />
            </div>
          </div>

          <div className="lg:col-span-5 lg:pl-8 reveal-up" style={{ animationDelay: "120ms" }}>
            <div className="relative">
              <div className="absolute -inset-6 gradient-editorial blur-3xl opacity-60 -z-10" />
              <div className="overflow-hidden rounded-xl lift-ambient">
                <img
                  src={heroClinic}
                  alt="Physician speaking with a patient in a calm, modern urgent care waiting area"
                  width={1920}
                  height={1280}
                  className="w-full h-[420px] lg:h-[560px] object-cover"
                />
              </div>
              {/* Floating live wait time card */}
              <div className="absolute -bottom-8 -left-6 lg:-left-12 glass rounded-xl p-5 w-[280px] lift-soft animate-fade-in" style={{ animationDelay: "400ms" }}>
                <div className="label-eyebrow"><span className="pulse-dot" />Live wait time</div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="text-4xl font-display font-semibold tracking-tight">12</span>
                  <span className="text-on-surface-variant text-sm">min · Moore</span>
                </div>
                <div className="mt-1 text-xs text-on-surface-muted">Updated 2 min ago</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="border-t border-outline-variant/15 surface-low">
          <div className="container py-10 grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-12">
            {[
              ["25+", "years combined board-certified provider experience"],
              ["7am–8pm", "open every single day, including holidays"],
              ["~15 min", "average door-to-doctor"],
              ["4.9★", "Google patient rating"],
            ].map(([big, small]) => (
              <div key={big as string}>
                <div className="text-3xl lg:text-4xl font-display font-semibold tracking-tight">{big}</div>
                <div className="mt-2 text-sm text-on-surface-variant max-w-[180px] leading-snug">{small}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="container py-24 lg:py-32">
        <SectionHeader
          eyebrow="What we do"
          title={<>The full spectrum of<br />walk-in care.</>}
          description="From digital X-ray to pediatric visits, our clinics are equipped to handle most of what would send you to the emergency room, at a fraction of the wait and a fraction of the cost."
          cta={
            <Button asChild variant="secondary">
              <Link href="/services">All services <ArrowUpRight className="size-4" /></Link>
            </Button>
          }
        />

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map(({ icon: Icon, title, desc }) => (
            <article
              key={title}
              className="group surface-lowest rounded-xl p-8 transition-all duration-300 ease-editorial hover:lift-soft hover:-translate-y-1"
            >
              <div className="size-12 rounded-xl bg-surface-base grid place-items-center text-primary group-hover:gradient-primary group-hover:text-primary-foreground transition-all">
                <Icon className="size-5" />
              </div>
              <h3 className="mt-6 font-display text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-on-surface-variant text-sm leading-relaxed">{desc}</p>
              <div className="mt-6 inline-flex items-center gap-1 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                Learn more <ArrowUpRight className="size-3.5" />
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* PRICING LEDGER: radical transparency */}
      {/* <section className="surface-low">
        <div className="container py-24 lg:py-32 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <Eyebrow tone="primary">Pricing transparency ledger</Eyebrow>
            <h2 className="mt-6 text-display-lg font-display">No surprises.<br />Ever.</h2>
            <p className="mt-6 text-on-surface-variant text-lg leading-relaxed">
              We publish our self-pay rates because medicine should never feel like a black box. Most major insurance accepted; ask us what your visit will cost, before it begins.
            </p>
            <Button asChild variant="tertiary" className="mt-8 px-0">
              <Link href="/pricing">See full price list <ArrowUpRight className="size-4" /></Link>
            </Button>
          </div>

          <div className="lg:col-span-7">
            <div className="surface-lowest rounded-xl p-2 lift-soft">
              <div className="px-6 py-4 flex items-center justify-between text-xs uppercase tracking-[0.12em] text-on-surface-muted">
                <span>Service</span>
                <span>Self-pay</span>
              </div>
              <div className="space-y-1">
                {PRICING.map((row) => (
                  <div key={row.service} className="surface-low rounded-lg px-6 py-5 flex items-center justify-between gap-6">
                    <div>
                      <div className="font-medium">{row.service}</div>
                      <div className="text-xs text-on-surface-muted mt-1">{row.note}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-display text-2xl font-semibold tracking-tight">${row.price}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* ER vs URGENT CARE */}
      <section className="container py-24 lg:py-32">
        <SectionHeader
          eyebrow="ER vs urgent care"
          title={<>A fraction of the cost.<br />Often a fraction of the wait.</>}
          description="For most non-life-threatening issues, urgent care delivers the same diagnosis and treatment without the emergency-room markup. Here's the difference for an average visit."
        />
        <div className="mt-16 grid md:grid-cols-2 gap-6">
          <article className="surface-lowest rounded-xl p-10 lg:p-12 border border-outline-variant/20">
            <div className="label-eyebrow text-on-surface-muted">Average ER visit</div>
            <div className="mt-6 flex items-baseline gap-2">
              <span className="font-display text-display-lg font-semibold tracking-tight text-on-surface-variant">$2,200</span>
            </div>
            <ul className="mt-8 space-y-3 text-sm text-on-surface-variant">
              <li className="flex items-start gap-3"><span className="mt-1.5 size-1.5 rounded-full bg-on-surface-muted" /><span>Hours-long wait for non-critical issues</span></li>
              <li className="flex items-start gap-3"><span className="mt-1.5 size-1.5 rounded-full bg-on-surface-muted" /><span>Facility fees billed separately from physician fees</span></li>
              <li className="flex items-start gap-3"><span className="mt-1.5 size-1.5 rounded-full bg-on-surface-muted" /><span>Surprise out-of-network charges</span></li>
            </ul>
            <p className="mt-8 text-xs text-on-surface-muted">Source: Health Care Cost Institute, average commercial ER visit cost.</p>
          </article>
          <article className="rounded-xl gradient-primary text-primary-foreground p-10 lg:p-12 lift-soft">
            <div className="label-eyebrow text-primary-foreground/70">Quick Urgent Care visit</div>
            <div className="mt-6 flex items-baseline gap-2">
              <span className="font-display text-display-lg font-semibold tracking-tight">$89</span>
              <span className="text-primary-foreground/80 text-sm">self-pay, all-inclusive</span>
            </div>
            <ul className="mt-8 space-y-3 text-sm">
              <li className="flex items-start gap-3"><span className="mt-1.5 size-1.5 rounded-full bg-primary-foreground" /><span>~15 min average door-to-doctor</span></li>
              <li className="flex items-start gap-3"><span className="mt-1.5 size-1.5 rounded-full bg-primary-foreground" /><span>One transparent price — imaging and labs billed at posted rates</span></li>
              <li className="flex items-start gap-3"><span className="mt-1.5 size-1.5 rounded-full bg-primary-foreground" /><span>Most major insurance accepted</span></li>
            </ul>
            <p className="mt-8 text-xs text-primary-foreground/70">Life-threatening symptoms (chest pain, stroke signs, severe bleeding) — call 911 or go to the nearest ER.</p>
          </article>
        </div>
      </section>

      {/* LOCATIONS */}
      <section className="container py-24 lg:py-32">
        <SectionHeader
          eyebrow="Find your clinic"
          title={<>Two clinics.<br />Same standard of care.</>}
          description="Walk-in care in Moore and Oklahoma City. Walk in any day from 7am to 8pm, or reserve a time online."
        />

        <div className="mt-16 grid lg:grid-cols-2 gap-6">
          {[
            { img: clinicMoore, city: "Moore, OK", addr: "2212 N Broadway Ave, Moore, OK 73160", phone: "405-285-7222", wait: 12 },
            { img: clinicOkc, city: "Oklahoma City, OK", addr: "1421 NW 122nd St, Oklahoma City, OK 73114", phone: "405-285-7222", wait: 18 },
          ].map((loc) => (
            <article key={loc.city} className="surface-lowest rounded-xl overflow-hidden hover:lift-soft transition-all group">
              <div className="aspect-[16/10] overflow-hidden">
                <img src={loc.img} alt={`${loc.city} clinic exterior`} loading="lazy" width={1280} height={800} className="w-full h-full object-cover transition-transform duration-700 ease-editorial group-hover:scale-105" />
              </div>
              <div className="p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-2xl font-semibold">{loc.city}</h3>
                    <div className="mt-2 text-on-surface-variant flex items-center gap-2 text-sm">
                      <MapPin className="size-4" /> {loc.addr}
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary-container text-secondary-on-container text-xs font-medium whitespace-nowrap">
                    <span className="size-1.5 rounded-full bg-secondary" /> {loc.wait} min wait
                  </span>
                </div>
                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <Button asChild>
                    <Link href="/book">Book a visit</Link>
                  </Button>
                  <Button variant="ghost" asChild>
                    <a href={`tel:${loc.phone.replace(/-/g, "")}`}>Call {loc.phone}</a>
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* IMAGING SHOWCASE: asymmetric */}
      <section className="surface-low">
        <div className="container py-24 lg:py-32 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="overflow-hidden rounded-xl lift-soft">
              <img src={imagingRoom} alt="Modern on-site imaging room with X-ray equipment" loading="lazy" width={1280} height={960} className="w-full aspect-[5/4] object-cover" />
            </div>
          </div>
          <div className="lg:col-span-5 order-1 lg:order-2 lg:pl-8">
            <Eyebrow tone="primary">On-site imaging</Eyebrow>
            <h2 className="mt-6 text-display-lg font-display">Diagnosed in minutes.<br />Not days.</h2>
            <p className="mt-6 text-on-surface-variant text-lg leading-relaxed">
              Digital X-ray and ultrasound on-site mean we don't refer you elsewhere. Our providers read images in real time, so you walk out with answers and a treatment plan.
            </p>
            <ul className="mt-8 space-y-3 text-sm">
              {["Read on-site by board-certified providers", "Images shared with your PCP within 24 hours", "Pediatric-friendly imaging room"].map((line) => (
                <li key={line} className="flex items-start gap-3">
                  <span className="mt-1.5 size-1.5 rounded-full bg-primary" />
                  <span className="text-on-surface-variant">{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CONDITIONS WE TREAT */}
      <section className="container py-24 lg:py-32">
        <SectionHeader
          eyebrow="What we treat"
          title="A short list of what brings people in."
          description="If it's urgent but not life-threatening, we can probably help. When in doubt, walk in or call ahead: our team will guide you."
        />
        <div className="mt-12 flex flex-wrap gap-2">
          {CONDITIONS.map((c) => (
            <span key={c} className="px-4 py-2 rounded-full surface-lowest text-sm hover:bg-surface-base transition-colors cursor-default">
              {c}
            </span>
          ))}
        </div>
      </section>

      {/* INSURANCE ACCEPTED */}
      <section className="surface-low">
        <div className="container py-20 lg:py-24">
          <SectionHeader
            eyebrow="Insurance"
            title={<>Most major plans accepted.</>}
            description="If you don't see your plan, call us — we'll verify your coverage in minutes. Self-pay rates posted on every visit."
          />
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              "Blue Cross Blue Shield",
              "Aetna",
              "UnitedHealthcare",
              "Cigna",
              "Humana",
              "Medicare",
              "Medicaid (SoonerCare)",
              "Tricare",
              "Healthchoice",
              "Community Care",
              "GEHA",
              "Self-pay",
            ].map((p) => (
              <div key={p} className="surface-lowest rounded-lg px-4 py-4 text-center text-sm font-medium">
                {p}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container py-24 lg:py-32">
        <SectionHeader
          eyebrow="FAQ"
          title="Common questions, answered."
          description="The basics you'd want to know before walking in."
        />
        <div className="mt-12 grid lg:grid-cols-2 gap-3">
          {[
            { q: "Do I need an appointment?", a: "No. Walk in any day 7am–8pm. Reserving online is faster — most online bookings are confirmed by text within minutes." },
            { q: "What insurance do you accept?", a: "Most major commercial plans, Medicare, Medicaid (SoonerCare), Tricare, and self-pay. Call to verify your specific plan." },
            { q: "Are you open on holidays?", a: "Yes. Open every single day, 7am–8pm — including holidays." },
            { q: "How fast is the wait?", a: "Average door-to-doctor is around 15 minutes. Live wait times shown on the homepage." },
            { q: "Do you treat children?", a: "Yes. We see kids 6 months and up in a pediatric-friendly setting." },
            { q: "Can I get an X-ray same visit?", a: "Yes. We have on-site digital X-ray and ultrasound, read by our providers in real time." },
          ].map((f) => (
            <details key={f.q} className="group surface-lowest rounded-xl p-6">
              <summary className="cursor-pointer list-none flex items-center justify-between gap-4 font-medium">
                {f.q}
                <span className="text-primary group-open:rotate-45 transition-transform text-xl">+</span>
              </summary>
              <p className="mt-3 text-on-surface-variant text-sm leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                { q: "Do I need an appointment?", a: "No. Walk in any day 7am–8pm. Reserving online is faster — most online bookings are confirmed by text within minutes." },
                { q: "What insurance do you accept?", a: "Most major commercial plans, Medicare, Medicaid (SoonerCare), Tricare, and self-pay. Call to verify your specific plan." },
                { q: "Are you open on holidays?", a: "Yes. Open every single day, 7am–8pm — including holidays." },
                { q: "How fast is the wait?", a: "Average door-to-doctor is around 15 minutes. Live wait times shown on the homepage." },
                { q: "Do you treat children?", a: "Yes. We see kids 6 months and up in a pediatric-friendly setting." },
                { q: "Can I get an X-ray same visit?", a: "Yes. We have on-site digital X-ray and ultrasound, read by our providers in real time." },
              ].map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            }),
          }}
        />
      </section>

      {/* TESTIMONIALS CAROUSEL */}
      <section className="surface-low">
        <div className="container py-24 lg:py-32">
          <SectionHeader eyebrow="What patients say" title="Care that earns the words." />

          <div
            className="mt-16 relative"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            {/* Slides */}
            <div className="overflow-hidden rounded-xl">
              <div
                className="flex transition-transform duration-500 ease-editorial"
                style={{ transform: `translateX(-${active * 100}%)` }}
              >
                {REVIEWS.map((r, i) => (
                  <figure
                    key={i}
                    className="min-w-full surface-lowest p-10 lg:p-16 flex flex-col gap-8"
                    aria-hidden={i !== active}
                  >
                    <div className="flex gap-0.5 text-primary">
                      {Array.from({ length: r.stars }).map((_, j) => (
                        <Star key={j} className="size-5 fill-current" />
                      ))}
                    </div>
                    <blockquote className="text-on-surface text-xl lg:text-2xl font-display leading-relaxed max-w-3xl">
                      "{r.quote}"
                    </blockquote>
                    <figcaption className="flex items-center gap-3">
                      <span className="font-medium">{r.author}</span>
                      <span className="text-on-surface-muted text-sm">·</span>
                      <span className="text-on-surface-muted text-sm">{r.date}</span>
                      <span className="text-on-surface-muted text-sm">·</span>
                      <span className="text-on-surface-muted text-sm">Google Review</span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>

            {/* Controls row */}
            <div className="mt-8 flex items-center justify-between gap-6">
              {/* Dot / progress indicators */}
              <div className="flex items-center gap-2">
                {REVIEWS.map((_, i) => (
                  <button
                    key={i}
                    aria-label={`Go to review ${i + 1}`}
                    onClick={() => { setActive(i); setPaused(false); }}
                    className="relative h-1.5 rounded-full overflow-hidden transition-all duration-300 bg-primary/20"
                    style={{ width: i === active ? "2.5rem" : "0.5rem" }}
                  >
                    {i === active && (
                      <span
                        key={active}
                        className="absolute inset-0 bg-primary origin-left animate-progress-fill rounded-full"
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Prev / Next */}
              <div className="flex gap-2">
                <button
                  aria-label="Previous review"
                  onClick={() => { advance(-1); setPaused(false); }}
                  className="size-10 rounded-full surface-lowest border border-outline-variant/20 grid place-items-center text-on-surface-variant hover:text-primary hover:border-primary transition-colors"
                >
                  <ChevronLeft className="size-5" />
                </button>
                <button
                  aria-label="Next review"
                  onClick={() => { advance(1); setPaused(false); }}
                  className="size-10 rounded-full surface-lowest border border-outline-variant/20 grid place-items-center text-on-surface-variant hover:text-primary hover:border-primary transition-colors"
                >
                  <ChevronRight className="size-5" />
                </button>
              </div>
            </div>
          </div>

          <p className="mt-6 text-xs text-on-surface-muted">
            4.9 ★ across 1,600+ patient reviews on Google, Solv, and BirdEye
          </p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="container py-24 lg:py-32">
        <div className="rounded-xl gradient-primary text-primary-foreground p-12 lg:p-20 grid lg:grid-cols-12 gap-10 items-center lift-ambient overflow-hidden relative">
          <div className="absolute inset-0 opacity-30 mix-blend-overlay bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.4),transparent_60%)]" />
          <div className="lg:col-span-8 relative">
            <div className="label-eyebrow text-primary-foreground/70">Ready when you are</div>
            <h2 className="mt-4 text-display-xl font-display">Skip the waiting room.<br />Reserve your spot.</h2>
            <p className="mt-6 text-primary-foreground/80 text-lg max-w-xl">
              Tell us what's going on, choose a time, and walk into a clinic that's already prepared for you.
            </p>
          </div>
          <div className="lg:col-span-4 relative flex lg:justify-end">
            <Button asChild variant="glass" size="xl">
              <Link href="/book">Book a visit <ArrowUpRight className="size-4" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
