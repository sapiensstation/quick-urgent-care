export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  readMinutes: number;
  category: string;
  /** Optional secondary tags surfaced from WP categories/tags. */
  tags?: string[];
  /** Author display name for byline + JSON-LD. */
  author?: string;
  /** Hero / share image, served from /public. */
  image?: string;
  excerpt: string;
  body: string;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "drug-testing-near-me",
    title: "Onsite Drug Testing Near Me: Saving Time, Money, and Resources",
    date: "2024-09-15",
    readMinutes: 5,
    category: "Occupational Health",
    excerpt:
      "Workplace drug testing doesn't have to mean lost hours. On-site testing at Quick Urgent Care puts results and compliance in one convenient visit.",
    body: `
## Why Onsite Drug Testing Matters

For Oklahoma employers, drug testing is a critical part of maintaining a safe and productive workplace. Pre-employment screens, random testing programs, and post-accident panels all require fast, accurate results — and the last thing anyone needs is a process that wastes time or adds friction.

That's where onsite drug testing at Quick Urgent Care changes the equation.

## What We Offer

At our Moore and Oklahoma City locations, we provide:

- **5-panel and 10-panel urine screens** — standard for most employer programs
- **Oral fluid (saliva) testing** — for situations where observed collection is needed
- **DOT-compliant testing** — with a certified medical examiner on staff
- **Post-accident and reasonable suspicion panels** — same-day results when you need them most
- **Random testing programs** — standing orders for local employers

## How Fast Are Results?

Negative results on standard urine screens are typically available **same-day**. Confirmation testing for non-negative results goes to our lab partner and returns in **24–72 hours**.

## Setting Up a Corporate Account

If your business runs ongoing drug screening, we can set up a standing order and direct billing to eliminate per-visit paperwork. Call **405-285-7222** (Moore) or **405-286-2888** (OKC) to get started.

## Walk In — No Appointment Needed

For most testing types, employees can walk in any day 7am–8pm at either location. Bring your chain-of-custody form or employer authorization, and we handle the rest.

Drug testing done right doesn't have to be complicated. Quick Urgent Care is here to keep your workforce healthy, compliant, and productive.
    `.trim(),
  },
  {
    slug: "sore-throat-ear-pain",
    title: "Sore Throat and Ear Pain Relief: Walk-In Urgent Care",
    date: "2024-10-08",
    readMinutes: 4,
    category: "Illness & Injury",
    excerpt:
      "Strep throat and ear infections are two of the most common reasons patients visit urgent care. Here's what to expect at Quick Urgent Care.",
    body: `
## When a Sore Throat Needs More Than Rest

A scratchy throat that won't quit, painful swallowing, fever — these symptoms could be a sign of strep throat, and strep doesn't get better on its own. Without antibiotics, strep can spread and, in rare cases, lead to complications like rheumatic fever.

At Quick Urgent Care, we can test for strep **in about 10 minutes** with an on-site rapid antigen test. No waiting days for lab results.

## Ear Infections: Don't Wait It Out

Ear infections — especially in children — often escalate fast. Pain, pressure, muffled hearing, and irritability are all signs that bacteria may have taken hold in the middle ear. Our providers evaluate and treat ear infections on the same visit, including prescribing antibiotics when appropriate.

## What Happens During Your Visit

1. **Check in** — walk in or reserve online to minimize your wait
2. **Evaluation** — our provider examines your throat, ears, and lymph nodes
3. **Rapid testing** — strep results in ~10 minutes; flu and COVID tests if needed
4. **Treatment plan** — prescription sent to your pharmacy, return-to-work note if needed

## We Treat Adults and Kids

Both our Moore and Oklahoma City clinics see patients of all ages, including children. Family visits are welcome — bring everyone who needs to be seen.

## When to Go to the ER Instead

If you or your child has **difficulty breathing**, **severe swelling in the throat**, **high fever above 104°F** that won't come down, or **signs of severe dehydration**, go to the nearest emergency room.

For everything else, Quick Urgent Care has you covered. Walk in any day 7am–8pm.
    `.trim(),
  },
  {
    slug: "std-testing-urgent-care",
    title: "Urgent Care STD Testing: What Patients Should Know",
    date: "2024-11-12",
    readMinutes: 5,
    category: "Lab Testing",
    excerpt:
      "Confidential STD testing at an urgent care clinic is more accessible than most people realize. Here's what you need to know before you come in.",
    body: `
## Getting Tested Is Easier Than You Think

Sexually transmitted infections are common, and many people who have them don't know it. Regular testing is one of the most responsible things you can do for yourself and your partners — but the idea of making a dedicated appointment at a clinic can feel like a barrier.

At Quick Urgent Care, confidential STD testing is available **walk-in, any day, 7am–8pm**.

## What We Test For

Our lab panels can include testing for:

- **Chlamydia and gonorrhea** (urine or swab)
- **Syphilis** (blood draw)
- **HIV** (blood draw)
- **Herpes** (swab of active lesions)
- **Hepatitis B and C** (blood draw)
- **Trichomoniasis** (urine or swab)

Depending on your history and symptoms, our provider will recommend the appropriate panel.

## Confidentiality

Your results are private. We do not release results to unauthorized parties. In Oklahoma, minors can consent to STD testing without parental notification in most circumstances.

## How Long Do Results Take?

Rapid in-clinic tests (where available) can return in **30–60 minutes**. Most panels require a blood or urine sample sent to our lab partner, with results returning by phone in **24–72 hours**.

## Do I Need to Fast?

No fasting is required for most STD panels. Come in as you are.

## What If I Test Positive?

Our providers will walk you through your results, explain treatment options, and — for conditions like chlamydia, gonorrhea, and syphilis — prescribe treatment the same day in most cases.

Getting tested is an act of care for yourself and others. Quick Urgent Care offers a judgment-free environment to make that step as easy as possible.
    `.trim(),
  },
  {
    slug: "walk-in-immunization-clinics",
    title: "Why Walk-In Immunization Clinics Are Convenient for Families",
    date: "2025-01-20",
    readMinutes: 4,
    category: "Preventive Care",
    excerpt:
      "Skipping the appointment and walking in for vaccines is easier than most families realize. Here's why walk-in immunization clinics work.",
    body: `
## The Appointment Bottleneck

Getting vaccinated used to mean calling your primary care doctor, waiting days for an opening, and taking time off work or school to make it. For families with kids, that means coordinating multiple schedules for what should be a quick, routine visit.

Walk-in immunization clinics change that. At Quick Urgent Care, you can come in for vaccines any day from **7am to 8pm** — no appointment necessary.

## Who Can Get Vaccinated at Quick Urgent Care?

We vaccinate adults and children, including:

- **Adults** — flu vaccine, Tdap (tetanus, diphtheria, pertussis), travel vaccines when available
- **Children 3 months and up** — flu vaccine, DTaP, and others based on your child's immunization schedule

Not sure if we carry the vaccine you need? Call ahead at **405-285-7222** (Moore) or **405-286-2888** (OKC) and we'll confirm.

## Combining Physicals and Immunizations

One of the most time-saving things about Quick Urgent Care: **you can do a physical and get vaccinations in the same visit**. Students who need both a sports physical and updated immunizations for school can get everything done in one trip, usually in 30 minutes or less.

## Flu Season and Beyond

Flu vaccine is available seasonally (August through April). If you come in outside of flu season, our staff can tell you what's currently available and what you might need for upcoming travel or other health requirements.

## Insurance and Self-Pay

Most commercial insurance plans cover preventive vaccines at no cost to you. Medicare Part B covers flu and pneumonia vaccines. Self-pay pricing is available — call or ask at the front desk.

Walk-in immunization is one of the simplest things you can do for your family's health. Quick Urgent Care makes it as easy as stopping by.
    `.trim(),
  },
];
