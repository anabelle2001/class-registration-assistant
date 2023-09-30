import { Hono } from 'hono'
import { classDB } from '../database/classData'

const queryAllClasses = classDB.query("SELECT * FROM section WHERE semesterID = $1");


export const sectionsAPI = new Hono();

sectionsAPI.get('', (c) => {
    
    // We shouldn't /need to/ check if :semesterID is valid
    // number. if the user gives an invalid :semesterID, the
    // sql query will return an empty array.
    try {
        console.log(c.req.queries());
        
        let semesterID:string = c.req.queries().semesterID[0]
        let responseJSON = queryAllClasses.all(semesterID);
        
        return c.json(responseJSON);
    } catch (error) {
        c.status(400)
        return c.json([])
    }
});

