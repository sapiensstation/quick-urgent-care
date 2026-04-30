export type ServicePage = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  hero: string;
  intro: string;
  highlights: { title: string; desc: string }[];
  faqs: { q: string; a: string }[];
  price?: string;
};

export const SERVICE_PAGES: ServicePage[] = [
  {
    slug: "x-ray",
    title: "Digital X-Ray",
    metaTitle: "Digital X-Ray Imaging in Moore & OKC",
    metaDescription:
      "On-site digital X-ray at Quick Urgent Care. Read in minutes by board-certified providers. Walk in 7am–8pm daily.",
    eyebrow: "Imaging",
    hero: "Digital X-ray, read on-site in minutes.",
    intro:
      "Same-visit imaging for fractures, sprains, pneumonia, foreign bodies, and more. Our providers read your images in real time so you walk out with answers and a treatment plan.",
    highlights: [
      { title: "Read on-site", desc: "Board-certified provider reads images during your visit — no overnight wait." },
      { title: "Pediatric-friendly", desc: "Calm imaging room and trained staff for kids 6 months and up." },
      { title: "Shared with your PCP", desc: "Images forwarded to your primary care provider within 24 hours." },
    ],
    faqs: [
      { q: "Do I need an appointment for an X-ray?", a: "No. Walk in any day 7am–8pm. Reserving online is faster." },
      { q: "How much does an X-ray cost?", a: "Self-pay is $75 per region. Most major insurance accepted." },
      { q: "Will I get my results today?", a: "Yes. Our providers read on-site and review findings with you during the visit." },
    ],
    price: "$75 per region",
  },
  {
    slug: "vaccinations",
    title: "Vaccinations",
    metaTitle: "Walk-In Vaccinations & Flu Shots — Moore & OKC",
    metaDescription:
      "Walk-in flu shots, COVID-19, tetanus, travel, and school vaccines for adults and kids 6 months and up. Open daily 7am–8pm.",
    eyebrow: "Preventive",
    hero: "Vaccinations, no appointment needed.",
    intro:
      "Routine and travel vaccines for the whole family. Bring your immunization record if available — we will update it and forward to your PCP.",
    highlights: [
      { title: "Adult & pediatric", desc: "Children 6 months and up. Family appointments welcome." },
      { title: "Walk-in friendly", desc: "Most visits done in under 30 minutes." },
      { title: "Travel & school", desc: "Tdap, MMR, hepatitis, typhoid, yellow fever (when available)." },
    ],
    faqs: [
      { q: "Do you take insurance for vaccines?", a: "Yes — most major commercial plans, Medicare, and self-pay." },
      { q: "Can my child get school physicals and shots in one visit?", a: "Yes — we combine physicals and immunizations to save you a trip." },
      { q: "Do you offer flu shots year-round?", a: "Seasonal flu vaccine available August through April. Year-round COVID-19 boosters per CDC guidance." },
    ],
  },
  {
    slug: "drug-testing",
    title: "Drug Testing",
    metaTitle: "On-Site Drug Testing — Employer & Pre-Employment",
    metaDescription:
      "Confidential workplace drug testing in Moore and Oklahoma City. 5- and 10-panel screens, DOT, pre-employment, random.",
    eyebrow: "Occupational",
    hero: "Drug testing, on-site and same-day.",
    intro:
      "Employer programs, pre-employment, post-accident, random screening, and DOT-compliant testing. Walk in or schedule a corporate account.",
    highlights: [
      { title: "5 / 10 panel screens", desc: "Standard and expanded panels available, urine and oral fluid." },
      { title: "DOT compliant", desc: "Certified medical examiner on staff for DOT pre-employment and random." },
      { title: "Corporate accounts", desc: "Volume billing and standing orders for local employers." },
    ],
    faqs: [
      { q: "How fast are results?", a: "Negative results often same-day. Confirmation testing 24–72 hours via lab partner." },
      { q: "Do I need an appointment?", a: "Walk in any day. Employers with standing orders can schedule batches." },
      { q: "Is this confidential?", a: "Yes. Results released only to authorized parties named in your employer's chain-of-custody form." },
    ],
  },
  {
    slug: "physicals",
    title: "Physicals",
    metaTitle: "Sports, School & DOT Physicals — Moore & OKC",
    metaDescription:
      "Same-day sports, school, DOT, and pre-employment physicals. Forms completed at visit. Open daily 7am–8pm.",
    eyebrow: "Preventive",
    hero: "Physicals, completed at your visit.",
    intro:
      "Quick, affordable physicals for school, sports, work, and DOT certification. Most visits wrap up in 20–30 minutes including paperwork.",
    highlights: [
      { title: "Sports / school — $45", desc: "Form filled out and signed during the visit." },
      { title: "DOT — $85", desc: "Certified medical examiner. Same-day completion." },
      { title: "Pre-employment", desc: "Customizable to employer requirements." },
    ],
    faqs: [
      { q: "Do you take insurance for physicals?", a: "Most physicals are self-pay; some employer programs are billed directly." },
      { q: "Can you fax my form to the school?", a: "Yes — bring the form with the recipient fax number, we will send it." },
      { q: "Do I need to fast?", a: "No fasting required for sports, school, or DOT physicals." },
    ],
    price: "From $45",
  },
  {
    slug: "occupational-medicine",
    title: "Occupational Medicine",
    metaTitle: "Occupational Medicine & Workers' Comp — Moore & OKC",
    metaDescription:
      "Workers' compensation, injury care, return-to-work evaluations, and employer health programs in Moore and Oklahoma City.",
    eyebrow: "Occupational",
    hero: "Occupational medicine for Oklahoma employers.",
    intro:
      "We partner with local businesses for workers' comp, injury care, return-to-work evaluations, OSHA respiratory clearances, and ongoing employee health programs.",
    highlights: [
      { title: "Workers' comp", desc: "Same-day evaluation, treatment, and reporting back to the employer." },
      { title: "Return-to-work", desc: "Functional capacity evaluations and modified-duty letters." },
      { title: "Employer programs", desc: "Standing orders, billing accounts, on-site triage protocols." },
    ],
    faqs: [
      { q: "Do you bill our workers' comp carrier directly?", a: "Yes. Bring claim and employer info to the first visit." },
      { q: "Can we set up a corporate account?", a: "Yes — call us at 405-285-7222 to set up billing and protocols." },
      { q: "Do you handle OSHA respirator clearances?", a: "Yes. We perform the medical eval and pulmonary function testing on-site." },
    ],
  },
  {
    slug: "lab-testing",
    title: "Lab Testing",
    metaTitle: "Lab Testing & STD Panels — Moore & OKC",
    metaDescription:
      "On-site rapid testing and confidential lab work in Moore and Oklahoma City. Strep, flu, COVID-19, STD panels, blood draws.",
    eyebrow: "Diagnostic",
    hero: "Lab testing, on-site and confidential.",
    intro:
      "Rapid in-clinic tests for strep, flu, RSV, COVID-19, mono, urinalysis, and pregnancy. Confidential STD panels, basic metabolic, lipid, and CBC via lab partner.",
    highlights: [
      { title: "Rapid in-clinic", desc: "Strep ($35), flu, RSV, COVID-19 antigen — results in 10–30 minutes." },
      { title: "Lab draws", desc: "Blood draws sent to our partner lab. Results in 24–72 hours." },
      { title: "Confidential STD", desc: "Discreet, judgment-free testing with private results." },
    ],
    faqs: [
      { q: "Do I need a doctor's order?", a: "No. Most tests are available walk-in. Some specialty panels may require an evaluation." },
      { q: "Will my insurance cover it?", a: "Most major commercial plans cover medically necessary labs. Self-pay rates posted." },
      { q: "How do I get my results?", a: "In-clinic results are reviewed during your visit. Lab results posted to your portal or by phone in 1–3 days." },
    ],
  },
];
