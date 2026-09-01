import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = { title: "THREAD — Your phone understands what you mean.", description: "A contextual action layer for your phone." };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
