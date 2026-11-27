import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import VisitorTracker from "./VisitorTracker";

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
  title: "Rajasthan GK in Hindi, Notes, Questions & Mock Tests | TOPPER TEST",
  description:
    "राजस्थान GK हिंदी में पढ़ें। राजस्थान इतिहास, भूगोल, कला-संस्कृति, राजनीति, करंट अफेयर्स के नोट्स, महत्वपूर्ण प्रश्न और ऑनलाइन मॉक टेस्ट से तैयारी करें।",
  keywords: [
    "Rajasthan GK",
    "Rajasthan GK in Hindi",
    "Rajasthan GK Notes",
    "Rajasthan History",
    "Rajasthan Geography",
    "Rajasthan Art and Culture",
    "Rajasthan Polity",
    "Rajasthan GK Questions",
    "Rajasthan Current Affairs",
    "Rajasthan CET Preparation",
    "Rajasthan GK Online Test",
    "Rajasthan Mock Test"
    "Rajasthan pyq",
    "TOPPER TEST",
  ],
};


export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
  <body className="min-h-full flex flex-col">
  <VisitorTracker />
  {children}
</body>
    </html>
  );
}
