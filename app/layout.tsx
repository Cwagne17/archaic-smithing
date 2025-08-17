import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/ui/Toast";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Archaic Smithing - Handcrafted Jewelry & Leatherwork",
  description: "Handcrafted jewelry and leatherwork by Camden Ailinger. Each piece is meticulously crafted with traditional techniques and modern artistry.",
  keywords: ["jewelry", "leatherwork", "handcrafted", "custom", "artisan"],
  authors: [{ name: "Camden Ailinger" }],
  creator: "Camden Ailinger",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Archaic Smithing - Handcrafted Jewelry & Leatherwork",
    description: "Handcrafted jewelry and leatherwork by Camden Ailinger. Each piece is meticulously crafted with traditional techniques and modern artistry.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/logo.png",
        width: 400,
        height: 400,
        alt: "Archaic Smithing Logo",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ToastProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </ToastProvider>
      </body>
    </html>
  );
}
