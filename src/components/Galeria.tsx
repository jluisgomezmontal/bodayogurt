"use client";

import { useEffect, useState } from "react";

export default function Galeria({ fotos }: { fotos: string[] }) {
  const [abierta, setAbierta] = useState<string | null>(null);

  useEffect(() => {
    if (!abierta) return;
    const cerrar = (e: KeyboardEvent) => e.key === "Escape" && setAbierta(null);
    window.addEventListener("keydown", cerrar);
    return () => window.removeEventListener("keydown", cerrar);
  }, [abierta]);

  return (
    <>
      <div className="galeria">
        {fotos.map((src, i) => (
          <button key={src} onClick={() => setAbierta(src)} aria-label={`Ver foto ${i + 1}`}>
            <img src={src} alt="" loading="lazy" />
          </button>
        ))}
      </div>
      {abierta && (
        <div className="lightbox" onClick={() => setAbierta(null)} role="dialog" aria-label="Foto ampliada">
          <img src={abierta} alt="" />
        </div>
      )}
    </>
  );
}
