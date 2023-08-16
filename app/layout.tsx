import "./globals.css";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

const font = Montserrat({ subsets: ["cyrillic"] });

export const metadata: Metadata = {
  title: "Codeplace",
  description: "Run JavaScript code in the browser",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={font.className}>{children}</body>
    </html>
  );
}
