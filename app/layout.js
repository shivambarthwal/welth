import {  Inter } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const ganache = localFont({
  src: "./fonts/Ganache.ttf",
  variable: "--font-ganache",
  weight: "100 900",
});


export const metadata = {
  title: "My Wealth",
  description: "One Stop Solution for All Your Needs",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={`${inter.variable} ${ganache.variable}`}
      >
        <Header/>
        <main className=" min-h-screen">
        {children}
        </main>
        <Toaster richColors/>
        {/* <Footer/> */}
      </body>
    </html>
    </ClerkProvider>
  );
}
