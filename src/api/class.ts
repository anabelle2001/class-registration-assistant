import { Hono } from 'hono'
import { classDB } from '../database/classData'

const queries = { 
    AllClasses: classDB.query("SELECT CRN, courseName FROM section"),
    SpecificClass: classDB.query("SELECT * FROM section WHERE CRN = $1"),
}

export const classAPI = new Hono();

classAPI.get('/classes', (c) => {
    return c.json(queries.AllClasses.all())
})

classAPI.get('/classes/:CRN', (c) => {
    const crnFromURL = c.req.param().CRN;
    const classData = queries.SpecificClass.get(crnFromURL)
    return c.json(classData)
})