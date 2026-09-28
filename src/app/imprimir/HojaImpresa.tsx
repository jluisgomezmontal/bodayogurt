import QRCode from "qrcode";
import datos from "@data/invitacion.json";
import { visible, type Invitacion, type Lugar } from "@/types/invitacion";
import { Adorno } from "@/components/Decoracion";
import { Icono } from "@/components/Iconos";
import BotonImprimir from "@/components/BotonImprimir";
import { partesFecha } from "@/lib/fecha";
import "./imprimir.css";
import { VariantesLinks } from "./VariantesLinks";

const inv = datos as Invitacion;

export type VarianteImpresa = "clasica" | "floral";

/** Floritura dorada para las esquinas del marco (dibujada para la esquina superior izquierda). */
function Esquina({ className }: { className: string }) {
  return (
    <svg className={`esquina ${className}`} viewBox="0 0 60 60" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round">
        {/* las dos líneas continúan exactamente las del marco (exterior e interior) */}
        <path d="M7.7 60V24C7.7 15 15 7.7 24 7.7H60" />
        <path d="M14.4 60V28c0-7.7 6-13.6 13.6-13.6H60" strokeWidth=".6" />
        <path d="M24 7.7c0 9 7 16 16 16-6 0-10-4-10-9" />
        <path d="M7.7 24c9 0 16 7 16 16 0-6-4-10-9-10" />
      </g>
      <circle cx="23" cy="23" r="2.2" fill="currentColor" />
      <circle cx="34" cy="14" r="1" fill="currentColor" />
      <circle cx="14" cy="34" r="1" fill="currentColor" />
    </svg>
  );
}

function Ornamento() {
  return (
    <svg className="ornamento" viewBox="0 0 160 12" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth=".8" strokeLinecap="round">
        <path d="M2 6h58M100 6h58" />
        <path d="M60 6c6-6 12-6 14 0-2 5-7 4-7 1M100 6c-6-6-12-6-14 0 2 5 7 4 7 1" />
      </g>
      <path d="M80 1.5l4 4.5-4 4.5-4-4.5z" fill="currentColor" />
    </svg>
  );
}

function EventoImpreso({ datos, icono }: { datos: Lugar; icono: "iglesia" | "copas" }) {
  return (
    <div className="evento-impreso">
      <span className="evento-icono-impreso">
        <Icono nombre={icono} />
      </span>
      <p className="mayusculas">{datos.titulo}</p>
      <p className="hora-impresa">{datos.hora}</p>
      <p className="lugar-impreso">{datos.lugar}</p>
      <p className="direccion-impresa">{datos.direccion}</p>
    </div>
  );
}

function Tarjeta({ qr, variante }: { qr: string; variante: VarianteImpresa }) {
  const { novios, familia, ceremonia, recepcion, impresa } = inv;
  const fecha = partesFecha(inv.fecha);
  const nombres = (lista: string[]) => lista.join(" y ");

  return (
    <article className={`tarjeta-impresa ${variante}`}>
      <div className="marco" aria-hidden="true" />
      {variante === "clasica" && (
        <>
          <Esquina className="si" />
          <Esquina className="sd" />
          <Esquina className="ii" />
          <Esquina className="id" />
          <Adorno variante="rama" posicion="sup-izq" />
          <Adorno variante="rama" posicion="inf-der" />
        </>
      )}

      <div className="contenido-impreso">
        {impresa?.encabezado && <p className="mayusculas encabezado">{impresa.encabezado}</p>}
        <p className="fecha-impresa">{fecha.impresa}</p>
        <Ornamento />
        {impresa?.mensaje && <p className="mensaje-impreso">{impresa.mensaje}</p>}

        <h1 className="nombres-impresos">
          {novios.ella} <span>&</span> {novios.el}
        </h1>

        {visible(familia) && (
          <>
            <div className="dos-columnas padres-impresos">
              <div>
                <p className="pequeno">Hija de</p>
                <p className="caligrafia">{nombres(familia.padresNovia)}</p>
              </div>
              <span className="divisor" />
              <div>
                <p className="pequeno">Hijo de</p>
                <p className="caligrafia">{nombres(familia.padresNovio)}</p>
              </div>
            </div>

            {familia.padrinos.length > 0 && (
              <>
                <Ornamento />
                <p className="mayusculas">Nuestros padrinos</p>
                <div className="padrinos-impresos">
                  {familia.padrinos.map((p) => (
                    <div key={p.rol}>
                      <p className="rol-impreso">{p.rol}</p>
                      <p className="nombres-padrinos-impresos">{p.nombres}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}

        <Ornamento />
        <div className="dos-columnas">
          {visible(ceremonia) && <EventoImpreso datos={ceremonia} icono="iglesia" />}
          {visible(ceremonia) && visible(recepcion) && <span className="divisor" />}
          {visible(recepcion) && <EventoImpreso datos={recepcion} icono="copas" />}
        </div>

        {impresa?.versiculo && (
          <blockquote className="versiculo">
            “{impresa.versiculo.texto}”
            <cite>{impresa.versiculo.cita}</cite>
          </blockquote>
        )}

        {inv.sitio.url && (
          <div className="qr-impreso">
            <span className="qr" dangerouslySetInnerHTML={{ __html: qr }} />
            <p>
              {impresa?.textoQR}
              <br />
              <span className="url">{inv.sitio.url.replace(/^https?:\/\//, "")}</span>
            </p>
          </div>
        )}
      </div>
    </article>
  );
}

/** Hoja carta horizontal con dos invitaciones de media carta y marcas de corte al centro. */
export default async function HojaImpresa({ variante }: { variante: VarianteImpresa }) {
  const qr = inv.sitio.url
    ? await QRCode.toString(inv.sitio.url, {
        type: "svg",
        margin: 0,
        errorCorrectionLevel: "M",
        color: { dark: "#4A3322", light: "#0000" },
      })
    : "";

  return (
    <main className="impreso-pagina">
      <BotonImprimir />
      <VariantesLinks actual={variante} />
      <div className="hoja">
        <Tarjeta qr={qr} variante={variante} />
        <Tarjeta qr={qr} variante={variante} />
        <span className="corte" aria-hidden="true" />
      </div>
    </main>
  );
}
