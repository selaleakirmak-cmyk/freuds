import type { Metadata, Viewport } from "next";
import { Fraunces, Manrope, DM_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Freudstarot",
  description:
    "A psychoanalytically-inspired reflection tool. Not for prediction. For attention.",
  appleWebApp: {
    capable: true,
    title: "Freudstarot",
    statusBarStyle: "black-translucent",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: "#F1E8DC",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${manrope.variable} ${dmMono.variable}`}>
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
