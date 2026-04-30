import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Providers — Board-Certified Urgent Care",
  description:
    "Meet the board-certified physicians and physician assistants at Quick Urgent Care. 25+ years combined experience.",
  alternates: { canonical: "/providers" },
};

export default function ProvidersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
