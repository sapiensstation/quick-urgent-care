/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "quickurgentcareok.com" },
    ],
  },
  async redirects() {
    return [
      // Legacy WordPress blog posts
      { source: "/onsite-drug-testing-near-me", destination: "/blog/drug-testing-near-me", permanent: true },
      { source: "/walk-in-urgent-care", destination: "/blog/sore-throat-ear-pain", permanent: true },
      { source: "/urgent-care-std-testing", destination: "/blog/std-testing-urgent-care", permanent: true },
      // Legacy WordPress service pages
      { source: "/on-site-imaging", destination: "/services/x-ray", permanent: true },
      { source: "/on-site-imaging-old", destination: "/services/x-ray", permanent: true },
      { source: "/on-site-lab-testing", destination: "/services/lab-testing", permanent: true },
      { source: "/covid-19", destination: "/covid", permanent: true },
      // Legacy WP location pages
      { source: "/oklahoma-city", destination: "/locations/oklahoma-city-ok", permanent: true },
      { source: "/physical-near-you-in-oklahoma-city", destination: "/physician-near-you-oklahoma-city", permanent: true },
      // Legacy menu rewrites
      { source: "/home-page-new", destination: "/", permanent: true },
      { source: "/services-2", destination: "/services", permanent: true },
      { source: "/doctor", destination: "/providers", permanent: true },
      { source: "/doctors", destination: "/providers", permanent: true },
    ];
  },
};

export default nextConfig;
