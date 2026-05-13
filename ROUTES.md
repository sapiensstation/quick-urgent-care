# Quick Urgent Care — Site Map & Routes

Single source of truth for every URL the Next.js app serves, what feeds it, and what Month-1 setup work needs it.

**Aligned with the Month 1 setup plan** (see `MONTH_1_SETUP.md` if you maintain one separately). Routes that are wired up but still need GTM tags, conversions, or env-vars set in Vercel are flagged with **⚠️ Setup**.

---

## Conventions

- **Source** column: which file generates the route.
- **Data** column: which `src/lib/*.ts` (or inline data) feeds it. Phase 4 (Sanity migration) will replace these with CMS fetches.
- **Schema.org**: JSON-LD types injected for SEO.
- **Indexed**: `yes` = in `/sitemap.xml` and crawlable; `noindex` = page exists but excluded from search.

---

## 1. Core marketing pages

| Path | Source | Data | Schema.org | Indexed |
|---|---|---|---|---|
| `/` | `src/app/page.tsx` | inline `SERVICES`, `CONDITIONS`, `REVIEWS` | `MedicalOrganization`, `WebSite`, `FAQPage` (root layout) | yes |
| `/about` | `src/app/about/page.tsx` | inline gallery | — | yes |
| `/contact` | `src/app/contact/page.tsx` | `clinics.ts` | — | yes |
| `/providers` | `src/app/providers/page.tsx` | inline `PROVIDERS` | `Physician[]` (per-provider) | yes |
| `/plan-your-visit` | `src/app/plan-your-visit/page.tsx` | inline | — | yes |
| `/insurance` | `src/app/insurance/page.tsx` | inline `COMMERCIAL`, `GOVERNMENT` | — | yes |
| `/careers` | `src/app/careers/page.tsx` | inline | — | yes |
| `/employers` | `src/app/employers/page.tsx` | inline `SERVICES`, `PROCESS` | — | yes |
| `/covid` | `src/app/covid/page.tsx` | inline | `FAQPage` | yes |
| `/reviews` | `src/app/reviews/page.tsx` | inline `REVIEWS` | `MedicalOrganization` w/ `aggregateRating` + `review[]` | yes |
| `/conditions` | `src/app/conditions/page.tsx` | inline A–Z list | — | yes |
| `/pricing` | `src/app/pricing/` | inline | — | yes |
| `/book` | `src/app/book/` | clockwise external | — | yes |
| `/thank-you` | `src/app/thank-you/page.tsx` | inline | — | **noindex** |

---

## 2. Services

Static-generated from `src/lib/service-pages.ts`. Add a new `ServicePage` entry and `/services/<slug>` builds automatically.

| Path | Slug source |
|---|---|
| `/services` | `src/app/services/page.tsx` (groups + grid of all SERVICE_PAGES) |
| `/services/x-ray` | `service-pages.ts` |
| `/services/vaccinations` | `service-pages.ts` |
| `/services/drug-testing` | `service-pages.ts` |
| `/services/physicals` | `service-pages.ts` |
| `/services/occupational-medicine` | `service-pages.ts` |
| `/services/treatments` | `service-pages.ts` |
| `/services/pediatric` | `service-pages.ts` |
| `/services/lab-testing` | `service-pages.ts` |

**Each service page injects**: `MedicalProcedure` + `FAQPage` JSON-LD, Breadcrumbs JSON-LD, related-services block, "go to ER" warning card.

---

## 3. Locations

Static-generated from `src/lib/clinics.ts`.

| Path | Clinic |
|---|---|
| `/locations` | `src/app/locations/page.tsx` (grid of all clinics) |
| `/locations/moore-ok` | `clinics.ts` → `moore` |
| `/locations/oklahoma-city-ok` | `clinics.ts` → `okc` |

**Each location page injects**: `MedicalClinic` JSON-LD (address, geo, opening hours), embedded Google Map, breadcrumb.

---

## 4. SEO landing pages

Static-generated from `src/lib/seo-landings.ts`, served at the **root path** (`/<slug>`), not nested under a folder. This matches WordPress URL slugs so 301 redirects from `next.config.mjs` work cleanly.

