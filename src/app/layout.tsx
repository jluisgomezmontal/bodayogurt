import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Great_Vibes, Montserrat } from "next/font/google";
import datos from "@data/invitacion.json";
import type { Invitacion } from "@/types/invitacion";
import "./globals.css";

const inv = datos as Invitacion;

const script = Great_Vibes({ weight: "400", subsets: ["latin"], variable: "--font-script" });
const serif = Cormorant_Garamond({
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
});
const sans = Montserrat({ weight: ["300", "400", "500"], subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  metadataBase: inv.sitio.url ? new URL(inv.sitio.url) : undefined,
  title: inv.sitio.titulo,
  description: inv.sitio.descripcion,
  icons: {
    icon: inv.sitio.icono,
    apple: inv.sitio.icono,
  },
  openGraph: {
    title: inv.sitio.titulo,
    description: inv.sitio.descripcion,
    images: [{ url: inv.sitio.imagenCompartir, width: 1200, height: 630 }],
    type: "website",
    locale: "es_MX",
  },
  twitter: {
    card: "summary_large_image",
    images: [inv.sitio.imagenCompartir],
  },
};

export const viewport: Viewport = { themeColor: "#F5EEE3" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${script.variable} ${serif.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
