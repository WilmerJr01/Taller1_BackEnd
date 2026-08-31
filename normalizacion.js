async function obtenerPaginas() {
  try {
    const respuesta = await fetch("https://rickandmortyapi.com/api/character");
    if (!respuesta.ok) {
      throw new Error(`Error: ${respuesta.status}`);
    }

    const datos = await respuesta.json();
    return datos.info.pages;
  } catch (error) {
    console.error("Error al obtener el total de páginas:", error);
    return 0;
  }
}

async function obtenerPersonajes(numeroPagina) {
  try {
    const pagina = await fetch(
      `https://rickandmortyapi.com/api/character?page=${numeroPagina}`,
    );

    if (!pagina.ok) {
      throw new Error(`error:${pagina.status}`);
    }

    const datosPagina = await pagina.json();
    const personajes = datosPagina.results.map((personaje) => ({
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
    }));

    return personajes;
  } catch (error) {
    console.error("Hubo un problema con la petición:", error);
    return [];
  }
}

async function obtenerTodosLosPersonajes() {
  const totalPaginas = await obtenerPaginas();
  const personajes = [];

  for (let pagina = 1; pagina <= totalPaginas; pagina += 1) {
    const personajesPagina = await obtenerPersonajes(pagina);
    personajes.push(...personajesPagina);
  }

  return personajes;
}

module.exports = {
  obtenerPaginas,
  obtenerPersonajes,
  obtenerTodosLosPersonajes,
};
