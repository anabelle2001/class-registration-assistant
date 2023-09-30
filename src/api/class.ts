import { Hono } from 'hono'
import { classDB } from '../database/classData'

const queryAllClasses = classDB.query("SELECT * FROM section");

export const classAPI = new Hono();

classAPI.get('/', (c) => {
    let resposeJSON = queryAllClasses.all()
    return c.json(resposeJSON)
})

// classAPI.get('/classes/:CRN', (c) => {
//     const crnFromURL = c.req.param().CRN;
//     const classData = queries.SpecificClass.get(crnFromURL)
//     return c.json(classData)
// })