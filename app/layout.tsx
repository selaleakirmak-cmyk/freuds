import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, DM_Mono } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500"],
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Freudstarot",
  description:
    "A psychoanalytically-inspired reflection tool. Not for prediction. For attention.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable} ${dmMono.variable}`}>
      <body className="min-h-screen bg-[#F4EFE4] text-[#161310] antialiased">
        {children}
      </body>
    </html>
  );
}
