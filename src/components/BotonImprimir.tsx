"use client";

export default function BotonImprimir() {
  return (
    <div className="barra-impresion">
      <p>Hoja carta horizontal · 2 invitaciones de media carta · corta por la línea central</p>
      <button className="boton boton-lleno" onClick={() => window.print()}>
        Imprimir / Guardar PDF
      </button>
    </div>
  );
}
