import { CLINICS, type Clinic } from "./clinics";

export type SeoLanding = {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intent: "urgent-care" | "walk-in" | "service";
  /** Optional service slug (in SERVICE_PAGES) the landing is funneling to. */
  serviceFocus?: string;
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
  // --- DOT physicals ---
  {
    slug: "dot-physical-moore-ok",
    metaTitle: "DOT Physical in Moore, OK — Same-Day Certified Exam",
    metaDescription:
      "DOT physical in Moore at Quick Urgent Care. Certified medical examiner on staff, walk in any day 7am–8pm. Most exams complete in 30 minutes.",
    h1: "DOT physicals in Moore, OK.",
    intent: "service",
    serviceFocus: "physicals",
    clinic: moore,
    longCopy: [
      "Need a DOT physical fast? Our Moore clinic has a certified medical examiner on staff, so you can walk in any day from 7am to 8pm and leave with your completed exam and Medical Examiner's Certificate the same day.",
      "Bring your driver's license, list of medications, and any specialty paperwork (sleep apnea CPAP compliance, vision restrictions, etc.). Most exams wrap up in 30 minutes.",
      "We also handle pre-employment, return-to-duty, and follow-up DOT exams. Self-pay rates posted at the front desk, no surprise facility fees.",
    ],
  },
  {
    slug: "dot-physical-oklahoma-city-ok",
    metaTitle: "DOT Physical in Oklahoma City — Same-Day Certified Exam",
    metaDescription:
      "DOT physicals in Oklahoma City at 1421 NW 122nd St. Certified medical examiner. Walk in 7am–8pm daily. Same-day Medical Examiner's Certificate.",
    h1: "DOT physicals in Oklahoma City.",
    intent: "service",
    serviceFocus: "physicals",
    clinic: okc,
    longCopy: [
      "Our OKC walk-in clinic on NW 122nd has a certified DOT medical examiner. Drivers walk in any day, no appointment required, and most leave with a signed Medical Examiner's Certificate within 30 minutes.",
      "Bring your CDL, list of medications, glasses or hearing aids, and any specialty paperwork (CPAP compliance reports, vision waivers).",
      "Pre-employment, post-incident, return-to-duty, and follow-up exams all available. Corporate accounts welcome.",
    ],
  },
  // --- Sports physicals ---
  {
    slug: "sports-physical-oklahoma-city-ok",
    metaTitle: "Sports & School Physicals in Oklahoma City — Walk-In",
    metaDescription:
      "Sports and school physicals in Oklahoma City at Quick Urgent Care. Form completed at the visit. Walk in any day 7am–8pm.",
    h1: "Sports & school physicals in Oklahoma City.",
    intent: "service",
    serviceFocus: "physicals",
    clinic: okc,
    longCopy: [
      "We see kids and teens for school, sports, and camp physicals every day of the year, including weekends and holidays. Bring the form, walk in, and we'll handle the rest — most visits wrap up in under 30 minutes.",
      "Combine the physical with vaccines, lab work, or a pediatric sick-visit in the same trip. We see children 3 months and up.",
      "Self-pay rates are competitive and posted at the front desk. Many sports physicals are billed to insurance as preventive care.",
    ],
  },
  // --- Flu shots ---
  {
    slug: "flu-shot-oklahoma-city-ok",
    metaTitle: "Walk-In Flu Shot in Oklahoma City — No Appointment",
    metaDescription:
      "Walk-in flu shots in Oklahoma City at Quick Urgent Care. Seasonal flu vaccine for adults and children 3 months and up. Open daily 7am–8pm.",
    h1: "Walk-in flu shots in Oklahoma City.",
    intent: "service",
    serviceFocus: "vaccinations",
    clinic: okc,
    longCopy: [
      "Seasonal flu vaccine is available at our Oklahoma City clinic, August through April, with no appointment needed. Walk in any day, 7am to 8pm.",
      "We also offer Tdap, DTaP, and travel-related vaccines for adults and children 3 months and up. Bring your immunization record and a photo ID.",
      "Family visits are welcome — get the whole household up to date in a single trip. Most major insurance plans cover the flu vaccine at no out-of-pocket cost.",
    ],
  },
  // --- STD testing ---
  {
    slug: "std-testing-oklahoma-city-ok",
    metaTitle: "Confidential STD Testing in Oklahoma City — Walk-In",
    metaDescription:
      "Discreet, judgment-free STD testing in Oklahoma City at Quick Urgent Care. Walk in any day 7am–8pm. Results 24–72 hours.",
    h1: "Confidential STD testing in Oklahoma City.",
    intent: "service",
    serviceFocus: "lab-testing",
    clinic: okc,
    longCopy: [
      "Our Oklahoma City clinic offers confidential STD panels in a discreet, judgment-free setting. You can walk in any day from 7am to 8pm — no appointment, no referral required.",
      "Panels include HIV, syphilis, gonorrhea, chlamydia, hepatitis B/C, and herpes. Results return in 24–72 hours and are reviewed privately by phone.",
      "Self-pay rates are posted, and most commercial insurance covers medically necessary testing. We do not share results with anyone outside the clinic without your written consent.",
    ],
  },
  // --- X-ray ---
  {
    slug: "x-ray-near-me-oklahoma-city",
    metaTitle: "Walk-In X-Ray Near You in Oklahoma City — Same-Visit Read",
    metaDescription:
      "Walk-in digital X-ray near Oklahoma City. Images read on-site in minutes by board-certified providers. Open daily 7am–8pm.",
    h1: "Walk-in X-ray in Oklahoma City.",
    intent: "service",
    serviceFocus: "x-ray",
    clinic: okc,
    longCopy: [
      "Need an X-ray near you in OKC? Our walk-in clinic on NW 122nd has on-site digital X-ray equipment, read in real time by board-certified providers — no second appointment, no overnight wait.",
      "We image fractures, sprains, foreign bodies, pneumonia, and more. Most patients walk out with a diagnosis, a treatment plan, and a CD copy of their images the same visit.",
      "Pediatric-friendly imaging room with trained staff for children 3 months and up. Self-pay rates posted at the front desk.",
    ],
  },
  // --- Pediatric ---
  {
    slug: "pediatric-urgent-care-moore-ok",
    metaTitle: "Pediatric Urgent Care in Moore, OK — Kids 3 Months & Up",
    metaDescription:
      "Gentle pediatric urgent care in Moore, OK. We see kids 3 months and up for illness, injury, physicals, and vaccines. Walk in 7am–8pm daily.",
    h1: "Pediatric urgent care in Moore, OK.",
    intent: "service",
    serviceFocus: "pediatric",
    clinic: moore,
    longCopy: [
      "Sick kids can't wait for a pediatrician's appointment. Our Moore clinic sees children 3 months and up every single day, including weekends and holidays.",
      "We handle ear infections, strep, fevers, rashes, asthma flare-ups, minor injuries, and more. Same-visit digital X-ray and rapid lab testing mean diagnoses happen during your visit, not days later.",
      "Family-friendly environment with no pediatric surcharge — the same transparent pricing applies whether you're 6 months old or 60.",
    ],
  },
  {
    slug: "pediatric-urgent-care-oklahoma-city-ok",
    metaTitle: "Pediatric Urgent Care in Oklahoma City — Walk-In for Kids",
    metaDescription:
      "Walk-in pediatric urgent care in Oklahoma City. Kids 3 months and up. Same-day care 7am–8pm including holidays.",
    h1: "Pediatric urgent care in Oklahoma City.",
    intent: "service",
    serviceFocus: "pediatric",
    clinic: okc,
    longCopy: [
      "Our OKC clinic at 1421 NW 122nd St sees children 3 months and up for illness, injury, school and sports physicals, and vaccines. No appointment needed, open every day 7am to 8pm.",
      "Pediatric-friendly imaging room, calm exam rooms, and staff trained in family-first care. Most visits wrap up in 30–45 minutes.",
      "We treat asthma flare-ups, ear infections, strep, rashes, dehydration, and minor injuries. Refer to ER for severe difficulty breathing, seizures, or loss of consciousness.",
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
