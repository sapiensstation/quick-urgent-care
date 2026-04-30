import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pay Your Bill",
  description: "Securely pay your Quick Urgent Care bill online.",
  alternates: { canonical: "/pay" },
};

export default function PayLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
