"use client";

import { useEffect, useState } from "react";

const unidades = [
  ["dias", "Días"],
  ["horas", "Horas"],
  ["minutos", "Min"],
  ["segundos", "Seg"],
] as const;

function restante(objetivo: number) {
  const ms = Math.max(0, objetivo - Date.now());
  return {
    dias: Math.floor(ms / 86_400_000),
    horas: Math.floor(ms / 3_600_000) % 24,
    minutos: Math.floor(ms / 60_000) % 60,
    segundos: Math.floor(ms / 1000) % 60,
  };
}

export default function CuentaRegresiva({ fecha }: { fecha: string }) {
  const objetivo = new Date(fecha).getTime();
  // null hasta montar en el navegador, para no desajustar el HTML generado
  const [tiempo, setTiempo] = useState<ReturnType<typeof restante> | null>(null);

  useEffect(() => {
    setTiempo(restante(objetivo));
    const id = setInterval(() => setTiempo(restante(objetivo)), 1000);
    return () => clearInterval(id);
  }, [objetivo]);

  return (
    <div className="contador" role="timer">
      {unidades.map(([clave, texto]) => (
        <div key={clave}>
          <strong>{tiempo ? String(tiempo[clave]).padStart(2, "0") : "--"}</strong>
          <span>{texto}</span>
        </div>
      ))}
    </div>
  );
}
