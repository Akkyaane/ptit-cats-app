import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sans Croquettes Fixes",
  description:
    "Association de protection animale dédiée au recueil et à l'adoption d'animaux.",
  icons: {
    icon: "/assets/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
