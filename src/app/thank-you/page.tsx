import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Thank You",
  description: "Your message has been received. The Quick Urgent Care team will be in touch shortly.",
  robots: { index: false, follow: false },
};

export default function ThankYou() {
  return (
    <Layout>
      <section className="container pt-24 lg:pt-36 pb-32 flex flex-col items-center text-center max-w-xl mx-auto gap-6">
        <div className="size-16 rounded-full bg-secondary-container grid place-items-center">
          <CheckCircle className="size-8 text-secondary" />
        </div>
        <h1 className="text-display-xl font-display">Thank you!</h1>
        <p className="text-on-surface-variant text-lg leading-relaxed">
          Your message has been received. Our team will be in touch shortly.
        </p>
        <p className="text-on-surface-muted text-sm">
          For urgent medical questions, please call us directly or walk in — open daily 7am–8pm.
        </p>
        <div className="flex flex-wrap gap-3 justify-center mt-4">
          <Button asChild><Link href="/">Back to home</Link></Button>
          <Button asChild variant="ghost"><a href="tel:4052857222">Call 405-285-7222</a></Button>
        </div>
      </section>
    </Layout>
  );
}
