import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Visit — Reserve Your Time",
  description:
    "Reserve your visit at Quick Urgent Care in Moore or Oklahoma City. Skip the waiting room. Confirmed by text in minutes.",
  alternates: { canonical: "/book" },
};

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
