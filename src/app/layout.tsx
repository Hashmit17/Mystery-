import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { Providers } from "@/components/providers";
import { CursorTrackingBackground } from "@/components/CursorTrackingBackground";

export const metadata: Metadata = {
  title: "MYSTERY | Meet the mind before the face",
  description: "Discover meaningful connections with people near you. Start with a conversation, find your chemistry, and reveal more when you're ready.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <CursorTrackingBackground />
        <div className="relative z-10 flex min-h-full flex-1 flex-col">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  );
}
