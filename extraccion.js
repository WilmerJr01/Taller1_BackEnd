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

async function obtenerInfoPagina(numeroPagina) {
  try {
    const respuesta = await fetch(`https://rickandmortyapi.com/api/character?page=${numeroPagina}`);
    if (!respuesta.ok) {
      throw new Error(`Error: ${respuesta.status}`);
    }
    const datos = await respuesta.json();
    return datos;
  } catch (error) {
    console.log(`Error ${error}`)
  }
}

module.exports = {obtenerPaginas, obtenerInfoPagina}
