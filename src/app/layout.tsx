import type { Metadata } from "next";
import "@fontsource-variable/playfair-display";
import "@fontsource-variable/playfair-display/wght-italic.css";
import "@fontsource-variable/quicksand";
import "@fontsource-variable/cairo";
import "@fontsource-variable/archivo";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Mariam — Marketing & Design",
  description:
    "Portfolio of Mariam — a storyteller making brands feel like people. Marketing brains with a designer's heart: visuals and campaigns people actually feel.",
  keywords: ["Mariam", "Marketing", "Design", "Portfolio", "Branding", "Social Media"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
