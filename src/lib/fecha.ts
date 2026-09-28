/** Lee año/mes/día tal como vienen en el JSON, sin depender de la zona horaria del visitante. */
export function partesFecha(iso: string) {
  const [a, m, d] = iso.slice(0, 10).split("-").map(Number);
  const fecha = new Date(Date.UTC(a, m - 1, d));
  const formato = (opciones: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat("es-MX", { ...opciones, timeZone: "UTC" }).format(fecha);
  const larga = formato({ weekday: "long", day: "numeric", month: "long", year: "numeric" });
  const corta = [d, m, a].map((n) => String(n).padStart(2, "0")).join(" · ");
  // "31 de octubre, 2026"
  const impresa = `${formato({ day: "numeric", month: "long" })}, ${a}`;
  return { larga, corta, impresa };
}
