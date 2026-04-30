import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — Quick Urgent Care",
  description:
    "Quick Urgent Care is a board-certified walk-in clinic serving Moore and Oklahoma City. Open daily 7am–8pm, including holidays.",
  alternates: { canonical: "/about" },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
