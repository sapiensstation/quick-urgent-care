import type { MetadataRoute } from "next";
import { CLINICS, SITE_URL } from "@/lib/clinics";

const SERVICE_SLUGS = [
  "x-ray",
  "vaccinations",
  "drug-testing",
  "physicals",
  "occupational-medicine",
  "lab-testing",
];

const SEO_LANDING_SLUGS = [
  "urgent-care-moore-ok",
  "urgent-care-oklahoma-city-ok",
  "walk-in-clinic-moore-ok",
  "walk-in-clinic-oklahoma-city-ok",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = [
    "",
    "about",
    "services",
    "locations",
    "providers",
    "pricing",
    "pay",
    "book",
  ].map((p) => ({
    url: `${SITE_URL}/${p}`.replace(/\/$/, "") || SITE_URL,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: p === "" ? 1.0 : 0.8,
  }));

  const services = SERVICE_SLUGS.map((s) => ({
    url: `${SITE_URL}/services/${s}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const landings = SEO_LANDING_SLUGS.map((s) => ({
    url: `${SITE_URL}/${s}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const locations = CLINICS.map((c) => ({
    url: `${SITE_URL}/locations/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...base, ...services, ...landings, ...locations];
}
