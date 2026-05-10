import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

const sans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-portfolio",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Husnain Arshad — Portfolio",
  description: "Software engineer — projects, skills, and contact.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={sans.variable}>
      <body
        suppressHydrationWarning
        className={`${sans.className} min-h-dvh bg-zinc-50 font-sans text-zinc-900 antialiased dark:bg-zinc-950 dark:text-zinc-50`}
      >
        <SiteHeader />
        <div id="content">{children}</div>
        <SiteFooter />
      </body>
    </html>
  );
}
