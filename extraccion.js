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
    return datos.results;
  } catch (error) {
    console.log(`Error ${error}`)
  }
}

async function obtenerInfoTotal (numeroPaginas = 5) {
  const totalPaginas = await obtenerPaginas();
  let personajesTotales = [];
  for (let i = 1; i <= totalPaginas; i += numeroPaginas) {
    let lote = [];
    for (let j = i; j < i + numeroPaginas && j <= totalPaginas; j++) {
      lote.push(obtenerInfoPagina(j));
    }
    const personajesLote = await Promise.all(lote)
    personajesTotales = personajesTotales.concat(...personajesLote);

    await new Promise((r) => setTimeout(r, 2000));
  }
  return personajesTotales;
}

obtenerInfoTotal().then((personajes) => {
  console.log(personajes.length);
});
module.exports = {obtenerPaginas, obtenerInfoPagina, obtenerInfoTotal}
