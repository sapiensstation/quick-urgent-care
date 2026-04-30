import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing — Transparent Self-Pay Rates",
  description:
    "Self-pay urgent care visit $89 vs $2,200 average ER visit. Most major insurance accepted.",
  alternates: { canonical: "/pricing" },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