| Path | Intent | Funnels to |
|---|---|---|
| `/urgent-care-moore-ok` | `urgent-care` | Moore clinic |
| `/urgent-care-oklahoma-city-ok` | `urgent-care` | OKC clinic |
| `/walk-in-clinic-moore-ok` | `walk-in` | Moore clinic |
| `/walk-in-clinic-oklahoma-city-ok` | `walk-in` | OKC clinic |
| `/physician-near-you-oklahoma-city` | `urgent-care` | OKC clinic |
| `/dot-physical-moore-ok` | `service` | `services/physicals` |
| `/dot-physical-oklahoma-city-ok` | `service` | `services/physicals` |
| `/sports-physical-oklahoma-city-ok` | `service` | `services/physicals` |
| `/flu-shot-oklahoma-city-ok` | `service` | `services/vaccinations` |
| `/std-testing-oklahoma-city-ok` | `service` | `services/lab-testing` |
| `/x-ray-near-me-oklahoma-city` | `service` | `services/x-ray` |
| `/pediatric-urgent-care-moore-ok` | `service` | `services/pediatric` |
| `/pediatric-urgent-care-oklahoma-city-ok` | `service` | `services/pediatric` |

**Each landing injects**: `MedicalClinic` JSON-LD, neighborhoods chips, 3-paragraph long-copy, deep-link button to the focused service detail page.

---

## 5. Blog

Static-generated from `src/lib/blog-posts.ts`.

| Path | Title | Category |
|---|---|---|
| `/blog` | Listing | — |
| `/blog/drug-testing-near-me` | Onsite Drug Testing Near Me | Drug Testing |
| `/blog/sore-throat-ear-pain` | Sore Throat and Ear Pain Relief | Walk-In Urgent Care |
| `/blog/std-testing-urgent-care` | Urgent Care STD Testing | STD Testing |
| `/blog/walk-in-immunization-clinics` | Walk-In Immunization Clinics | Walk-In Immunization Clinic |
| `/feed.xml` | RSS feed | — |

**Each post injects**: `Article` JSON-LD (`author`, `image`, `dateModified`, `keywords`, `articleSection`, `mainEntityOfPage`, publisher logo), per-post OG `images`/`tags`/`authors`, breadcrumb, related-services block.

---

## 6. API routes

| Path | Method | Purpose | Env vars |
|---|---|---|---|
| `/api/contact` | POST | Contact form → optional webhook → redirect `/thank-you` | `CONTACT_WEBHOOK_URL` (optional) |
| `/api/careers` | POST | Careers form → optional webhook → redirect `/thank-you` | `CAREERS_WEBHOOK_URL` (optional) |
| `/api/book` | POST | Booking form → Resend email | `RESEND_API_KEY`, `BOOKING_TO_EMAIL`, `BOOKING_FROM_EMAIL` ⚠️ Setup (Phase 5) |
| `/api/create-payment-intent` | POST | Stripe payment intent | Stripe keys |
| `/api/send-receipt` | POST | Stripe receipt email | Resend + Stripe |

---

## 7. Metadata & system routes

| Path | Source | Notes |
|---|---|---|
| `/sitemap.xml` | `src/app/sitemap.ts` | Includes all pages + services + landings + locations + blog |
| `/robots.txt` | `src/app/robots.ts` | Disallow `/api/`, references sitemap |
| `/icon.png` | `src/app/icon.png` | Next-auto favicon (replaces legacy `/favicon.ico`) |
| `<head>` | `src/app/layout.tsx` | `MedicalOrganization` + `WebSite` JSON-LD, GTM, GA4, CallRail inject points |

---

## 8. Legacy WordPress redirects

Configured in `next.config.mjs` → `redirects()`. All `permanent: true` (301).

