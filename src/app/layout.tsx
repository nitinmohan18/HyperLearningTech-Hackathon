
import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GlassCursorTracker from "@/components/common/GlassCursorTracker";
import LuxuryBackground from "@/components/common/LuxuryBackground";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hackathon.hyperlearningtech.in"),

  title: {
    default: "HyperLearningTech Winter Hackathon '26",
    template: "%s | HyperLearningTech",
  },

  description:
    "Join HyperLearningTech Winter Hackathon '26, a fully online 24-hour technology hackathon. Build innovative projects, showcase your skills, compete for prizes, and earn recognition.",

  applicationName: "HyperLearningTech Winter Hackathon '26",

  authors: [
    {
      name: "HyperLearningTech",
      url: "https://hyperlearningtech.in",
    },
  ],

  creator: "HyperLearningTech",
  publisher: "HyperLearningTech",

  category: "Technology",

  keywords: [
    "HyperLearningTech",
    "Winter Hackathon 2026",
    "HyperLearningTech Winter Hackathon",
    "Online Hackathon India",
    "24 Hour Hackathon",
    "Coding Hackathon",
    "Student Hackathon",
    "Programming Competition",
    "Innovation Challenge",
    "Developer Community",
    "Build Prove Earn",
  ],

  alternates: {
    canonical: "/",
  },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
    ],
    shortcut: "/favicon.ico",
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://hackathon.hyperlearningtech.in/",
    siteName: "HyperLearningTech",
    title: "HyperLearningTech Winter Hackathon '26",
    description:
      "Build. Prove. Earn. Join a fully online 24-hour technology hackathon by HyperLearningTech. Build innovative projects and compete for prizes.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "HyperLearningTech Winter Hackathon '26 – Build. Prove. Earn.",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "HyperLearningTech Winter Hackathon '26",
    description:
      "Join the 24-hour online technology hackathon. Build innovative projects, compete, and earn recognition.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  // Add Google Search Console verification token here
  // after choosing HTML tag verification in Search Console.
  // verification: {
  //   google: "YOUR_GOOGLE_VERIFICATION_TOKEN",
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${cormorantGaramond.variable}`}
    >
      <body className="min-h-screen font-sans text-espresso-body antialiased selection:bg-orange selection:text-white bg-[#140d09]">
        <LuxuryBackground />
        <GlassCursorTracker />
        <div className="relative z-10 flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
