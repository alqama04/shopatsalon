import { EdgeStoreProvider } from "../lib/edgestore";
import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import AuthProvider from "./context/AuthProvider";
const inter = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shop At Salon",
  description:
    "Now There is a Newer, Smarter &  More Rewarding Way To Shop for Your Salons Needs.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <EdgeStoreProvider>{children}</EdgeStoreProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
