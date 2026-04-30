import { CLINICS, type Clinic } from "./clinics";

export type SeoLanding = {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intent: "urgent-care" | "walk-in";
  clinic: Clinic;
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
    slug: "walk-in-clinic-oklahoma-city-ok",
    metaTitle: "Walk-In Clinic in Oklahoma City — No Appointment Needed",
    metaDescription:
      "Walk-in clinic in Oklahoma City at 1421 NW 122nd St. Open daily 7am–8pm including holidays. Most major insurance accepted.",
    h1: "Walk-in clinic in Oklahoma City, OK.",
    intent: "walk-in",
    clinic: okc,
  },
];
