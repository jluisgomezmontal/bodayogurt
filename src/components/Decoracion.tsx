"use client";

import { useEffect, useId, useRef } from "react";
import { IconoHoja } from "./Iconos";

export function Separador() {
  return (
    <div className="separador" aria-hidden="true">
      <IconoHoja />
    </div>
  );
}

const HOJA = "M0 0C7-7.5 21-8 32 0C21 8 7 7.5 0 0Z";

// [x, y, rotación, escala, variante clara]
const hojas: [number, number, number, number, boolean][] = [
  [150, 44, 150, 1, false],
  [128, 66, 232, 1.05, true],
  [111, 90, 128, 1.05, false],
  [98, 116, 214, 0.95, false],
  [87, 142, 122, 0.9, true],
  [78, 166, 206, 0.8, false],
  [70, 188, 116, 0.7, false],
  [64, 204, 100, 0.55, true],
  [118, 50, 250, 0.7, false],
  [100, 58, 150, 0.6, true],
];

// Nubes de flores pequeñas (tipo nube / gypsophila): [x, y]
const florecitas: [number, number][] = [
  [98, 30], [92, 24], [104, 22], [88, 34], [99, 16], [110, 30], [84, 26],
  [62, 118], [56, 112], [68, 110], [52, 122], [60, 104], [72, 120],
  [140, 118], [146, 112], [134, 112], [150, 122], [142, 104],
];

/** Ramo floral dibujado (flor crema, hojas doradas y flores pequeñas) para las esquinas. */
export function Adorno({ posicion }: { posicion: "sup" | "inf" }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg className={`adorno adorno-${posicion}`} viewBox="0 0 200 240" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}o`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#D9B97A" />
          <stop offset=".55" stopColor="#B8935A" />
          <stop offset="1" stopColor="#8E6C3A" />
        </linearGradient>
        <linearGradient id={`${id}c`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F3E7D3" />
          <stop offset="1" stopColor="#D8C1A0" />
        </linearGradient>
        <radialGradient id={`${id}p`} cx=".5" cy=".9" r=".9">
          <stop offset="0" stopColor="#E9D7B9" />
          <stop offset=".6" stopColor="#F7F0E4" />
          <stop offset="1" stopColor="#FBF7F0" />
        </radialGradient>
      </defs>

      {/* tallos */}
      <g fill="none" stroke="#B08A52" strokeLinecap="round">
        <path d="M204 6C165 30 124 70 99 118 84 148 72 176 62 208" strokeWidth="1.4" />
        <path d="M140 52C120 44 102 44 84 54" strokeWidth="1" />
        <path d="M122 62C110 48 102 36 98 22" strokeWidth=".8" />
        <path d="M92 128C80 124 70 120 60 112" strokeWidth=".8" />
        <path d="M100 116C116 116 130 114 142 108" strokeWidth=".8" />
      </g>

      {/* hojas doradas */}
      {hojas.map(([x, y, r, s, clara], i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${r}) scale(${s * 1.3})`}>
          <path d={HOJA} fill={`url(#${id}${clara ? "c" : "o"})`} />
          <path d="M1 0H29" stroke={clara ? "#C8AE88" : "#8E6C3A"} strokeWidth=".6" opacity=".7" />
        </g>
      ))}

      {/* flores pequeñas */}
      <g fill="#E8D5B0" stroke="#C4A36E" strokeWidth=".5">
        {florecitas.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 2.6 : 2} />
        ))}
      </g>

      {/* flor principal (anémona crema) */}
      <g transform="translate(156 44)">
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <ellipse
            key={a}
            cx="0"
            cy="-15"
            rx="12"
            ry="17"
            transform={`rotate(${a})`}
            fill={`url(#${id}p)`}
            stroke="#D6BF9C"
            strokeWidth=".7"
          />
        ))}
        {[30, 90, 150, 210, 270, 330].map((a) => (
          <path key={a} d="M0-4Q1-14 0-22" transform={`rotate(${a})`} stroke="#DCC7A6" strokeWidth=".6" fill="none" />
        ))}
        <circle r="7" fill="#C9A66B" />
        <circle r="4" fill="#8E6C3A" />
        {Array.from({ length: 12 }, (_, i) => {
          const a = (i * Math.PI) / 6;
          return <circle key={i} cx={Math.cos(a) * 8.5} cy={Math.sin(a) * 8.5} r=".9" fill="#9C7A45" />;
        })}
      </g>

      {/* segunda flor */}
      <g transform="translate(172 104) scale(.55)">
        {[0, 72, 144, 216, 288].map((a) => (
          <ellipse key={a} cy="-15" rx="12" ry="17" transform={`rotate(${a})`} fill={`url(#${id}p)`} stroke="#D6BF9C" strokeWidth="1" />
        ))}
        <circle r="7" fill="#C9A66B" />
        <circle r="3.5" fill="#8E6C3A" />
      </g>

      {/* botón */}
      <g transform="translate(132 18) rotate(-30)">
        <ellipse rx="6" ry="9" fill={`url(#${id}p)`} stroke="#D6BF9C" strokeWidth=".7" />
        <path d="M-6 3Q0 12 6 3" fill={`url(#${id}o)`} />
      </g>

      {/* destellos dorados */}
      <g fill="#C9A66B" opacity=".7">
        <circle cx="120" cy="10" r="1.3" />
        <circle cx="76" cy="80" r="1.6" />
        <circle cx="64" cy="70" r=".9" />
        <circle cx="46" cy="150" r="1.2" />
        <circle cx="160" cy="92" r="1.4" />
        <circle cx="178" cy="120" r="1" />
      </g>
    </svg>
  );
}

/** Aparece suavemente cuando entra en pantalla. */
export function Reveal({ children, className = "", as: Tag = "div" }: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section";
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          el.classList.add("visible");
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <Tag ref={ref as React.RefObject<HTMLDivElement>} className={`reveal ${className}`}>
      {children}
    </Tag>
  );
}
