type Seccion = { mostrar?: boolean };

export type Lugar = Seccion & {
  titulo: string;
  lugar: string;
  hora: string;
  direccion: string;
  mapsUrl: string;
};

export type Icono =
  | "iglesia" | "anillos" | "copas" | "cena" | "musica" | "luna" | "foto" | "pastel"
  | "vela" | "arras" | "lazo" | "biblia" | "rosario" | "ramo" | "cojines";

export type Invitacion = {
  sitio: { url?: string; titulo: string; descripcion: string; imagenCompartir: string; icono: string };
  novios: { ella: string; el: string; iniciales: string };
  fecha: string;
  sobre?: Seccion & { texto: string; boton: string };
  portada: { frase: string; foto?: string };
  bienvenida?: Seccion & { titulo: string; mensaje: string };
  cuentaRegresiva?: Seccion & { titulo: string };
  pase?: Seccion & { titulo: string; personas: number; texto: string; nota?: string };
  ceremonia?: Lugar;
  recepcion?: Lugar;
  itinerario?: Seccion & { titulo: string; eventos: { hora: string; evento: string; icono: Icono }[] };
  familia?: Seccion & {
    titulo: string;
    padresNovia: string[];
    padresNovio: string[];
    tituloPadrinos?: string;
    padrinos: { rol: string; nombres: string; icono?: Icono }[];
  };
  vestimenta?: Seccion & {
    titulo: string;
    tipo: string;
    descripcion?: string;
    nota?: string;
    evitarColores?: { nombre: string; hex: string }[];
  };
  regalos?: Seccion & {
    titulo: string;
    mensaje: string;
    mesas?: { tienda: string; numero?: string; url?: string }[];
    cuenta?: Seccion & { banco: string; titular: string; clabe: string };
    lluviaDeSobres?: Seccion & { texto: string };
  };
  galeria?: Seccion & { titulo: string; fotos: string[] };
  musica?: Seccion & { archivo: string };
  agradecimiento?: Seccion & { mensaje: string; firma: string };
};

/** Una sección se muestra si existe y no tiene `mostrar: false`. */
export const visible = <T extends Seccion>(s?: T): s is T => !!s && s.mostrar !== false;
