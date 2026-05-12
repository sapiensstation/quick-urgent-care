import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Eyebrow } from "@/components/Editorial";
import { BLOG_POSTS } from "@/lib/blog-posts";
import { SITE_URL } from "@/lib/clinics";

export const metadata: Metadata = {
  title: "Blog — Urgent Care Health Tips & News",
  description:
    "Health tips, urgent care guidance, and clinic news from Quick Urgent Care in Moore and Oklahoma City.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog — Quick Urgent Care",
    description: "Health tips and urgent care guidance from Quick Urgent Care in Moore and Oklahoma City.",
    url: `${SITE_URL}/blog`,
  },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function Blog() {
  return (
    <Layout>
      <section className="container pt-20 lg:pt-28 pb-12 grid lg:grid-cols-12 gap-10 items-end">
        <div className="lg:col-span-8">
          <Eyebrow tone="primary">Blog</Eyebrow>
          <h1 className="mt-5 text-display-xl font-display">
            Health tips &<br />clinic news.
          </h1>
        </div>
        <p className="lg:col-span-4 text-on-surface-variant text-lg leading-relaxed">
          Practical health information from the Quick Urgent Care team in Moore and Oklahoma City.
        </p>
      </section>

      <section className="container py-6">
        <div className="flex flex-wrap gap-2">
          {Array.from(new Set(BLOG_POSTS.map((p) => p.category))).map((cat) => (
            <span
              key={cat}
              className="px-3 py-1.5 rounded-full surface-lowest text-xs font-medium border border-outline-variant/15 text-on-surface-variant"
            >
              {cat}
            </span>
          ))}
        </div>
      </section>

      <section className="container py-12">
        <div className="grid md:grid-cols-2 gap-6">
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="surface-lowest rounded-xl overflow-hidden hover:lift-soft transition-all group"
            >
              {post.image && (
                <div className="aspect-[16/9] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-editorial group-hover:scale-105"
                  />
                </div>
              )}
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="label-eyebrow">{post.category}</span>
                  <span className="text-on-surface-muted text-xs">·</span>
                  <span className="text-on-surface-muted text-xs">{post.readMinutes} min read</span>
                </div>
                <h2 className="font-display text-xl font-semibold leading-snug group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                <p className="mt-3 text-on-surface-variant text-sm leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-xs text-on-surface-muted">{formatDate(post.date)}</span>
                  <span className="inline-flex items-center gap-1 text-sm text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    Read more <ArrowUpRight className="size-3.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </Layout>
  );
}
