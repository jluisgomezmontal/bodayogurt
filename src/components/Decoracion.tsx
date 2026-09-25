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

/* ------------------------------------------------------------------ */
/*  Adornos florales en SVG                                            */
/*  Todos se dibujan colgando de la esquina superior derecha           */
/*  (viewBox 200x240); las otras esquinas se obtienen reflejando.      */
/* ------------------------------------------------------------------ */

export type VarianteAdorno = "ramo" | "rama" | "nube" | "flor";
export type PosicionAdorno = "sup-der" | "sup-izq" | "inf-der" | "inf-izq";

type Punto = [number, number];

// Redondeo a 2 decimales: servidor y navegador difieren en el último decimal de sin/cos.
const r2 = (n: number) => Math.round(n * 100) / 100;

/** Punto y ángulo (grados) sobre una curva Bézier cúbica. */
function enCurva([p0, p1, p2, p3]: Punto[], t: number) {
  const u = 1 - t;
  const x = u ** 3 * p0[0] + 3 * u * u * t * p1[0] + 3 * u * t * t * p2[0] + t ** 3 * p3[0];
  const y = u ** 3 * p0[1] + 3 * u * u * t * p1[1] + 3 * u * t * t * p2[1] + t ** 3 * p3[1];
  const dx = 3 * u * u * (p1[0] - p0[0]) + 6 * u * t * (p2[0] - p1[0]) + 3 * t * t * (p3[0] - p2[0]);
  const dy = 3 * u * u * (p1[1] - p0[1]) + 6 * u * t * (p2[1] - p1[1]) + 3 * t * t * (p3[1] - p2[1]);
  return { x: r2(x), y: r2(y), a: r2((Math.atan2(dy, dx) * 180) / Math.PI) };
}

const ruta = ([p0, p1, p2, p3]: Punto[]) => `M${p0}C${p1} ${p2} ${p3}`;

const HOJA = "M0 0C7-7.5 21-8 32 0C21 8 7 7.5 0 0Z";
const HOJA_REDONDA = "M0 0C3-10 17-12 22 0C17 12 3 10 0 0Z";
const HOJA_LARGA = "M0 0C12-9 38-9 56 0C38 8 12 8 0 0Z";

type Gradientes = { oro: string; crema: string; petalo: string };

function Defs({ id }: { id: string }) {
  return (
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
  );
}

function Hoja({ x, y, a, s, clara, forma = HOJA, g }: {
  x: number; y: number; a: number; s: number; clara?: boolean; forma?: string; g: Gradientes;
}) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${a}) scale(${s})`}>
      <path d={forma} fill={clara ? g.crema : g.oro} />
      <path d="M1 0H20" stroke={clara ? "#C8AE88" : "#8E6C3A"} strokeWidth=".6" opacity=".6" />
    </g>
  );
}

/** Anémona crema con centro dorado. */
function Flor({ x, y, s = 1, petalos = 6, g }: { x: number; y: number; s?: number; petalos?: number; g: Gradientes }) {
  const paso = 360 / petalos;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {Array.from({ length: petalos }, (_, i) => (
        <ellipse key={i} cy="-15" rx="12" ry="17" transform={`rotate(${i * paso})`} fill={g.petalo} stroke="#D6BF9C" strokeWidth=".7" />
      ))}
      {Array.from({ length: petalos }, (_, i) => (
        <path key={i} d="M0-4Q1-14 0-22" transform={`rotate(${i * paso + paso / 2})`} stroke="#DCC7A6" strokeWidth=".6" fill="none" />
      ))}
      <circle r="7" fill="#C9A66B" />
      <circle r="4" fill="#8E6C3A" />
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i * Math.PI) / 6;
        return <circle key={i} cx={r2(Math.cos(a) * 8.5)} cy={r2(Math.sin(a) * 8.5)} r=".9" fill="#9C7A45" />;
      })}
    </g>
  );
}

function Boton({ x, y, a, g }: { x: number; y: number; a: number; g: Gradientes }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${a})`}>
      <ellipse rx="6" ry="9" fill={g.petalo} stroke="#D6BF9C" strokeWidth=".7" />
      <path d="M-6 3Q0 12 6 3" fill={g.oro} />
    </g>
  );
}

