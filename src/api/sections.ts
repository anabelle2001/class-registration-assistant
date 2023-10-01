import { Hono } from 'hono'
import { classDB } from '../database/classData'

const queryAllClasses = classDB.query("SELECT * FROM section WHERE semesterID = $1");


export const sectionsAPI = new Hono();

sectionsAPI.get('', (c) => {
    try {
        let semesterID:string = c.req.queries().semesterID[0]
        let responseJSON = queryAllClasses.all(semesterID);

        return c.json(responseJSON);
    } catch (error) {
        c.status(400)
        return c.json([])
    }
});

