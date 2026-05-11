import type { Metadata } from "next";
import { Layout } from "@/components/Layout";
import { Eyebrow } from "@/components/Editorial";
import { SITE_URL } from "@/lib/clinics";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join the Quick Urgent Care team in Moore or Oklahoma City. We're looking for compassionate, skilled healthcare professionals.",
  alternates: { canonical: "/careers" },
  openGraph: {
    title: "Careers — Quick Urgent Care",
    description: "Join our team in Moore or Oklahoma City. Apply online today.",
    url: `${SITE_URL}/careers`,
  },
};

export default function Careers() {
  return (
    <Layout>
      <section className="container pt-20 lg:pt-28 pb-12 grid lg:grid-cols-12 gap-10 items-end">
        <div className="lg:col-span-8">
          <Eyebrow tone="primary">Careers</Eyebrow>
          <h1 className="mt-5 text-display-xl font-display">
            Interested in a<br />Quick Urgent Care career?
          </h1>
        </div>
        <p className="lg:col-span-4 text-on-surface-variant text-lg leading-relaxed">
          We&apos;re a growing team of healthcare professionals committed to compassionate, fast, high-quality urgent care in Moore and Oklahoma City.
        </p>
      </section>

      <section className="container py-16">
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            <h2 className="font-display text-display-md">Why join our team?</h2>
            <ul className="space-y-4 text-on-surface-variant">
              {[
                "Competitive compensation and benefits",
                "Collaborative, supportive clinical environment",
                "Stable, consistent hours — open daily 7am–8pm",
                "Modern facilities with on-site imaging and lab",
                "Serving a community that trusts and values our care",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="size-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="surface-low rounded-xl p-8 lg:p-10">
            <Eyebrow>Apply now</Eyebrow>
            <h2 className="mt-4 font-display text-display-md">Ready to apply?</h2>
            <p className="mt-3 text-on-surface-variant">
              Fill out the form below and our team will be in touch. We consider all qualified applicants for clinical and support roles.
            </p>
            <form action="/api/careers" method="POST" className="mt-8 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="label-eyebrow mb-2 block" htmlFor="c-name">Full name</label>
                  <input
                    id="c-name"
                    name="name"
                    type="text"
                    required
                    className="w-full surface-lowest border border-outline-variant/30 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary"
                    placeholder="Jane Smith"
                  />
                </div>
                <div>
                  <label className="label-eyebrow mb-2 block" htmlFor="c-email">Email</label>
                  <input
                    id="c-email"
                    name="email"
                    type="email"
                    required
                    className="w-full surface-lowest border border-outline-variant/30 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary"
                    placeholder="jane@example.com"
                  />
                </div>
              </div>
              <div>
                <label className="label-eyebrow mb-2 block" htmlFor="c-phone">Phone</label>
                <input
                  id="c-phone"
                  name="phone"
                  type="tel"
                  className="w-full surface-lowest border border-outline-variant/30 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary"
                  placeholder="405-555-0100"
                />
              </div>
              <div>
                <label className="label-eyebrow mb-2 block" htmlFor="c-role">Role you&apos;re interested in</label>
                <select
                  id="c-role"
                  name="role"
                  className="w-full surface-lowest border border-outline-variant/30 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary"
                >
                  <option value="">Select a role</option>
                  <option>Physician Assistant (PA-C)</option>
                  <option>Nurse Practitioner (APRN-CNP)</option>
                  <option>Registered Nurse (RN)</option>
                  <option>Medical Assistant (MA)</option>
                  <option>Front Desk / Patient Services</option>
                  <option>Lab / Radiology Technician</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="label-eyebrow mb-2 block" htmlFor="c-message">Tell us about yourself</label>
                <textarea
                  id="c-message"
                  name="message"
                  rows={4}
                  className="w-full surface-lowest border border-outline-variant/30 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary resize-none"
                  placeholder="Experience, credentials, why you'd like to join Quick Urgent Care…"
                />
              </div>
              <button
                type="submit"
                className="gradient-primary text-primary-foreground rounded-lg px-6 py-3 text-sm font-medium hover:-translate-y-0.5 transition-transform"
              >
                Submit application
              </button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}
