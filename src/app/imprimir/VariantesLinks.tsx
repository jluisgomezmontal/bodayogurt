import Link from "next/link";
import type { VarianteImpresa } from "./HojaImpresa";

const variantes: { id: VarianteImpresa; nombre: string; ruta: string }[] = [
  { id: "clasica", nombre: "Clásica", ruta: "/imprimir" },
  { id: "floral", nombre: "Floral", ruta: "/imprimir/floral" },
];

/** Selector de diseño (solo en pantalla). */
export function VariantesLinks({ actual }: { actual: VarianteImpresa }) {
  return (
    <nav className="variantes-impresion">
      {variantes.map((v) => (
        <Link key={v.id} href={v.ruta} className={v.id === actual ? "activa" : ""}>
          {v.nombre}
        </Link>
      ))}
    </nav>
  );
}
