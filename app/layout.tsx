import type { Metadata } from "next";
import Link from "next/link";
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
        <div className="relative flex min-h-screen flex-col">
          <header className="fixed inset-x-0 top-0 z-50 border-b border-black/6 bg-[#F4EFE4]/88 backdrop-blur-md">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-8">
              <Link href="/" className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#161310] transition hover:text-[#9B8B6E]">
                Freudstarot
              </Link>
              <nav className="flex items-center gap-6">
                <Link href="/spreads" className="font-mono text-[11px] uppercase tracking-[0.18em] text-black/55 transition hover:text-[#161310]">
                  Spreads
                </Link>
                <Link href="/deck" className="font-mono text-[11px] uppercase tracking-[0.18em] text-black/55 transition hover:text-[#161310]">
                  Deck
                </Link>
              </nav>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="border-t border-black/6">
            <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-8 md:flex-row md:items-center md:justify-between md:px-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-black/38">
                Reflection, not prediction.
              </p>
              <p className="text-[13px] leading-[1.6] text-black/42">
                Freudstarot is a symbolic reflection tool. It is not therapy and not a diagnostic instrument.
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
