async function obtenerPaginas() {
  try {
    const respuesta = await fetch("https://rickandmortyapi.com/api/character");
    if (!respuesta.ok) {
      throw new Error(`Error: ${respuesta.status}`);
    }
    const datos = await respuesta.json();
    const totalPaginas = datos.info.pages;
    return totalPaginas;
  } catch (error) {
    console.log(`Error ${error}`);
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
    console.error("Hubo un problema con la petición:", error);
  }
}

obtenerPersonajes(i).then((datos) => {
  console.log(datos);
  console.log("Pagina " + i);
});

module.exports = {obtenerPaginas, obtenerPersonajes}
