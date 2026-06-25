export const formatearFecha = (fecha: string) => {
  const [anio, mes, dia] = fecha.split("-");
  const anioCorto = anio.slice(-2); 

  return `${dia}-${mes}-${anioCorto}`;
}