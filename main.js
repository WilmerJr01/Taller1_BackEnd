const express = require('express')
const { obtenerInfoTotal } = require("./extraccion.js");
const { normalizarPersonajes } = require("./normalizacion.js");
const { filtrarPersonajesVivosYHumanos,
    filtrarPersonajesCon20OMasEpisodios,
    encontrarPrimerAlienFemale,
    existeTipoConInformacion,
    todosTienenImagenYAlMenosUnEpisodio,
    resumirPorEspecie,
    clasificarPorCantidadEpisodios} = require('./consulta.js');
const {ejecutarPruebas} = require('./estadistica.js')

const app = express()

const PORT = 3000

let data = []
let normalizados = []

async function globales() {
    data = await obtenerInfoTotal();
    normalizados = await normalizarPersonajes(data);
}

app.get('/', (req, res)=>{
    res.send('<h1>API DESPLEGADA CON EXITO </h1>')
})

app.get('/TodosLosDatos/Normalizados', (req, res) => {
    res.send(normalizados)
})

app.get('/TodosLosDatos', (req, res) => {
    res.send(data)
})

app.get('/Consultas/PersonajesVivosYHumanos', (req, res) => {
    res.send(filtrarPersonajesVivosYHumanos(normalizados))
})

app.get('/Consultas/PersonajesFrecuentes', (req, res) => {
    res.send(filtrarPersonajesCon20OMasEpisodios(normalizados))
})

app.get('/Consultas/PrimerAlienFemenino', (req, res) =>{
    res.send(encontrarPrimerAlienFemale(normalizados))
})

app.get('/Consultas/ExisteTipoConInfo', (req, res) =>{
    res.send(existeTipoConInformacion(normalizados))
})

app.get('/Consultas/ImagenYEpisodio', (req, res) =>{
    res.send(todosTienenImagenYAlMenosUnEpisodio(normalizados))
})

app.get('/Consultas/AgruparPorEspecie', (req, res) =>{
    res.send(resumirPorEspecie(normalizados))
})

app.get('/Consultas/CalificarPorEpisodios', (req, res) => {
    res.send(clasificarPorCantidadEpisodios(normalizados))
})

app.get('/Pruebas', async (req, res) =>{
    res.send(await ejecutarPruebas())
})

async function iniciarServidor() {
    try {
        await globales();
        console.log('Datos cargados');
        app.listen(PORT, () => console.log(`ESCUCHANDO EN EL PUERTO ${PORT}`));
    } catch (error) {
        console.error('No se pudieron cargar los datos:', error);
        process.exit(1);
    }
}

iniciarServidor();