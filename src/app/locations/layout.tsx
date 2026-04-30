import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Locations — Moore & Oklahoma City",
  description:
    "Quick Urgent Care clinics: 2212 N Broadway Ave, Moore, OK 73160 and 1421 NW 122nd St, Oklahoma City, OK 73114. Open daily 7am–8pm.",
  alternates: { canonical: "/locations" },
};

export default function LocationsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
