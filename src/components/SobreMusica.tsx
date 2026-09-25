"use client";

import { useEffect, useRef, useState } from "react";
import type { Invitacion } from "@/types/invitacion";
import { visible } from "@/types/invitacion";

type Props = Pick<Invitacion, "sobre" | "musica" | "novios">;

/**
 * Pantalla de "Abrir invitación" + botón flotante de música.
 * El sobre existe porque los navegadores bloquean el audio hasta que la persona toca la pantalla.
 */
export default function SobreMusica({ sobre, musica, novios }: Props) {
  const conSobre = visible(sobre);
  const conMusica = visible(musica);
  const audio = useRef<HTMLAudioElement>(null);
  const [abierto, setAbierto] = useState(!conSobre);
  const [sonando, setSonando] = useState(false);
  const [audioOk, setAudioOk] = useState(true);

  useEffect(() => {
    document.body.classList.toggle("bloqueado", !abierto);
  }, [abierto]);

  const reproducir = () => {
    audio.current
      ?.play()
      .then(() => setSonando(true))
      .catch(() => setSonando(false));
  };

  const abrir = () => {
    setAbierto(true);
    if (conMusica) reproducir();
  };

  const alternar = () => {
    if (!audio.current) return;
    if (sonando) {
      audio.current.pause();
      setSonando(false);
    } else {
      reproducir();
    }
  };

  return (
    <>
      {conSobre && (
        <div className={`sobre ${abierto ? "abierto" : ""}`} aria-hidden={abierto}>
          <div className="sello">{novios.iniciales.replace(/\s/g, "")}</div>
          <p className="etiqueta">{novios.ella} & {novios.el}</p>
          <p className="sobre-texto">{sobre.texto}</p>
          <button className="boton boton-lleno" onClick={abrir}>
            {sobre.boton}
          </button>
        </div>
      )}

      {conMusica && audioOk && (
        <>
          <audio ref={audio} src={musica.archivo} loop preload="none" onError={() => setAudioOk(false)} />
          <button
            className={`musica ${sonando ? "sonando" : ""}`}
            onClick={alternar}
            aria-label={sonando ? "Pausar música" : "Reproducir música"}
          >
            {sonando ? (
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <rect x="6" y="5" width="4" height="14" rx="1" />
                <rect x="14" y="5" width="4" height="14" rx="1" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M8 5.5v13a1 1 0 0 0 1.5.9l10-6.5a1 1 0 0 0 0-1.7l-10-6.6A1 1 0 0 0 8 5.5z" />
              </svg>
            )}
          </button>
        </>
      )}
    </>
  );
}
