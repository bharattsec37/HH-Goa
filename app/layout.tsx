import type { Metadata } from "next";
import { Bebas_Neue, Plus_Jakarta_Sans, Space_Mono, Yatra_One } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas" });
const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-jakarta" });
const spaceMono = Space_Mono({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-space-mono" });
const yatra = Yatra_One({ weight: "400", subsets: ["latin", "devanagari"], variable: "--font-yatra" });

export const metadata: Metadata = {
  title: "Hacker House Goa — Frame Lab & Builder ID Passport",
  description: "Create your exclusive Hacker House Goa Builder Identity in seconds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={cn(
        bebas.variable, jakarta.variable, spaceMono.variable, yatra.variable,
        "font-jakarta antialiased bg-hh-green text-hh-cream min-h-screen selection:bg-hh-pink selection:text-white"
      )}>
        {children}
      </body>
    </html>
  );
}
