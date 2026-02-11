import { ThemeProvider } from "@/components/ThemeProvider";
import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto-mono",
  display: "swap",
});

import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL('https://bishal-port.vercel.app/'),
  title: {
    default: "Bishal Mondal | Full Stack Developer & IoT Specialist",
    template: "%s | Bishal Mondal"
  },
  description: "Portfolio of Bishal Mondal - Experienced Technical Assistant and Full Stack Developer specializing in Flutter, IoT, React, Next.js, and Modern Web Tech. Based in Kolkata, India.",
  keywords: [
    "Bishal Mondal", "Portfolio", "Full Stack Developer", "Flutter Developer",
    "IoT Specialist", "React Developer", "Next.js", "Technical Assistant",
    "Adamas University", "Software Engineer", "Kolkata", "Web Development"
  ],
  authors: [{ name: "Bishal Mondal", url: "https://bishal-port.vercel.app/" }],
  creator: "Bishal Mondal",
  publisher: "Bishal Mondal",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://bishal-port.vercel.app/",
    title: "Bishal Mondal | Full Stack Developer & IoT Specialist",
    description: "Explore the portfolio of Bishal Mondal, featuring projects in IoT, Mobile App Development, and Modern Web Technologies.",
    siteName: "Bishal Mondal Portfolio",
    images: [
      {
        url: "/Bishal.svg", // Using profile image as fallback OG image
        width: 1200,
        height: 630,
        alt: "Bishal Mondal Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bishal Mondal | Full Stack Developer & IoT Specialist",
    description: "Technical Assistant & Developer specialized in Flutter, IoT, and Web Tech.",
    images: ["/Bishal.svg"],
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

import JsonLd from "../components/JsonLd";
import ChatWidget from "../components/ChatWidget";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${roboto_mono.variable}`}>
      <body className="antialiased font-sans">
        <JsonLd />
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <ChatWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}
