import type { Metadata } from "next";
import datos from "@data/invitacion.json";
import type { Invitacion } from "@/types/invitacion";
import PaginaInvitacion from "@/components/PaginaInvitacion";

const inv = datos as Invitacion;

// Con exportación estática solo se generan los pases listados en pase.variantes (data/invitacion.json).
export const dynamicParams = false;

export function generateStaticParams() {
  return (inv.pase?.variantes ?? []).map((n) => ({ personas: String(n) }));
}

// Son copias de la misma invitación: que Google no las indexe como páginas duplicadas.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function PaginaConPase({ params }: { params: Promise<{ personas: string }> }) {
  const { personas } = await params;
  return <PaginaInvitacion personas={Number(personas)} />;
}
