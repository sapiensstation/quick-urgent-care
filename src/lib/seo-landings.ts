import { CLINICS, type Clinic } from "./clinics";

export type SeoLanding = {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intent: "urgent-care" | "walk-in";
  clinic: Clinic;
  neighborhoods?: string[];
  longCopy?: string[];
};

const moore = CLINICS.find((c) => c.id === "moore")!;
const okc = CLINICS.find((c) => c.id === "okc")!;

export const SEO_LANDINGS: SeoLanding[] = [
  {
    slug: "urgent-care-moore-ok",
    metaTitle: "Urgent Care in Moore, OK — Quick Urgent Care",
    metaDescription:
      "Urgent care in Moore, OK at 2212 N Broadway Ave. Walk in 7am–8pm daily. Board-certified providers, on-site X-ray, transparent pricing.",
    h1: "Urgent care in Moore, OK.",
    intent: "urgent-care",
    clinic: moore,
  },
  {
    slug: "urgent-care-oklahoma-city-ok",
    metaTitle: "Urgent Care in Oklahoma City, OK — Quick Urgent Care",
    metaDescription:
      "Urgent care in Oklahoma City at 1421 NW 122nd St. Walk in 7am–8pm daily. Board-certified providers, on-site imaging, all major insurance.",
    h1: "Urgent care in Oklahoma City, OK.",
    intent: "urgent-care",
    clinic: okc,
    neighborhoods: [
      "The Village",
      "Nichols Hills",
      "Edmond",
      "Quail Creek",
      "Britton",
      "Lake Hefner",
      "NW 122nd corridor",
      "Memorial Road",
    ],
    longCopy: [
      "Our Oklahoma City clinic sits just off NW 122nd St, minutes from The Village, Nichols Hills, Edmond, and the Memorial Road retail corridor. We see walk-in patients of every age — from 3 months and up — seven days a week, including holidays.",
      "Same-day on-site digital X-ray and lab testing mean most diagnoses happen during your visit, not days later. Board-certified providers handle minor injuries, infections, occupational health, school and DOT physicals, and confidential STD testing under one roof.",
      "If you're searching for urgent care near OKC, Edmond, or the Quail Creek and Lake Hefner neighborhoods, we're typically faster and far cheaper than a hospital ER for non-life-threatening visits.",
    ],
  },
  {
    slug: "walk-in-clinic-moore-ok",
    metaTitle: "Walk-In Clinic in Moore, OK — No Appointment Needed",
    metaDescription:
      "Walk-in clinic in Moore, OK at 2212 N Broadway Ave. Open daily 7am–8pm including holidays. No appointment required.",
    h1: "Walk-in clinic in Moore, OK.",
    intent: "walk-in",
    clinic: moore,
  },
  {
    slug: "physician-near-you-oklahoma-city",
    metaTitle: "Physician Near You in Oklahoma City — Quick Urgent Care",
    metaDescription:
      "Board-certified physicians and providers near Oklahoma City. Walk in for same-day care, on-site X-ray and labs, and physicals — open daily 7am–8pm.",
    h1: "Find a physician near you in Oklahoma City.",
    intent: "urgent-care",
    clinic: okc,
    neighborhoods: [
      "The Village",
      "Nichols Hills",
      "Edmond",
      "Quail Creek",
      "Memorial Road",
      "Lake Hefner",
    ],
    longCopy: [
      "Looking for a physician near you in Oklahoma City? Our walk-in clinic at 1421 NW 122nd St is staffed by board-certified providers who handle acute illness, minor injuries, occupational health, school and DOT physicals, vaccinations, and confidential lab testing — all under one roof.",
      "We're a real alternative to waiting weeks for a primary-care appointment. Walk in any day from 7am to 8pm, including holidays, and most patients are seen and on their way in under an hour.",
      "Our team specializes in evaluating broken bones, pneumonia, respiratory illness, allergic reactions, flu, simple fractures, lacerations, UTIs, and more — supported by same-visit digital X-ray and on-site rapid lab testing.",
    ],
  },
  {
    slug: "walk-in-clinic-oklahoma-city-ok",
    metaTitle: "Walk-In Clinic in Oklahoma City — No Appointment Needed",
    metaDescription:
      "Walk-in clinic in Oklahoma City at 1421 NW 122nd St. Open daily 7am–8pm including holidays. Most major insurance accepted.",
    h1: "Walk-in clinic in Oklahoma City, OK.",
    intent: "walk-in",
    clinic: okc,
    neighborhoods: [
      "The Village",
      "Nichols Hills",
      "Edmond",
      "Quail Creek",
      "Britton",
      "Lake Hefner",
      "NW 122nd corridor",
      "Memorial Road",
    ],
    longCopy: [
      "No appointment needed at our Oklahoma City walk-in clinic on NW 122nd St. We're open every day of the year, 7am to 8pm, including holidays — when most primary care offices and pediatricians are closed.",
      "Walk in for cold and flu, strep, sinus and ear infections, sprains and fractures, lacerations, asthma flare-ups, UTIs, and rashes. On-site digital X-ray, EKG, and rapid lab testing keep visits short — most patients are in and out in under 45 minutes.",
      "We accept Blue Cross Blue Shield, Aetna, UnitedHealthcare, Cigna, Humana, Medicare, SoonerCare, Tricare, and many local plans. Self-pay rates are posted, with no surprise facility fees.",
    ],
  },
];
