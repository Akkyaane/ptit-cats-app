import type { Metadata } from "next";
import "./globals.css";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Button from "@/components/ui/Button";

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
    <html lang="fr">
      <body className="min-h-screen flex flex-col">
        <header>
          <Navbar />
        </header>
        <main className="flex-1">{children}</main>
        <Footer />
        <Button up={true} />
      </body>
    </html>
  );
}
