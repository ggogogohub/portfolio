import type { Metadata, Viewport } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";

const fontDisplay = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const fontSans = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  // Resolve canonical / OG URLs against the production origin when provided.
  // We intentionally do NOT fall back to localhost: on a static prerender that
  // would bake http://localhost:3000 into the shipped <link rel="canonical">
  // and og:url (silent SEO/social-card breakage). When unset, Next resolves
  // relative URLs against the request/deployment URL (and auto-detects on
  // Vercel). Set NEXT_PUBLIC_SITE_URL in the BUILD env before deploying.
  ...(process.env.NEXT_PUBLIC_SITE_URL
    ? { metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL) }
    : {}),
  title: "Sonu Thakur — Computing Graduate | Software, Cloud, Data & AI",
  description:
    "Portfolio of Sonu Thakur, First-Class BSc Computing Systems graduate from the University of Ulster and Paul Hanna Award recipient, seeking UK graduate, junior, and internship technology roles across software, cloud, data, AI, security, and product engineering.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Sonu Thakur Portfolio",
    title: "Sonu Thakur — Computing Graduate",
    description:
      "First-Class BSc Computing Systems graduate seeking UK graduate, junior, and internship technology roles across software, cloud, data, AI, and security.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sonu Thakur — Computing Graduate",
    description:
      "First-Class BSc Computing Systems graduate seeking UK graduate, junior, and internship technology roles.",
  },
};

// Force-dark site: paint mobile browser chrome (address/status bar) and native
// controls in the page's near-black base so there's no light strip on load.
export const viewport: Viewport = {
  themeColor: "#030303",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontDisplay.variable} ${fontSans.variable} dark antialiased`}
      suppressHydrationWarning
    >
      <body
        className="bg-[var(--background)] text-[var(--foreground)] min-h-screen flex flex-col font-sans overflow-x-hidden"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
