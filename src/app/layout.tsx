import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BOARIFY 🐗 | Transform Yourself Into a Boar",
  description: "Upload your photo and let AI transform you into a magnificent wild boar. The internet's favorite boarification tool.",
  openGraph: {
    title: "BOARIFY 🐗",
    description: "Transform yourself into a wild boar with AI",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