| From (WP) | To (new) |
|---|---|
| `/onsite-drug-testing-near-me` | `/blog/drug-testing-near-me` |
| `/walk-in-urgent-care` | `/blog/sore-throat-ear-pain` |
| `/urgent-care-std-testing` | `/blog/std-testing-urgent-care` |
| `/on-site-imaging`, `/on-site-imaging-old` | `/services/x-ray` |
| `/on-site-lab-testing` | `/services/lab-testing` |
| `/covid-19` | `/covid` |
| `/oklahoma-city` | `/locations/oklahoma-city-ok` |
| `/physical-near-you-in-oklahoma-city` | `/physician-near-you-oklahoma-city` |
| `/home-page-new` | `/` |
| `/services-2` | `/services` |
| `/doctor`, `/doctors` | `/providers` |

---

## 9. Public assets referenced from pages

| Path | Used by |
|---|---|
| `/logo.png` | nav, footer, JSON-LD `publisher.logo` |
| `/assets/young-physician.jpg` | home hero, default OG image |
| `/assets/Moore_QUC_8189.jpeg` | imaging showcase, blog hero (std-testing) |
| `/assets/Moore_QUC_8190.jpeg` | location card, blog hero (sore-throat) |
| `/assets/Moore_QUC_8191.jpeg` | blog hero (immunization) |
| `/assets/IMG_1320.jpeg` | OKC clinic card |
| `/assets/IMG_1307-1344.jpeg` | about-page gallery |
| `/forms/*.pdf` | plan-your-visit downloads ⚠️ **placeholder dir** — drop real PDFs here |

---

## 10. Setup checklist alignment

Cross-references from the Month-1 30-task plan:

- **Task 2** Search Console — submit `https://quickurgentcareok.com/sitemap.xml`. All routes listed here are already in it.
- **Task 9** Google Ads conversions — fire on: `/api/contact` submit, `/api/careers` submit, `/api/book` submit, `tel:` clicks (everywhere), `mapsUrl` outbound clicks on locations + landings.
- **Task 13** GTM tags — wrap every clickable phone (`tel:4052857222`, `tel:4052862888`) and directions link in the relevant clinic context for source attribution.
- **Task 14** GTM triggers — `dataLayer.push({event: 'booking_submit'})` should fire on outbound clicks to Clockwise (`bookUrl` in `clinics.ts`).
- **Task 15** CallRail DNI — Moore tracking number on `/locations/moore-ok`, `/urgent-care-moore-ok`, `/walk-in-clinic-moore-ok`, `/dot-physical-moore-ok`, `/pediatric-urgent-care-moore-ok`. OKC number on the OKC-suffixed landings + `/locations/oklahoma-city-ok` + `/physician-near-you-oklahoma-city`. Default = Moore on organic.
- **Task 18** Sanity schemas — should mirror types in `src/lib/clinics.ts` (`Clinic`), `service-pages.ts` (`ServicePage`), `seo-landings.ts` (`SeoLanding`), `blog-posts.ts` (`BlogPost`), and the inline `Provider` type in `src/app/providers/page.tsx`.
- **Task 19** Sanity migration — seed data lives in those same `lib/*.ts` files; treat them as the export source.
- **Task 24** Rich-results validation URLs to test:
  - `/` (MedicalOrganization, WebSite, FAQPage)
  - `/locations/moore-ok`, `/locations/oklahoma-city-ok` (MedicalClinic)
  - `/services/x-ray`, etc. (MedicalProcedure + FAQPage)
  - `/blog/drug-testing-near-me`, etc. (Article)
  - `/providers` (Physician graph)
  - `/reviews` (AggregateRating + Review)
  - every SEO landing under `/<slug>` (MedicalClinic).
- **Task 25** Top-6 indexing requests: `/`, `/locations`, `/locations/moore-ok`, `/locations/oklahoma-city-ok`, `/services`, `/pricing`.

---

## 11. Pages that still need real data (not blocked by code)

| Page | What's missing |
|---|---|
| `/plan-your-visit` | Actual patient-form PDFs in `/public/forms/` |
| Footer social | Real Facebook + Google Business profile URLs (placeholders linked) |
| Default share | Dedicated `og-image.jpg` (currently young-physician.jpg) |
| `/reviews` | Switch from static `REVIEWS` array to GBP / BirdEye API once Phase 8 Review Response agent is live |
| `/api/book` `/api/contact` `/api/careers` | Set webhook env vars or wire to Resend so submissions reach Iftikhar |
