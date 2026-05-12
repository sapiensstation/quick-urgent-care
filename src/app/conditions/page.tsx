import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Eyebrow } from "@/components/Editorial";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { SITE_URL } from "@/lib/clinics";

export const metadata: Metadata = {
  title: "Conditions We Treat — A to Z",
  description:
    "A complete A–Z list of conditions Quick Urgent Care treats in Moore and Oklahoma City. Walk in any day 7am–8pm — no appointment needed.",
  alternates: { canonical: "/conditions" },
  openGraph: {
    title: "Conditions We Treat — Quick Urgent Care",
    description: "Conditions treated at our Moore and OKC walk-in clinics, A to Z.",
    url: `${SITE_URL}/conditions`,
  },
};

const CONDITIONS: { letter: string; items: string[] }[] = [
  { letter: "A", items: ["Abscesses", "Allergic reactions", "Asthma flare-ups", "Athlete's foot"] },
  { letter: "B", items: ["Back pain (acute)", "Bronchitis", "Burns (minor)", "Bug bites"] },
  { letter: "C", items: ["Cold & cough", "Cuts & lacerations", "Conjunctivitis (pink eye)", "COVID-19"] },
  { letter: "D", items: ["Dehydration", "Diarrhea", "Dizziness"] },
  { letter: "E", items: ["Ear infections", "Eye irritation"] },
  { letter: "F", items: ["Fever", "Flu (influenza)", "Foreign body removal", "Fractures (simple)"] },
  { letter: "H", items: ["Hand, foot & mouth", "Headaches", "Hives"] },
  { letter: "I", items: ["Insect bites & stings", "Ingrown nails"] },
  { letter: "L", items: ["Lacerations", "Lice"] },
  { letter: "M", items: ["Migraines", "Mononucleosis (mono)"] },
  { letter: "N", items: ["Nausea & vomiting", "Nosebleeds"] },
  { letter: "P", items: ["Pink eye", "Pneumonia", "Poison ivy / oak"] },
  { letter: "R", items: ["Rashes", "RSV", "Respiratory infections"] },
  { letter: "S", items: ["Sinus infections", "Skin infections", "Sore throat", "Sprains & strains", "Strep throat", "STD testing", "Stitches & suture removal"] },
  { letter: "T", items: ["Tetanus boosters", "Tonsillitis"] },
  { letter: "U", items: ["Upper respiratory infections", "UTIs"] },
  { letter: "V", items: ["Vaccinations (flu, Tdap, DTaP)", "Vertigo"] },
  { letter: "W", items: ["Wart removal", "Wheezing", "Wound care"] },
  { letter: "X", items: ["X-ray imaging (on-site)"] },
];

export default function Conditions() {
  return (
    <Layout>
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Conditions we treat" }]} />

      <section className="container pt-12 lg:pt-16 pb-12 grid lg:grid-cols-12 gap-10 items-end">
        <div className="lg:col-span-8">
          <Eyebrow tone="primary">Conditions</Eyebrow>
          <h1 className="mt-5 text-display-xl font-display">
            A to Z, walk-in<br />conditions we treat.
          </h1>
        </div>
        <p className="lg:col-span-4 text-on-surface-variant text-lg leading-relaxed">
          A non-exhaustive list. If your concern isn&apos;t here and isn&apos;t life-threatening, call us — we&apos;ll tell you whether to come in or head to the ER.
        </p>
      </section>

      <section className="container py-8">
        <nav aria-label="Jump to letter" className="flex flex-wrap gap-2">
          {CONDITIONS.map((g) => (
            <a
              key={g.letter}
              href={`#letter-${g.letter}`}
              className="size-9 rounded-full surface-lowest border border-outline-variant/15 grid place-items-center text-sm font-medium hover:text-primary hover:border-primary transition-colors"
            >
              {g.letter}
            </a>
          ))}
        </nav>
      </section>

      <section className="container pb-16 space-y-10">
        {CONDITIONS.map((g) => (
          <div key={g.letter} id={`letter-${g.letter}`} className="scroll-mt-24 grid lg:grid-cols-12 gap-6 border-t border-outline-variant/15 pt-8">
            <div className="lg:col-span-2">
              <div className="font-display text-display-lg font-semibold text-primary/40">{g.letter}</div>
            </div>
            <div className="lg:col-span-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {g.items.map((c) => (
                <div key={c} className="surface-lowest rounded-lg px-4 py-3 text-sm">
                  {c}
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="container py-16">
        <div className="surface-lowest rounded-xl p-6 lg:p-8 border-l-4 border-destructive/60 flex items-start gap-4">
          <div className="size-9 rounded-full bg-destructive/10 grid place-items-center text-destructive shrink-0">
            <span className="font-bold text-base">!</span>
          </div>
          <div>
            <div className="font-medium">For life-threatening emergencies, call 911 or go to the nearest ER.</div>
            <p className="mt-1 text-sm text-on-surface-variant leading-relaxed">
              Chest pain, severe difficulty breathing, stroke symptoms, heavy bleeding, head injury with loss of consciousness, or severe allergic reactions should always be evaluated at an emergency room.
            </p>
          </div>
        </div>
      </section>

      <section className="container py-16">
        <div className="rounded-xl gradient-primary text-primary-foreground p-12 lg:p-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-display-md">Walk in any day, 7am–8pm.</h2>
            <p className="mt-3 text-primary-foreground/80 max-w-xl">
              Same-day care in Moore and Oklahoma City, including weekends and holidays.
            </p>
          </div>
          <Button asChild variant="glass" size="xl">
            <Link href="/book">Book a visit <ArrowUpRight className="size-4" /></Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
