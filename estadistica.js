const API_URL = "https://rickandmortyapi.com/api/character";


async function obtenerPagina(pagina) {
    const respuesta = await fetch(`${API_URL}?page=${pagina}`);

    if (respuesta.ok) {
        return await respuesta.json();
    }

    throw new Error(
        `Error ${respuesta.status} al obtener la página ${pagina}`
    );
}

/*
 * ESTRATEGIA 1:
 * Consultas secuenciales
 */
async function obtenerSecuencial() {

    const primeraPagina = await obtenerPagina(1);

    const totalPaginas = primeraPagina.info.pages;

    const personajes = [...primeraPagina.results];

    for (let pagina = 2; pagina <= totalPaginas; pagina++) {

        const datos = await obtenerPagina(pagina);

        personajes.push(...datos.results);

        await new Promise(resolve =>
            setTimeout(resolve, 500)
        );
    }

    return personajes;
}

/*
 * ESTRATEGIA 2:
 * Consultas concurrentes utilizando Promise.all()
 */
async function obtenerConcurrente() {

    const primeraPagina = await obtenerPagina(1);

    const totalPaginas = primeraPagina.info.pages;

    const personajes = [...primeraPagina.results];

    const TAMANO_LOTE = 5;

    for (
        let inicio = 2;
        inicio <= totalPaginas;
        inicio += TAMANO_LOTE
    ) {

        const peticiones = [];

        const fin = Math.min(
            inicio + TAMANO_LOTE - 1,
            totalPaginas
        );

        for (let pagina = inicio; pagina <= fin; pagina++) {

            peticiones.push(obtenerPagina(pagina));
        }

        const resultados = await Promise.all(peticiones);

        await new Promise(resolve =>
            setTimeout(resolve, 2000)
        );

        resultados.forEach(datos => {
            personajes.push(...datos.results);
        });
    }

    return personajes;
}

/*
 * COMPARACIÓN DE TIEMPOS
 */
async function ejecutarPruebas() {
    const inicioSecuencial = performance.now();

    const personajesSecuencial = await obtenerSecuencial();

    const finSecuencial = performance.now();

    const tiempoSecuencial =
        finSecuencial - inicioSecuencial;

    const inicioConcurrente = performance.now();

    const personajesConcurrente = await obtenerConcurrente();

    const finConcurrente = performance.now();

    const tiempoConcurrente =
        finConcurrente - inicioConcurrente;

    let respuestaMasRapida = ''

    if (tiempoSecuencial < tiempoConcurrente) {
        respuestaMasRapida = "La estrategia secuencial fue más rápida."
    } else if (tiempoConcurrente < tiempoSecuencial) {
        respuestaMasRapida = "La estrategia concurrente fue más rápida."
    } else {
        respuestaMasRapida = "Ambas estrategias tuvieron el mismo tiempo."
    }

    return (` 
    <h2> ================================= </h2>
    <h1>ESTRATEGIA 1 - SECUENCIAL</h1>
    <h2>=================================</h2>
    <p>Personajes obtenidos: ${personajesSecuencial.length}</p>
    <p>Tiempo: ${tiempoSecuencial.toFixed(2)} ms</p>
    <h2>=================================</h2>
    <h1>ESTRATEGIA 2 - CONCURRENTE</h1>
    <h2>=================================</h2>
    <p>Personajes obtenidos: ${personajesConcurrente.length}</p>
    <p>Tiempo: ${tiempoConcurrente.toFixed(2)} ms</p>
    <h2>=================================</h2>
    <h1>COMPARACIÓN</h1>
    <h2>=================================</h2>
    <p>${respuestaMasRapida}</p>
    `
    )
}

module.exports = { ejecutarPruebas }
