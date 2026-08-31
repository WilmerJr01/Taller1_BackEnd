async function normalizarPersonajes(dataPagina) {
  try {
    const personajes = dataPagina.map((personaje) => {
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

module.exports = {normalizarPersonajes}
