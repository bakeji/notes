import type { Metadata } from "next";
import { Inter} from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";


const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})


export const metadata: Metadata = {
  title: "Note",
  description: "A note-taking app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
