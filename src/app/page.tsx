import datos from "@data/invitacion.json";
import { visible, type Invitacion, type Lugar } from "@/types/invitacion";
import { Adorno, Reveal, Separador, type PosicionAdorno, type VarianteAdorno } from "@/components/Decoracion";
import {
  Icono,
  IconoFlecha,
  IconoMapa,
  IconoRegalo,
  IconoSobre,
  IconoTraje,
  IconoVestido,
  iconoPorRol,
} from "@/components/Iconos";
import SobreMusica from "@/components/SobreMusica";
import CuentaRegresiva from "@/components/CuentaRegresiva";
import Galeria from "@/components/Galeria";
import BotonCopiar from "@/components/BotonCopiar";

const inv = datos as Invitacion;

/** Lee año/mes/día tal como vienen en el JSON, sin depender de la zona horaria del visitante. */
function partesFecha(iso: string) {
  const [a, m, d] = iso.slice(0, 10).split("-").map(Number);
  const fecha = new Date(Date.UTC(a, m - 1, d));
  const larga = new Intl.DateTimeFormat("es-MX", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(fecha);
  const corta = [d, m, a].map((n) => String(n).padStart(2, "0")).join(" · ");
  return { larga, corta };
}

function Evento({ datos, icono, adorno }: {
  datos: Lugar;
  icono: "iglesia" | "copas";
  adorno?: [VarianteAdorno, PosicionAdorno];
}) {
  return (
    <Reveal as="section" className="seccion">
      {adorno && <Adorno variante={adorno[0]} posicion={adorno[1]} />}
      <Icono nombre={icono} className="evento-icono" />
      <p className="etiqueta">{datos.titulo}</p>
      <p className="evento-hora">{datos.hora}</p>
      <p className="evento-lugar">{datos.lugar}</p>
      <p className="evento-direccion">{datos.direccion}</p>
      <a className="boton" href={datos.mapsUrl} target="_blank" rel="noopener noreferrer">
        <IconoMapa /> Cómo llegar
      </a>
    </Reveal>
  );
}

export default function Pagina() {
  const { novios, portada, bienvenida, cuentaRegresiva, pase, ceremonia, recepcion, itinerario, familia, vestimenta, regalos, galeria, agradecimiento } = inv;
  const fecha = partesFecha(inv.fecha);

  return (
    <main className="invitacion">
      <SobreMusica sobre={inv.sobre} musica={inv.musica} novios={novios} />

      {/* Portada */}
      <header className="portada">
        <div className="portada-contenido">
          <div className="monograma">{novios.iniciales}</div>
          <p className="etiqueta">{portada.frase}</p>
          <h1 className="nombres">
            <span>{novios.ella}</span>
            <span className="y">&</span>
            <span>{novios.el}</span>
          </h1>
          <p className="fecha-portada">{fecha.corta}</p>
        </div>
        <a href="#bienvenida" className="scroll-indicador" aria-label="Ver más">
          <IconoFlecha />
        </a>
      </header>

      {/* Bienvenida */}
      {visible(bienvenida) && (
        <Reveal as="section" className="seccion">
          <span id="bienvenida" />
          <h2 className="titulo-script">{bienvenida.titulo}</h2>
          <p className="parrafo">{bienvenida.mensaje}</p>
          {portada.foto && (
            <div className="foto-arco">
              <img src={portada.foto} alt={`${novios.ella} y ${novios.el}`} />
            </div>
          )}
        </Reveal>
      )}

      {/* Cuenta regresiva */}
      {visible(cuentaRegresiva) && (
        <Reveal as="section" className="seccion">
          <Adorno variante="ramo" posicion="sup-der" />
          <p className="etiqueta">{cuentaRegresiva.titulo}</p>
          <CuentaRegresiva fecha={inv.fecha} />
          <p className="fecha-larga">{fecha.larga}</p>
        </Reveal>
      )}

      {/* Pase */}
      {visible(pase) && (
        <Reveal as="section" className="seccion">
          <div className="pase">
            <span className="pase-liston">{pase.titulo}</span>
            <p className="parrafo">{pase.texto}</p>
            <p className="pase-numero">{pase.personas}</p>
            <p className="pase-personas">{pase.personas === 1 ? "persona" : "personas"}</p>
            {pase.nota && <p className="pase-nota">{pase.nota}</p>}
          </div>
        </Reveal>
      )}

      <Separador />

      {visible(ceremonia) && <Evento datos={ceremonia} icono="iglesia" adorno={["rama", "sup-izq"]} />}
      {visible(ceremonia) && visible(recepcion) && <Separador />}
      {visible(recepcion) && <Evento datos={recepcion} icono="copas" />}

      {/* Itinerario */}
      {visible(itinerario) && (
        <Reveal as="section" className="seccion">
          <Adorno variante="nube" posicion="sup-der" />
          <h2 className="titulo-script">{itinerario.titulo}</h2>
          <ol className="linea-tiempo">
            {itinerario.eventos.map((e) => (
              <li key={e.hora + e.evento}>
                <span className="hora">{e.hora}</span>
                <span className="punto">
                  <Icono nombre={e.icono} />
                </span>
                <span className="nombre">{e.evento}</span>
              </li>
            ))}
          </ol>
        </Reveal>
      )}

      {/* Padres y padrinos */}
      {visible(familia) && (
        <Reveal as="section" className="seccion">
          <Adorno variante="flor" posicion="inf-izq" />
          <h2 className="titulo">{familia.titulo}</h2>
          <Separador />
          <div className="familia-grupo">
            <p className="etiqueta">Padres de la novia</p>
            {familia.padresNovia.map((n) => <p key={n}>{n}</p>)}
          </div>
          <div className="familia-grupo">
            <p className="etiqueta">Padres del novio</p>
            {familia.padresNovio.map((n) => <p key={n}>{n}</p>)}
          </div>
          {familia.padrinos.length > 0 && (
            <>
              <h3 className="titulo-script" style={{ marginTop: 44 }}>{familia.tituloPadrinos}</h3>
              <div className="padrinos">
                {familia.padrinos.map((p) => (
                  <div key={p.rol}>
                    <span className="padrino-icono">
                      <Icono nombre={p.icono ?? iconoPorRol(p.rol)} />
                    </span>
                    <p className="etiqueta">{p.rol}</p>
                    <p>{p.nombres}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </Reveal>
      )}

      {/* Código de vestimenta */}
      {visible(vestimenta) && (
        <Reveal as="section" className="seccion">
          <Adorno variante="rama" posicion="inf-der" />
          <p className="etiqueta">{vestimenta.titulo}</p>
          <p className="vestimenta-tipo">{vestimenta.tipo}</p>
          <div className="vestimenta-figuras">
            <IconoVestido />
            <IconoTraje />
          </div>
          {vestimenta.descripcion && <p className="parrafo">{vestimenta.descripcion}</p>}
          {vestimenta.evitarColores && vestimenta.evitarColores.length > 0 && (
            <>
              <p style={{ fontSize: "0.85rem", marginTop: 22 }}>{vestimenta.nota}</p>
              <div className="colores">
                {vestimenta.evitarColores.map((c) => (
                  <div key={c.nombre}>
                    <span style={{ background: c.hex }} />
                    {c.nombre}
                  </div>
                ))}
              </div>
            </>
          )}
        </Reveal>
      )}

      {/* Regalos */}
      {visible(regalos) && (
        <Reveal as="section" className="seccion">
          <Icono nombre="anillos" className="evento-icono" />
          <h2 className="titulo-script">{regalos.titulo}</h2>
          <p className="parrafo">{regalos.mensaje}</p>
          <div className="regalos-lista">
            {visible(regalos.mesas) && regalos.mesas.lista.map((m) => (
              <div className="tarjeta" key={m.tienda}>
                <h3>{m.tienda}</h3>
                {m.numero && <p>Evento: <span className="dato">{m.numero}</span></p>}
                {m.url && (
                  <a className="boton" href={m.url} target="_blank" rel="noopener noreferrer">
                    <IconoRegalo /> Ver mesa
                  </a>
                )}
              </div>
            ))}
            {visible(regalos.cuenta) && (
              <div className="tarjeta">
                <h3>Transferencia</h3>
                <p>
                  {regalos.cuenta.banco} · {regalos.cuenta.titular}
                  <br />
                  <span className="dato">CLABE {regalos.cuenta.clabe}</span>
                </p>
                <BotonCopiar texto={regalos.cuenta.clabe} />
              </div>
            )}
            {visible(regalos.lluviaDeSobres) && (
              <div className="tarjeta">
                <IconoSobreGrande />
                <h3>Lluvia de sobres</h3>
                <p style={{ margin: 0 }}>{regalos.lluviaDeSobres.texto}</p>
              </div>
            )}
          </div>
        </Reveal>
      )}

      {/* Galería */}
      {visible(galeria) && galeria.fotos.length > 0 && (
        <Reveal as="section" className="seccion">
          <h2 className="titulo-script">{galeria.titulo}</h2>
          <Galeria fotos={galeria.fotos} />
        </Reveal>
      )}

      {/* Agradecimiento */}
      {visible(agradecimiento) && (
        <section className="seccion agradecimiento">
          <Reveal>
            <Separador />
            <p className="parrafo">{agradecimiento.mensaje}</p>
            <p className="firma">{agradecimiento.firma}</p>
          </Reveal>
        </section>
      )}
    </main>
  );
}

function IconoSobreGrande() {
  return (
    <div className="evento-icono" style={{ width: 34, height: 34, marginBottom: 6 }}>
      <IconoSobre />
    </div>
  );
}
