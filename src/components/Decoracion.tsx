"use client";

import { useEffect, useRef } from "react";
import { IconoHoja } from "./Iconos";

export function Separador() {
  return (
    <div className="separador" aria-hidden="true">
      <IconoHoja />
    </div>
  );
}

/** Recorte de las flores de la imagen de referencia en una esquina. */
export function Adorno({ posicion }: { posicion: "sup" | "inf" }) {
  return <div className={`adorno adorno-${posicion}`} aria-hidden="true" />;
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
