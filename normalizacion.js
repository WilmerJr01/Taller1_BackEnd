async function obtenerPersonajes(dataPagina) {
  try {
    const datosPagina = await dataPagina.json();
    const personajes = datosPagina.results.map((personaje) => {
      return {
        id: personaje.id,
        nombre: personaje.name,
        estado: personaje.status,
        especie: personaje.species,
        tipo: personaje.type,
        genero: personaje.gender,
        origen: personaje.origin,
        ubicacionActual: personaje.location,
        cantidadEpisodios: personaje.episode.length,
        imagen: personaje.image,
      };
    });
    return personajes;
  } catch (error) {
    console.error("Error:", error);
  }
}

async function obtenerTodosPersonajes(numeroPaginas = 5) {
  const totalPaginas = await obtenerPaginas();
  let personajesTotales = [];
  for (let i = 1; i <= totalPaginas; i += numeroPaginas) {
    let lote = [];
    for (let j = i; j < i + numeroPaginas && j <= totalPaginas; j++) {
      lote.push(obtenerPersonajes(j));
    }
    const personajesLote = await Promise.all(lote)
    personajesTotales = personajesTotales.concat(...personajesLote);

    await new Promise((r) => setTimeout(r, 2000));
  }
  return personajesTotales;
}

module.exports = {obtenerPersonajes, obtenerTodosPersonajes}
