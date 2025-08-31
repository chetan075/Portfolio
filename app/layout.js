import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/Components/LayoutWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Chetan Kumawat - Full Stack Web Developer",
  description:
    "Portfolio of Chetan Kumawat, a passionate Full-Stack Web Developer specializing in dynamic and responsive websites.",
  keywords: "web developer, full stack, React, Next.js, Node.js, portfolio",
  authors: [{ name: "Chetan Kumawat" }],
  openGraph: {
    title: "Chetan Kumawat - Full Stack Web Developer",
    description: "Explore my projects and skills in web development.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
