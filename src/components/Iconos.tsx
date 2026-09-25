import type { Icono as NombreIcono } from "@/types/invitacion";

const trazo = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.3,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const rutas: Record<NombreIcono, React.ReactNode> = {
  iglesia: (
    <>
      <path d="M12 2v4M10 4h4" />
      <path d="M7 11l5-5 5 5v10H7z" />
      <path d="M3 21v-6l4-3M21 21v-6l-4-3M2 21h20" />
      <path d="M10.5 21v-4a1.5 1.5 0 0 1 3 0v4" />
    </>
  ),
  anillos: (
    <>
      <circle cx="9" cy="14" r="6" />
      <circle cx="15" cy="14" r="6" />
      <path d="M7.5 5.5L9 3.5l1.5 2L9 8z" />
    </>
  ),
  copas: (
    <>
      <path d="M5 3h5l-.5 5a2 2 0 0 1-4 0zM7.5 10v9M5 21h5" />
      <path d="M14 3h5l-.5 5a2 2 0 0 1-4 0zM16.5 10v9M14 21h5" />
      <path d="M11.5 5.5l1-1.5" />
    </>
  ),
  cena: (
    <>
      <circle cx="12" cy="13" r="6" />
      <circle cx="12" cy="13" r="3.5" />
      <path d="M3 4v5a1.5 1.5 0 0 0 3 0V4M4.5 10.5V21M21 4c-1.5 1-2 3-2 6h2v11" />
    </>
  ),
  musica: (
    <>
      <path d="M9 18V5l11-2v13" />
      <circle cx="6.5" cy="18" r="2.5" />
      <circle cx="17.5" cy="16" r="2.5" />
    </>
  ),
  luna: (
    <>
      <path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" />
      <path d="M17 3v3M15.5 4.5h3" />
    </>
  ),
  foto: (
    <>
      <rect x="3" y="6" width="18" height="14" rx="2" />
      <circle cx="12" cy="13" r="3.5" />
      <path d="M8 6l1.5-2h5L16 6" />
    </>
  ),
  pastel: (
    <>
      <path d="M4 21h16M5 21v-6h14v6M7 15v-4h10v4M12 11V8" />
      <path d="M12 5.5c.8.8.8 2.5 0 2.5s-.8-1.7 0-2.5z" />
    </>
  ),
  vela: (
    <>
      <path d="M9 10h6v11H9zM7 21h10M12 10V8" />
      <path d="M12 2.5c1.6 1.8 1.6 4 0 4.5-1.6-.5-1.6-2.7 0-4.5z" />
    </>
  ),
  arras: (
    <>
      <ellipse cx="12" cy="6" rx="7" ry="2.5" />
      <path d="M5 6v4c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5V6" />
      <path d="M5 10v4c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-4" />
      <path d="M5 14v4c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-4" />
    </>
  ),
  lazo: (
    <path d="M12 12c-2-3-4.5-4.5-6.5-4.5a4.5 4.5 0 0 0 0 9c2 0 4.5-1.5 6.5-4.5zm0 0c2 3 4.5 4.5 6.5 4.5a4.5 4.5 0 0 0 0-9c-2 0-4.5 1.5-6.5 4.5z" />
  ),
  biblia: (
    <>
      <path d="M5 20V5a2 2 0 0 1 2-2h12v15H7a2 2 0 0 0-2 2 2 2 0 0 0 2 2h12v-4" />
      <path d="M12 6v8M9.5 8.5h5" />
    </>
  ),
  rosario: (
    <>
      <circle cx="12" cy="8" r="5.5" strokeDasharray="0.1 2.6" strokeWidth="2.2" />
      <path d="M12 13.5v8M9.5 16.5h5" />
    </>
  ),
  ramo: (
    <>
      <circle cx="12" cy="5.5" r="2.5" />
      <circle cx="7.5" cy="8.5" r="2.5" />
      <circle cx="16.5" cy="8.5" r="2.5" />
      <path d="M8.5 11l3.5 5 3.5-5M12 8v8M10 16h4l-1 6h-2z" />
    </>
  ),
  cojines: (
    <>
      <path d="M4 7c3-2 13-2 16 0 1.5 3 1.5 7 0 10-3 2-13 2-16 0-1.5-3-1.5-7 0-10z" />
      <path d="M9 12h6" />
    </>
  ),
};

/** Ícono sugerido según el rol del padrino, si en el JSON no se indica uno. */
export function iconoPorRol(rol: string): NombreIcono {
  const r = rol.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  const reglas: [string, NombreIcono][] = [
    ["vela", "vela"],
    ["arras", "arras"],
    ["lazo", "lazo"],
    ["anillo", "anillos"],
    ["biblia", "biblia"],
    ["rosario", "rosario"],
    ["ramo", "ramo"],
    ["cojin", "cojines"],
    ["brindis", "copas"],
    ["copa", "copas"],
    ["pastel", "pastel"],
    ["musica", "musica"],
    ["foto", "foto"],
  ];
  return reglas.find(([clave]) => r.includes(clave))?.[1] ?? "anillos";
}

export function Icono({ nombre, className }: { nombre: NombreIcono; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" {...trazo}>
      {rutas[nombre] ?? rutas.anillos}
    </svg>
  );
}

export function IconoMapa() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...trazo}>
      <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  );
}

export function IconoFlecha() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...trazo}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

export function IconoCopiar() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...trazo}>
      <rect x="8" y="8" width="12" height="12" rx="2" />
      <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
    </svg>
  );
}

export function IconoRegalo() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...trazo}>
      <rect x="3" y="8" width="18" height="4" rx="1" />
      <path d="M5 12v9h14v-9M12 8v13" />
      <path d="M12 8C10 4 6.5 4 7 6.5 7.3 8 12 8 12 8zM12 8c2-4 5.5-4 5-1.5C16.7 8 12 8 12 8z" />
    </svg>
  );
}

export function IconoSobre() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...trazo}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}

/** Hoja dorada para los separadores. */
export function IconoHoja() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" fill="currentColor">
      <path d="M16 4c4 4 5 9 0 16-5-7-4-12 0-16z" opacity=".9" />
      <path d="M6 14c4 0 7 2 9 7-5 1-8-2-9-7z" opacity=".6" />
      <path d="M26 14c-4 0-7 2-9 7 5 1 8-2 9-7z" opacity=".6" />
      <path d="M16 20v9" stroke="currentColor" strokeWidth="1" fill="none" />
    </svg>
  );
}

export function IconoVestido() {
  return (
    <svg viewBox="0 0 30 50" aria-hidden="true" {...trazo}>
      <path d="M11 2v6M19 2v6M11 8h8l-1 8 9 32H3l9-32z" />
      <path d="M12 16h6" />
    </svg>
  );
}

export function IconoTraje() {
  return (
    <svg viewBox="0 0 30 50" aria-hidden="true" {...trazo}>
      <path d="M8 4l7 6 7-6 6 4v40H2V8z" />
      <path d="M15 10v38M8 4l3 14 4-8M22 4l-3 14-4-8" />
      <path d="M13.5 10l1.5 2 1.5-2" />
    </svg>
  );
}
