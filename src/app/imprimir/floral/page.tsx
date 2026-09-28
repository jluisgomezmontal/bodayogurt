import type { Metadata } from "next";
import datos from "@data/invitacion.json";
import type { Invitacion } from "@/types/invitacion";
import HojaImpresa from "../HojaImpresa";

const inv = datos as Invitacion;

export const metadata: Metadata = {
  title: `Invitación impresa (floral) · ${inv.novios.ella} & ${inv.novios.el}`,
  robots: { index: false, follow: false },
};

export default function ImprimirFloral() {
  return <HojaImpresa variante="floral" />;
}
