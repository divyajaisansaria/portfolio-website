import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Divya Jaisansaria | AI/ML Developer & Student at SVNIT Surat",
    template: "%s | Divya Jaisansaria",
  },
  description: "Personal portfolio of Divya Jaisansaria, an AI/ML developer and B.Tech student at SVNIT Surat specializing in Generative AI, RAG systems, and enterprise automation.",
  keywords: [
    "Divya Jaisansaria",
    "SVNIT Surat",
    "AI Developer",
    "Machine Learning Engineer",
    "Generative AI",
    "RAG Systems",
    "Portfolio",
    "Full Stack Developer",
    "India",
    "Engineering Student",
  ],
  authors: [{ name: "Divya Jaisansaria" }],
  creator: "Divya Jaisansaria",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://divyajaisansaria.com", // User should update this if different
    title: "Divya Jaisansaria | AI/ML Developer Portfolio",
    description: "Building impactful AI solutions. Specialist in Generative AI and RAG pipelines.",
    siteName: "Divya Jaisansaria Portfolio",
    images: [
      {
        url: "/og-image.png", // User should add this to public/
        width: 1200,
        height: 630,
        alt: "Divya Jaisansaria Portfolio Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Divya Jaisansaria | AI/ML Developer",
    description: "AI/ML developer and B.Tech student at SVNIT Surat specializing in RAG systems.",
    images: ["/og-image.png"],
    creator: "@divyajaisansaria", // User should update this
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
