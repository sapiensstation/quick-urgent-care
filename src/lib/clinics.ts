export type Clinic = {
  id: "moore" | "okc";
  city: string;
  state: string;
  street: string;
  zip: string;
  fullAddress: string;
  phone: string;
  fax: string;
  wait: number;
  geo: { lat: number; lng: number };
  mapsUrl: string;
  slug: string;
};

export const CLINICS: Clinic[] = [
  {
    id: "moore",
    city: "Moore",
    state: "OK",
    street: "2212 N Broadway Ave",
    zip: "73160",
    fullAddress: "2212 N Broadway Ave, Moore, OK 73160",
    phone: "405-285-7222",
    fax: "405-285-7227",
    wait: 12,
    geo: { lat: 35.3603, lng: -97.4775 },
    mapsUrl: "https://maps.google.com/?q=2212+N+Broadway+Ave,+Moore,+OK+73160",
    slug: "moore-ok",
  },
  {
    id: "okc",
    city: "Oklahoma City",
    state: "OK",
    street: "1421 NW 122nd St",
    zip: "73114",
    fullAddress: "1421 NW 122nd St, Oklahoma City, OK 73114",
    phone: "405-285-7222",
    fax: "405-285-7224",
    wait: 18,
    geo: { lat: 35.5829, lng: -97.5249 },
    mapsUrl: "https://maps.google.com/?q=1421+NW+122nd+St,+Oklahoma+City,+OK+73114",
    slug: "oklahoma-city-ok",
  },
];

export const SITE_URL = "https://quickurgentcareok.com";
export const SITE_NAME = "Quick Urgent Care";
export const SITE_PHONE = "405-285-7222";
export const SITE_HOURS = "Mo-Su 07:00-20:00";
