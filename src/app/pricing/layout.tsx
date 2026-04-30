import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing — Transparent Self-Pay Rates",
  description:
    "Self-pay urgent care visit $129. X-ray $75. Sports physical $45. DOT physical $85. Most major insurance accepted.",
  alternates: { canonical: "/pricing" },
};

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
