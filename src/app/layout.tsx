import type { Metadata, Viewport } from "next";
import "@fontsource-variable/dm-sans";
import "@fontsource-variable/fraunces";
import "./globals.css";
import { DemoGuide } from "@/components/DemoGuide";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Toaster } from "@/components/Toaster";

export const metadata: Metadata = {
  title: {
    default: "Green Thumb Shop — plants, and the care that keeps them thriving",
    template: "%s · Green Thumb Shop",
  },
  description:
    "Green Thumb Shop is a European marketplace for succulents and houseplants. Plant Hub helps you care for the plants you own and discover what grows well with them. (Case-study prototype.)",
};

export const viewport: Viewport = {
  themeColor: "#1F4D36",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
        <DemoGuide />
        <Toaster />
      </body>
    </html>
  );
}
