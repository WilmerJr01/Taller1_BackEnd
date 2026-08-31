const { obtenerTodosLosPersonajes } = require("./normalizacion.js");

function filtrarPersonajesVivosYHumanos(personajes) {
  return personajes.filter(
    (personaje) =>
      personaje.estado === "Alive" && personaje.especie === "Human",
  );
}

function filtrarPersonajesCon20OMasEpisodios(personajes) {
  return personajes.filter((personaje) => personaje.cantidadEpisodios >= 20);
}

function encontrarPrimerAlienFemale(personajes) {
  return personajes.find(
    (personaje) =>
      personaje.especie === "Alien" && personaje.genero === "Female",
  );
}

function existeTipoConInformacion(personajes) {
  return personajes.some(
    (personaje) =>
      typeof personaje.tipo === "string" && personaje.tipo.trim().length > 0,
  );
}

function todosTienenImagenYAlMenosUnEpisodio(personajes) {
  return personajes.every(
    (personaje) =>
      Boolean(personaje.imagen) && Number(personaje.cantidadEpisodios) >= 1,
  );
}

function agruparPorEspecie(personajes) {
  return personajes.reduce((resultado, personaje) => {
    const especie = personaje.especie;

    if (!resultado[especie]) {
      resultado[especie] = {
        cantidad: 0,
        totalEpisodios: 0,
        vivos: 0,
      };
    }

    resultado[especie].cantidad += 1;
    resultado[especie].totalEpisodios += personaje.cantidadEpisodios;
    resultado[especie].vivos += personaje.estado === "Alive" ? 1 : 0;

    return resultado;
  }, {});
}

function resumirPorEspecie(personajes) {
  const agrupado = agruparPorEspecie(personajes);

  return Object.entries(agrupado).reduce((resultado, [especie, datos]) => {
    resultado[especie] = {
      cantidad: datos.cantidad,
      promedioEpisodios: Number(
        (datos.totalEpisodios / datos.cantidad).toFixed(1),
      ),
      vivos: datos.vivos,
    };

    return resultado;
  }, {});
}

function clasificarPorCantidadEpisodios(personajes) {
  return personajes.reduce(
    (resultado, personaje) => {
      const cantidad = personaje.cantidadEpisodios;

      if (cantidad >= 1 && cantidad <= 5) {
        resultado["1-5"] += 1;
      } else if (cantidad >= 6 && cantidad <= 15) {
        resultado["6-15"] += 1;
      } else if (cantidad >= 16 && cantidad <= 30) {
        resultado["16-30"] += 1;
      } else {
        resultado["30+"] += 1;
      }

      return resultado;
    },
    { "1-5": 0, "6-15": 0, "16-30": 0, "30+": 0 },
  );
}

async function ejecutarConsultas() {
  const personajes = await obtenerTodosLosPersonajes();

  return {
    filtroVivosYHumanos: filtrarPersonajesVivosYHumanos(personajes),
    filtroMasDe20Episodios: filtrarPersonajesCon20OMasEpisodios(personajes),
    primerAlienFemale: encontrarPrimerAlienFemale(personajes),
    existeTipoInformacion: existeTipoConInformacion(personajes),
    todosTienenImagenYUnEpisodio:
      todosTienenImagenYAlMenosUnEpisodio(personajes),
    resumenPorEspecie: resumirPorEspecie(personajes),
    clasificacionPorEpisodios: clasificarPorCantidadEpisodios(personajes),
  };
}

if (require.main === module) {
  ejecutarConsultas()
    .then((resultado) => {
      console.log(JSON.stringify(resultado, null, 2));
    })
    .catch((error) => {
      console.error("Error al ejecutar las consultas:", error);
    });
}

module.exports = {
  filtrarPersonajesVivosYHumanos,
  filtrarPersonajesCon20OMasEpisodios,
  encontrarPrimerAlienFemale,
  existeTipoConInformacion,
  todosTienenImagenYAlMenosUnEpisodio,
  resumirPorEspecie,
  clasificarPorCantidadEpisodios,
  ejecutarConsultas,
};
