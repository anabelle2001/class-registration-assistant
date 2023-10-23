import { Hono } from 'hono'
import {SectionDatabase} from '../database/sectionDatabase'

export const sectionsAPI = new Hono();
const db = SectionDatabase.getInstance()

sectionsAPI.get('/:semester', (c) => {
    const semester = c.req.param('semester')
    return c.json(db.data[semester])
});

sectionsAPI.get('/:semester/:crn', (c) => {
    const semester = c.req.param('semester')
    const crn = +c.req.param('crn')
    for (const section of db.data[semester]) {
        if (section.CRN == crn) return c.json(crn);
    }
    return c.json({})
});

sectionsAPI.get('/doUpdate',(c)=>{
    db.updateSections('202410')
    return c.text("Updating! tyty")
})