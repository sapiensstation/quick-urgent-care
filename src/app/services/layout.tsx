import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services — X-ray, Vaccinations, Physicals & More",
  description:
    "Walk-in urgent care services in Moore and Oklahoma City: X-ray, vaccinations, drug testing, physicals, occupational medicine, lab testing.",
  alternates: { canonical: "/services" },
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
