import { Hono } from 'hono'
import { pixarDB } from '../database/demo'

//We have to construct queries before executing them.
const queries = {
    AllMovies: pixarDB.query("SELECT ID,Title FROM Movies"),
    SpecificMovie: pixarDB.query("SELECT * FROM Movies WHERE ID = $1"),
}

//We build our API in this object. We'll decide where it's accessible from later
//By importing it into main.ts
export const demoAPI = new Hono();

demoAPI.get('/', (c) => {
    return c.json(queries.AllMovies.all())
})

demoAPI.get('/:id', (c) => {
    const idFromURL = c.req.param().id;
    const movieData = queries.SpecificMovie.get(idFromURL)
    return c.json(movieData)
})

//More Documentation: https://hono.dev/guides/examples#web-api
