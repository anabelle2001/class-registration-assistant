import { Hono } from 'hono'
import { classDB } from '../database/classData'

const queryAllClasses = classDB.query("SELECT * FROM section WHERE semesterID = $1");


export const sectionAPI = new Hono();

sectionAPI.get('/', (c) => {
    
    // We shouldn't /need to/ check if :semesterID is valid
    // number. if the user gives an invalid :semesterID, the
    // sql query will return an empty array.


    let semesterID:string = c.req.queries().semesterID[0]
    let responseJSON = queryAllClasses.all(semesterID);
    return c.json(responseJSON);
});

