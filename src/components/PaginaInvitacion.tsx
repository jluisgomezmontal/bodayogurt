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
import { partesFecha } from "@/lib/fecha";
import CuentaRegresiva from "@/components/CuentaRegresiva";
import Galeria from "@/components/Galeria";
import BotonCopiar from "@/components/BotonCopiar";

const inv = datos as Invitacion;

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

/**
 * Contenido completo de la invitación.
 * `personas`: número de personas del pase; si no se indica, la invitación se muestra sin pase.
 */
export default function PaginaInvitacion({ personas }: { personas?: number }) {
  const { novios, portada, bienvenida, cuentaRegresiva, pase, ceremonia, recepcion, itinerario, familia, vestimenta, regalos, galeria, agradecimiento } = inv;
  const fecha = partesFecha(inv.fecha);
  // Si solo hay lluvia de sobres, la sección se muestra como un bloque sencillo en lugar de tarjetas
  const soloSobres =
    visible(regalos) && visible(regalos.lluviaDeSobres) && !visible(regalos.mesas) && !visible(regalos.cuenta);

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
      {visible(pase) && personas !== undefined && (
        <Reveal as="section" className="seccion">
          <div className="pase">
            <span className="pase-liston">{pase.titulo}</span>
            <p className="parrafo">{pase.texto}</p>
            <p className="pase-numero">{personas}</p>
            <p className="pase-personas">{personas === 1 ? "persona" : "personas"}</p>
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
          {itinerario.etiqueta && <p className="etiqueta">{itinerario.etiqueta}</p>}
          <h2 className="titulo-script">{itinerario.titulo}</h2>
          {itinerario.subtitulo && <p className="subtitulo">{itinerario.subtitulo}</p>}
          <ol className="itinerario">
            {itinerario.eventos.map((e, i) => (
              <li key={e.hora + e.evento} style={{ "--i": i } as React.CSSProperties}>
                <div className="contenido">
                  <Icono nombre={e.icono} className="icono" />
                  <span className="nombre">{e.evento}</span>
                  <span className="hora">{e.hora}</span>
                  {e.detalle && <span className="detalle">{e.detalle}</span>}
                </div>
                <span className="punto" />
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
              {/* Cada bloque se anima por separado al entrar en pantalla */}
              <Reveal className="sin-mov padrinos-encabezado">
                <h3 className="titulo-script titulo-padrinos">{familia.tituloPadrinos}</h3>
                <span className="linea-padrinos" aria-hidden="true">
                  <i />
                </span>
              </Reveal>
              <div className="padrinos">
                {familia.padrinos.map((p) => (
                  <Reveal key={p.rol} className="sin-mov padrino">
                    <span className="padrino-icono">
                      <svg className="aro" viewBox="0 0 48 48" aria-hidden="true">
                        <circle cx="24" cy="24" r="23" pathLength={1} />
                      </svg>
                      <Icono nombre={p.icono ?? iconoPorRol(p.rol)} />
                    </span>
                    <p className="etiqueta">{p.rol}</p>
                    <p className="nombres-padrino">{p.nombres}</p>
                  </Reveal>
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
          {/* orden: mensaje → Mesa de Regalos → lluvia de sobres */}
          <p className="parrafo mensaje-regalos">{regalos.mensaje}</p>
          <div className="icono-regalos">
            <IconoRegalo />
          </div>
          <h2 className="titulo-script">{regalos.titulo}</h2>
          {soloSobres ? (
            <Reveal className="sin-mov lluvia">
              <LluviaSobres />
              <span className="icono-sobres">
                <IconoSobre />
              </span>
              <h3 className="subtitulo-sobres">{regalos.lluviaDeSobres?.titulo ?? "Lluvia de sobres"}</h3>
              <p className="nota-sobres">{regalos.lluviaDeSobres?.texto}</p>
            </Reveal>
          ) : (
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
                <h3>{regalos.lluviaDeSobres.titulo ?? "Lluvia de sobres"}</h3>
                <p style={{ margin: 0 }}>{regalos.lluviaDeSobres.texto}</p>
              </div>
            )}
          </div>
          )}
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

// Sobres que caen: [posición horizontal %, retraso s, duración s, tamaño, giro°, deriva px]
const sobresCayendo: [number, number, number, number, number, number][] = [
  [8, 0, 7.5, 0.9, -18, 14],
  [22, 2.6, 8.5, 0.7, 12, -10],
  [36, 1.2, 7, 1, -8, 12],
  [52, 3.8, 9, 0.75, 20, -14],
  [66, 0.6, 7.8, 0.95, -14, 10],
  [80, 2.2, 8.2, 0.8, 16, -12],
  [92, 4.4, 7.2, 0.7, -20, 8],
  [45, 5.4, 8.8, 0.65, 10, -8],
];

function LluviaSobres() {
  return (
    <div className="lluvia-sobres" aria-hidden="true">
      {sobresCayendo.map(([x, d, t, s, r, dx], i) => (
        <span
          key={i}
          style={
            { left: `${x}%`, "--d": `${d}s`, "--t": `${t}s`, "--s": s, "--r": `${r}deg`, "--dx": `${dx}px` } as React.CSSProperties
          }
        >
          <IconoSobre />
        </span>
      ))}
    </div>
  );
}

function IconoSobreGrande() {
  return (
    <div className="evento-icono" style={{ width: 34, height: 34, marginBottom: 6 }}>
      <IconoSobre />
    </div>
  );
}
