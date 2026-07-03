import type { Metadata } from "next";
import "./globals.css";
import { siteConfig } from "@/constants/site";

// NOTE: This build environment has no access to fonts.gstatic.com, so we use
// a high-quality system font stack instead of next/font/google. If your own
// environment has internet access, you can swap this for:
//   import { Playfair_Display, Inter } from "next/font/google";
// and assign the resulting `.variable` classes below — the --font-display /
// --font-sans CSS variables are already wired up in globals.css to use them.
const fontVariables =
  "[--font-playfair:Georgia,'Times_New_Roman',serif] [--font-inter:-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,Helvetica,Arial,sans-serif]";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${fontVariables} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-[var(--color-navy)]">
        {children}
      </body>
    </html>
  );
}
