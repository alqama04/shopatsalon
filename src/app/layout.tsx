import { EdgeStoreProvider } from "../lib/edgestore";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import AuthProvider from "./context/AuthProvider";

const rubik = Montserrat({ subsets: ["latin"],weight:'400' });

export const metadata: Metadata = {
  title: {
    template: '%s | Shop At Salon',
    default: 'Shop At Salon',
  },
  description:
    "Now There is a Newer, Smarter &  More Rewarding Way To Shop for Your Salons Needs.",
  metadataBase: new URL('https://shopatsalon.com'),
  manifest:"/manifest.webmanifest"
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={rubik.className}>
        <AuthProvider>
          <EdgeStoreProvider>{children}</EdgeStoreProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
