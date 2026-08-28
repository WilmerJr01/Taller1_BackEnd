const API_URL = "https://rickandmortyapi.com/api/character";


async function obtenerPagina(pagina, intentos = 5) {
    const respuesta = await fetch(`${API_URL}?page=${pagina}`);

    if (respuesta.ok) {
        return await respuesta.json();
    }

    if (respuesta.status === 429 && intentos > 0) {

        const espera = (6 - intentos) * 2000;

        console.log(
            `Página ${pagina}: Too Many Requests. ` +
            `Reintentando en ${espera / 1000} segundos...`
        );

        await new Promise(resolve =>
            setTimeout(resolve, espera)
        );

        return obtenerPagina(pagina, intentos - 1);
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

    console.log("=================================");
    console.log("ESTRATEGIA 1 - SECUENCIAL");
    console.log("=================================");

    const inicioSecuencial = performance.now();

    const personajesSecuencial = await obtenerSecuencial();

    const finSecuencial = performance.now();

    const tiempoSecuencial =
        finSecuencial - inicioSecuencial;

    console.log(
        `Personajes obtenidos: ${personajesSecuencial.length}`
    );

    console.log(
        `Tiempo: ${tiempoSecuencial.toFixed(2)} ms`
    );


    console.log("\n=================================");
    console.log("ESTRATEGIA 2 - CONCURRENTE");
    console.log("=================================");

    const inicioConcurrente = performance.now();

    const personajesConcurrente = await obtenerConcurrente();

    const finConcurrente = performance.now();

    const tiempoConcurrente =
        finConcurrente - inicioConcurrente;

    console.log(
        `Personajes obtenidos: ${personajesConcurrente.length}`
    );

    console.log(
        `Tiempo: ${tiempoConcurrente.toFixed(2)} ms`
    );


    console.log("\n=================================");
    console.log("COMPARACIÓN");
    console.log("=================================");

    if (tiempoSecuencial < tiempoConcurrente) {

        console.log("La estrategia secuencial fue más rápida.");

    } else if (tiempoConcurrente < tiempoSecuencial) {

        console.log("La estrategia concurrente fue más rápida.");

    } else {

        console.log("Ambas estrategias tuvieron el mismo tiempo.");

    }
}


ejecutarPruebas();