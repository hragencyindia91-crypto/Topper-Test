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


export const metadata: Metadata = {
  metadataBase: new URL("https://toppertest.online"),
  title: "TOPPER TEST – Rajasthan GK Online Test & Mock Test",
  description:
    "राजस्थान GK, इतिहास, भूगोल, कला-संस्कृति और प्रतियोगी परीक्षाओं की तैयारी के लिए Topic Wise Online Tests, Practice Questions और Mock Tests दें।",
  keywords: [
    "Rajasthan GK Test",
    "Rajasthan GK Online Test",
    "Rajasthan GK Mock Test",
    "Rajasthan CET Mock Test",
    "Rajasthan Police SI Test",
    "Rajasthan LDC Test",
    "TOPPER TEST",
  ],
  openGraph: {
    title: "TOPPER TEST – Rajasthan GK Online Test",
    description:
      "राजस्थान प्रतियोगी परीक्षाओं की तैयारी करें Topic Wise Online Tests और Mock Tests के साथ।",
    url: "https://toppertest.online",
    siteName: "TOPPER TEST",
    locale: "hi_IN",
    type: "website",
  },
};


export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
