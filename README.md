## Integrantes:
- Wilmer Santiago
- Samuel Ricardo
- Alvaro Jimenez

## API

Esta API está construida con Node.js y Express. Al iniciar, consulta los datos de personajes en la API de Rick and Morty, los normaliza y después inicia el servidor.

### Requisitos

- Node.js
- pnpm

### Instalación

Desde la carpeta del proyecto, instala las dependencias:

```bash
pnpm install
```

### Arrancar la API

Ejecuta:

```bash
pnpm start
```

La API estará disponible en:

```text
http://localhost:3000
```

La carga de datos se realiza antes de abrir el puerto. En la consola deben aparecer mensajes similares a:

```text
Datos cargados
ESCUCHANDO EN EL PUERTO 3000
```

### Endpoints

Todas las rutas usan el método `GET`.

| Endpoint | Descripción |
| --- | --- |
| `/` | Verifica que la API esté desplegada. |
| `/TodosLosDatos` | Obtiene todos los personajes con la estructura original. |
| `/TodosLosDatos/Normalizados` | Obtiene todos los personajes con la estructura normalizada. |
| `/Consultas/PersonajesVivosYHumanos` | Filtra personajes vivos y humanos. |
| `/Consultas/PersonajesFrecuentes` | Obtiene personajes que aparecen en 20 o más episodios. |
| `/Consultas/PrimerAlienFemenino` | Obtiene el primer personaje alienígena de género femenino. |
| `/Consultas/ExisteTipoConInfo` | Comprueba si existe un tipo con información. |
| `/Consultas/ImagenYEpisodio` | Comprueba que todos tengan imagen y al menos un episodio. |
| `/Consultas/AgruparPorEspecie` | Resume los personajes agrupados por especie. |
| `/Consultas/CalificarPorEpisodios` | Clasifica los personajes según la cantidad de episodios. |
| `/Pruebas` | Compara el tiempo de las consultas secuencial y concurrente. |

### Ejemplo

Con la API en ejecución, abre en el navegador o consulta con `curl`:

```bash
curl http://localhost:3000/TodosLosDatos/Normalizados
```
