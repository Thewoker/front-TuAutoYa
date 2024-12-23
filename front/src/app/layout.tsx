import type { Metadata } from "next";
import Footer from "@/components/Footer/Footer";
import "./globals.css";
import NavBar from "@/components/Navbar/Navbar";
import { Bebas_Neue } from 'next/font/google';
import './globals.css'; // Archivo donde Tailwind está configurado
import { ConditionalHeader } from "@/components/Layout/ConditionalHeader";

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: '400', // Bebas Neue tiene un solo peso
  variable: '--font-bebas-neue', // Variable CSS para usar con Tailwind
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={bebasNeue.variable}
    data-lt-installed="true"
    >
      <body
      >
        <ConditionalHeader />
        {children}
        <Footer/>
      </body>
    </html>
  );
}
