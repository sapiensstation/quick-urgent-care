import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Providers } from "./providers";
import { CLINICS, SITE_URL, SITE_NAME, SITE_PHONE } from "@/lib/clinics";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Quick Urgent Care — Walk in & Urgent Care Clinic in Moore & OKC",
    template: "%s | Quick Urgent Care",
  },
  description:
    "Walk-in & Urgent Care clinic in Moore and Oklahoma City. Open daily 7am–8pm including holidays. Board-certified providers, on-site X-ray, transparent pricing.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Quick Urgent Care — Walk in & Urgent Care Clinic in Moore & OKC",
    description:
      "Board-certified walk-in care in Moore and Oklahoma City. Open daily 7am–8pm, including holidays.",
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    images: ["/og-image.jpg"],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  icons: { icon: "/favicon.ico" },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalOrganization",
  name: SITE_NAME,
  url: SITE_URL,
  telephone: `+1-${SITE_PHONE}`,
  logo: `${SITE_URL}/logo.png`,
  sameAs: [],
  department: CLINICS.map((c) => ({
    "@type": "MedicalClinic",
    "@id": `${SITE_URL}/locations#${c.id}`,
    name: `${SITE_NAME} — ${c.city}`,
    url: `${SITE_URL}/locations`,
    telephone: `+1-${c.phone}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: c.street,
      addressLocality: c.city,
      addressRegion: c.state,
      postalCode: c.zip,
      addressCountry: "US",
    },
    geo: { "@type": "GeoCoordinates", latitude: c.geo.lat, longitude: c.geo.lng },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "07:00",
        closes: "20:00",
      },
    ],
    medicalSpecialty: ["Urgent Care", "Family Medicine", "Emergency Medicine"],
  })),
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: `${SITE_URL}/?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID;
const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
const CALLRAIL_ACCOUNT = process.env.NEXT_PUBLIC_CALLRAIL_ACCOUNT;
const CALLRAIL_SCRIPT = process.env.NEXT_PUBLIC_CALLRAIL_SCRIPT;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        {GTM_ID && (
          <Script id="gtm" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
          </Script>
        )}
        {(GA4_ID || ADS_ID) && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA4_ID || ADS_ID}`} strategy="afterInteractive" />
            <Script id="gtag-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());${GA4_ID ? `gtag('config','${GA4_ID}');` : ""}${ADS_ID ? `gtag('config','${ADS_ID}');` : ""}`}
            </Script>
          </>
        )}
        {CALLRAIL_ACCOUNT && CALLRAIL_SCRIPT && (
          <Script
            id="callrail"
            strategy="afterInteractive"
            src={`//cdn.callrail.com/companies/${CALLRAIL_ACCOUNT}/${CALLRAIL_SCRIPT}/12/swap.js`}
          />
        )}
      </head>
      <body className="antialiased">
        {GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
