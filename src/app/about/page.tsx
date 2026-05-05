"use client";
import { Layout } from "@/components/Layout";
import { Eyebrow } from "@/components/Editorial";
import { Button } from "@/components/ui/button";
import Link from "next/link";
const heroClinic = "/assets/IMG_1307.jpeg";

const GALLERY = [
  {
    src: "/assets/IMG_1308.jpeg",
    alt: "Clinic entrance",
    className: "md:col-span-2 md:row-span-2",
  },
  {
    src: "/assets/IMG_1309.jpeg",
    alt: "Clinic exterior",
    className: "md:col-span-2",
  },
  {
    src: "/assets/IMG_1312.jpeg",
    alt: "Exam room",
    className: "",
  },
  {
    src: "/assets/IMG_1314.jpeg",
    alt: "Clinic interior",
    className: "",
  },
  {
    src: "/assets/IMG_1316.jpeg",
    alt: "Waiting area",
    className: "md:col-span-2",
  },
  {
    src: "/assets/IMG_1320.jpeg",
    alt: "Quick Urgent Care",
    className: "md:col-span-2",
  },
  {
    src: "/assets/IMG_1321.jpeg",
    alt: "Clinic view",
    className: "",
  },
  {
    src: "/assets/IMG_1327.jpeg",
    alt: "Clinic team",
    className: "md:col-span-2",
  },
  {
    src: "/assets/IMG_1329.jpeg",
    alt: "Clinic facilities",
    className: "",
  },
  {
    src: "/assets/IMG_1344.jpeg",
    alt: "Patient care",
    className: "",
  },
];

const About = () => (
  <Layout>
    <section className="container pt-20 lg:pt-28 pb-16 grid lg:grid-cols-12 gap-10 items-end">
      <div className="lg:col-span-8">
        <Eyebrow tone="primary">About</Eyebrow>
        <h1 className="mt-5 text-display-xl font-display">Locally owned.<br />Locally operated.<br />Lowest local costs.</h1>
      </div>
      <p className="lg:col-span-4 text-on-surface-variant text-lg leading-relaxed">
        Caring and efficient urgent cares serving families in the the Oklahoma City, Moore and surrounding areas since 2017. Our board certified providers have over 25 years of experience. We are honored to take care of you and your families!
      </p>
    </section>

    <section className="container">
      <div className="overflow-hidden rounded-xl lift-soft">
        <img src={heroClinic} alt="Inside our clinic" loading="lazy" className="w-full aspect-[21/9] object-cover" />
      </div>
    </section>

    <section className="container py-24 grid lg:grid-cols-12 gap-12">
      <div className="lg:col-span-5">
        <Eyebrow>Our pride</Eyebrow>
        <h2 className="mt-4 text-display-md font-display">Top notch care for you and your family.</h2>
      </div>
      <div className="lg:col-span-7 space-y-6 text-lg text-on-surface-variant leading-relaxed">
        <p>
          When you’re hurting, every minute feels like an hour. We get it. That’s why we’ve reimagined urgent care to be as compassionate as it is quick. Expert clinicians who actually listen, in a space designed to help you breathe easier.
        </p>
        <p>
          Our providers carry over 25 years of combined emergency and family medicine experience. They are committed to top-notch care: for you, your kids, and your team at work.
        </p>
      </div>
    </section>

    <section className="surface-low">
      <div className="container py-24">
        <Eyebrow tone="primary">Gallery</Eyebrow>
        <h2 className="mt-4 text-display-lg font-display">A look inside our clinic.</h2>
        <p className="mt-5 text-on-surface-variant text-lg max-w-2xl leading-relaxed">
          Calm spaces, modern equipment, and a team that moves quickly so you don&apos;t have to wait.
        </p>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[220px] gap-3">
          {GALLERY.map((img) => (
            <figure
              key={img.src}
              className={`relative overflow-hidden rounded-2xl lift-soft hover:lift-ambient transition-all duration-500 group ${img.className}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-editorial"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <figcaption className="absolute bottom-3 left-4 text-xs text-white/90 font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {img.alt}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>

    <section className="container py-24">
      <div className="rounded-xl gradient-primary text-primary-foreground p-12 lg:p-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lift-ambient">
        <div>
          <h2 className="font-display text-display-md">Come see the difference.</h2>
          <p className="mt-3 text-primary-foreground/80 max-w-xl">Book a visit and meet the team that&apos;s quietly raising the bar in Oklahoma urgent care.</p>
        </div>
        <Button asChild variant="glass" size="xl"><Link href="/book">Book a visit</Link></Button>
      </div>
    </section>
  </Layout>
);

export default About;
