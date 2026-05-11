import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Eyebrow } from "@/components/Editorial";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { BLOG_POSTS } from "@/lib/blog-posts";
import { SERVICE_PAGES } from "@/lib/service-pages";
import { SITE_URL } from "@/lib/clinics";

export const dynamicParams = false;

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${SITE_URL}/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
      authors: post.author ? [post.author] : undefined,
      images: post.image ? [{ url: post.image }] : undefined,
      tags: post.tags,
    },
  };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

function renderMarkdown(body: string) {
  const lines = body.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="mt-10 mb-4 font-display text-2xl font-semibold">
          {line.slice(3)}
        </h2>
      );
    } else if (line.startsWith("- **")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`} className="my-4 space-y-2">
          {items.map((item, j) => {
            const parts = item.split(/\*\*(.+?)\*\*/g);
            return (
              <li key={j} className="flex items-start gap-2 text-on-surface-variant">
                <span className="size-1.5 rounded-full bg-primary mt-2 shrink-0" />
                <span>
                  {parts.map((p, k) => k % 2 === 1 ? <strong key={k} className="text-foreground">{p}</strong> : p)}
                </span>
              </li>
            );
          })}
        </ul>
      );
      continue;
    } else if (line.startsWith("- ")) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        items.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`} className="my-4 space-y-2">
          {items.map((item, j) => (
            <li key={j} className="flex items-start gap-2 text-on-surface-variant">
              <span className="size-1.5 rounded-full bg-primary mt-2 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
      continue;
    } else if (line.trim() === "") {
      // skip
    } else {
      const parts = line.split(/\*\*(.+?)\*\*/g);
      elements.push(
        <p key={i} className="my-4 text-on-surface-variant leading-relaxed">
          {parts.map((p, k) => k % 2 === 1 ? <strong key={k} className="text-foreground">{p}</strong> : p)}
        </p>
      );
    }
    i++;
  }
  return elements;
}

export default async function BlogPost(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    ...(post.author ? { author: { "@type": "Person", name: post.author } } : {}),
    ...(post.image ? { image: [`${SITE_URL}${post.image}`] } : {}),
    articleSection: post.category,
    ...(post.tags ? { keywords: post.tags.join(", ") } : {}),
    publisher: {
      "@type": "Organization",
      name: "Quick Urgent Care",
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/blog/${post.slug}` },
    url: `${SITE_URL}/blog/${post.slug}`,
  };

  const slugToService: Record<string, string[]> = {
    "drug-testing-near-me": ["drug-testing", "occupational-medicine", "physicals"],
    "sore-throat-ear-pain": ["treatments", "pediatric", "lab-testing"],
    "std-testing-urgent-care": ["lab-testing", "treatments", "vaccinations"],
    "walk-in-immunization-clinics": ["vaccinations", "pediatric", "physicals"],
  };
  const relatedSlugs = slugToService[post.slug] ?? ["treatments", "vaccinations", "physicals"];
  const related = SERVICE_PAGES.filter((s) => relatedSlugs.includes(s.slug)).slice(0, 3);

  return (
    <Layout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: post.title },
        ]}
      />

      <section className="container pt-8 lg:pt-12 pb-12">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-on-surface-variant hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="size-3.5" /> Back to blog
        </Link>
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <Eyebrow tone="primary">{post.category}</Eyebrow>
            <span className="text-on-surface-muted text-xs">·</span>
            <span className="text-on-surface-muted text-xs">{post.readMinutes} min read</span>
            <span className="text-on-surface-muted text-xs">·</span>
            <span className="text-on-surface-muted text-xs">{formatDate(post.date)}</span>
            {post.author && (
              <>
                <span className="text-on-surface-muted text-xs">·</span>
                <span className="text-on-surface-muted text-xs">By {post.author}</span>
              </>
            )}
          </div>
          <h1 className="text-display-xl font-display leading-tight">{post.title}</h1>
          <p className="mt-6 text-lg text-on-surface-variant leading-relaxed">{post.excerpt}</p>
          {post.image && (
            <div className="mt-10 overflow-hidden rounded-xl lift-soft">
              <img
                src={post.image}
                alt={post.title}
                className="w-full aspect-[16/9] object-cover"
              />
            </div>
          )}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2">
              {post.tags.map((t) => (
                <span key={t} className="px-3 py-1.5 rounded-full surface-lowest text-xs font-medium border border-outline-variant/15">
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="container pb-16">
        <div className="max-w-3xl prose-custom">
          {renderMarkdown(post.body)}
        </div>
      </section>

      <section className="container py-16 border-t border-outline-variant/15">
        <Eyebrow>Related services</Eyebrow>
        <h2 className="mt-3 font-display text-display-md">Services we offer.</h2>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {related.map((r) => (
            <Link
              key={r.slug}
              href={`/services/${r.slug}`}
              className="surface-lowest rounded-xl p-6 hover:lift-soft transition-all"
            >
              <Eyebrow>{r.eyebrow}</Eyebrow>
              <h3 className="mt-3 font-display text-lg font-semibold">{r.title}</h3>
              <p className="mt-2 text-on-surface-variant text-sm leading-relaxed line-clamp-2">{r.metaDescription}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="container py-16">
        <div className="rounded-xl gradient-primary text-primary-foreground p-12 lg:p-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-display-md">Walk in or reserve your spot.</h2>
            <p className="mt-3 text-primary-foreground/80 max-w-xl">
              Quick Urgent Care — Moore and Oklahoma City. Open daily 7am–8pm.
            </p>
          </div>
          <Button asChild variant="glass" size="xl">
            <Link href="/book">Book a visit</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