/** Racimo de florecitas tipo nube (gypsophila). */
function Racimo({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  const puntos: Punto[] = [[0, 0], [-6, -4], [5, -5], [-3, 6], [6, 4], [-9, 3], [1, -10], [9, -2]];
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {puntos.map(([px, py], i) => (
        <g key={i}>
          <circle cx={px} cy={py} r={i % 3 ? 2 : 2.6} fill="#F0E4CE" stroke="#C4A36E" strokeWidth=".5" />
          <circle cx={px} cy={py} r=".7" fill="#B8935A" />
        </g>
      ))}
    </g>
  );
}

function Destellos({ puntos }: { puntos: [number, number, number][] }) {
  return (
    <g fill="#C9A66B" opacity=".7">
      {puntos.map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} />
      ))}
    </g>
  );
}

/* ---------- Variante 1: ramo (flor grande, hojas y nubes) ---------- */
const ramoHojas: [number, number, number, number, boolean][] = [
  [150, 44, 150, 1, false], [128, 66, 232, 1.05, true], [111, 90, 128, 1.05, false],
  [98, 116, 214, 0.95, false], [87, 142, 122, 0.9, true], [78, 166, 206, 0.8, false],
  [70, 188, 116, 0.7, false], [64, 204, 100, 0.55, true], [118, 50, 250, 0.7, false],
  [100, 58, 150, 0.6, true],
];

function Ramo({ g }: { g: Gradientes }) {
  return (
    <>
      <g className="tallos" fill="none" stroke="#B08A52" strokeLinecap="round">
        <path pathLength={1} d="M204 6C165 30 124 70 99 118 84 148 72 176 62 208" strokeWidth="1.4" />
        <path pathLength={1} d="M140 52C120 44 102 44 84 54" strokeWidth="1" />
        <path pathLength={1} d="M122 62C110 48 102 36 98 22" strokeWidth=".8" />
        <path pathLength={1} d="M92 128C80 124 70 120 60 112" strokeWidth=".8" />
        <path pathLength={1} d="M100 116C116 116 130 114 142 108" strokeWidth=".8" />
      </g>
      <g className="brotes">
        {ramoHojas.map(([x, y, a, s, clara], i) => (
          <Hoja key={i} x={x} y={y} a={a} s={s * 1.3} clara={clara} g={g} />
        ))}
        <Racimo x={97} y={26} />
        <Racimo x={62} y={114} s={0.9} />
        <Racimo x={142} y={114} s={0.9} />
        <Flor x={156} y={44} g={g} />
        <Flor x={172} y={104} s={0.55} petalos={5} g={g} />
        <Boton x={132} y={18} a={-30} g={g} />
        <Destellos puntos={[[120, 10, 1.3], [76, 80, 1.6], [64, 70, 0.9], [46, 150, 1.2], [160, 92, 1.4], [178, 120, 1]]} />
      </g>
    </>
  );
}

/* ---------- Variante 2: rama de eucalipto dorado ---------- */
const ramaTallo: Punto[] = [[204, 2], [160, 22], [112, 80], [96, 200]];
const ramaSecundaria: Punto[] = [[158, 34], [136, 32], [112, 38], [84, 58]];

function Rama({ g }: { g: Gradientes }) {
  const hojas = Array.from({ length: 10 }, (_, i) => {
    const t = 0.2 + i * 0.085;
    const { x, y, a } = enCurva(ramaTallo, t);
    const lado = i % 2 ? 1 : -1;
    return { x, y, a: a + lado * 58, s: r2(1.25 - i * 0.055), clara: i % 3 === 1 };
  });
  const hojasSec = [0.35, 0.6, 0.85].map((t, i) => {
    const { x, y, a } = enCurva(ramaSecundaria, t);
    return { x, y, a: a + (i % 2 ? 55 : -55), s: 0.8 - i * 0.1, clara: i === 1 };
  });
  const punta = enCurva(ramaTallo, 1);
  return (
    <>
      <g className="tallos" fill="none" stroke="#B08A52" strokeLinecap="round">
        <path pathLength={1} d={ruta(ramaTallo)} strokeWidth="1.3" />
        <path pathLength={1} d={ruta(ramaSecundaria)} strokeWidth=".9" />
      </g>
      <g className="brotes">
        {[...hojas, ...hojasSec].map((h, i) => (
          <Hoja key={i} {...h} forma={HOJA_REDONDA} g={g} />
        ))}
        <Hoja x={punta.x} y={punta.y} a={punta.a} s={0.7} forma={HOJA_REDONDA} g={g} />
        <Destellos puntos={[[70, 70, 1.3], [130, 120, 1.1], [80, 140, 0.9], [176, 40, 1.2]]} />
      </g>
    </>
  );
}

