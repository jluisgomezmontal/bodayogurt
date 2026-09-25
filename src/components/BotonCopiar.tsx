"use client";

import { useState } from "react";
import { IconoCopiar } from "./Iconos";

export default function BotonCopiar({ texto }: { texto: string }) {
  const [copiado, setCopiado] = useState(false);

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(texto.replace(/\s/g, ""));
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      /* el portapapeles puede no estar disponible (http sin https) */
    }
  };

  return (
    <button className="boton" onClick={copiar}>
      <IconoCopiar />
      {copiado ? "¡Copiado!" : "Copiar"}
    </button>
  );
}
