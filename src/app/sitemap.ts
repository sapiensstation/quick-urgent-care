import type { MetadataRoute } from "next";
import { CLINICS, SITE_URL } from "@/lib/clinics";
import { BLOG_POSTS } from "@/lib/blog-posts";

const SERVICE_SLUGS = [
  "x-ray",
  "vaccinations",
  "drug-testing",
  "physicals",
  "occupational-medicine",
  "lab-testing",
  "treatments",
  "pediatric",
];

const SEO_LANDING_SLUGS = [
  "urgent-care-moore-ok",
  "urgent-care-oklahoma-city-ok",
  "walk-in-clinic-moore-ok",
  "walk-in-clinic-oklahoma-city-ok",
  "physician-near-you-oklahoma-city",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = [
    "",
    "about",
    "contact",
    "services",
    "locations",
    "providers",
    "plan-your-visit",
    "insurance",
    "careers",
    "covid",
    "blog",
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

  const blog = BLOG_POSTS.map((p) => ({
    url: `${SITE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...base, ...services, ...landings, ...locations, ...blog];
}