/* ---------- Variante 3: nube de florecitas ---------- */
const nubeTallos: { c: Punto[]; s: number }[] = [
  { c: [[204, 0], [180, 20], [150, 30], [118, 34]], s: 1 },
  { c: [[204, 0], [176, 34], [150, 70], [128, 100]], s: 1.1 },
  { c: [[204, 0], [190, 40], [176, 90], [168, 140]], s: 0.95 },
  { c: [[170, 26], [150, 50], [120, 62], [96, 70]], s: 0.85 },
  { c: [[160, 66], [150, 100], [138, 130], [120, 160]], s: 0.8 },
];

function Nube({ g }: { g: Gradientes }) {
  const hojas = [
    { ...enCurva(nubeTallos[1].c, 0.45), lado: 60 },
    { ...enCurva(nubeTallos[2].c, 0.55), lado: -60 },
    { ...enCurva(nubeTallos[0].c, 0.5), lado: -55 },
  ];
  return (
    <>
      <g className="tallos" fill="none" stroke="#B08A52" strokeLinecap="round" strokeWidth="1">
        {nubeTallos.map((t, i) => (
          <path key={i} pathLength={1} d={ruta(t.c)} />
        ))}
      </g>
      <g className="brotes">
        {hojas.map((h, i) => (
          <Hoja key={i} x={h.x} y={h.y} a={h.a + h.lado} s={1.2} clara={i === 1} g={g} />
        ))}
        {nubeTallos.map((t, i) => {
          const fin = t.c[3];
          const medio = enCurva(t.c, 0.7);
          return (
            <g key={i}>
              <Racimo x={fin[0]} y={fin[1]} s={t.s * 1.35} />
              <Racimo x={medio.x} y={medio.y} s={t.s * 0.8} />
            </g>
          );
        })}
        <Boton x={112} y={36} a={-70} g={g} />
        <Destellos puntos={[[100, 110, 1.2], [150, 170, 1], [84, 48, 1.4], [186, 170, 0.9]]} />
      </g>
    </>
  );
}

/* ---------- Variante 4: flor abierta con hojas largas ---------- */
const florTallo: Punto[] = [[204, 30], [180, 50], [150, 60], [128, 92]];

function FlorSola({ g }: { g: Gradientes }) {
  const hojas = [
    { x: 150, y: 70, a: 150, s: 1.1, clara: false },
    { x: 150, y: 70, a: 205, s: 0.9, clara: true },
    { x: 186, y: 44, a: 110, s: 0.75, clara: false },
  ];
  return (
    <>
      <g className="tallos" fill="none" stroke="#B08A52" strokeLinecap="round">
        <path pathLength={1} d={ruta(florTallo)} strokeWidth="1.2" />
        <path pathLength={1} d="M186 44C176 30 160 22 142 22" strokeWidth=".8" />
      </g>
      <g className="brotes">
        {hojas.map((h, i) => (
          <Hoja key={i} {...h} forma={HOJA_LARGA} g={g} />
        ))}
        <Flor x={124} y={100} s={1.4} petalos={7} g={g} />
        <Boton x={140} y={22} a={-80} g={g} />
        <Racimo x={162} y={32} s={0.9} />
        <Destellos puntos={[[92, 150, 1.3], [160, 130, 1], [100, 60, 1.1], [180, 90, 0.9]]} />
      </g>
    </>
  );
}

const variantes = { ramo: Ramo, rama: Rama, nube: Nube, flor: FlorSola };

/** Adorno floral en una esquina de la sección. Se anima al aparecer en pantalla (ver .reveal en CSS). */
export function Adorno({ variante = "ramo", posicion = "sup-der" }: {
  variante?: VarianteAdorno;
  posicion?: PosicionAdorno;
}) {
  const id = useId().replace(/:/g, "");
  const g: Gradientes = { oro: `url(#${id}o)`, crema: `url(#${id}c)`, petalo: `url(#${id}p)` };
  const Dibujo = variantes[variante];
  return (
    <div className={`adorno ${posicion} ${variante}`} aria-hidden="true">
      <svg viewBox="0 0 200 240">
        <Defs id={id} />
        <g className="mecer">
          <Dibujo g={g} />
        </g>
      </svg>
    </div>
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
