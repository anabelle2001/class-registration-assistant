import { Hono } from 'hono'
import {SectionDatabase} from '../database/sectionDatabase'

export const translateSectionAPI = new Hono();
const db = SectionDatabase.getInstance()

translateSectionAPI.get('/:crn/:courseName', (c) => {
    const crn = c.req.param('crn')
    const courseName = c.req.param('courseName')
    for (const section of db.data[crn]) {
        if (section.courseName == courseName) return c.json(crn);
    }
    return c.json({}) //instead of returning the full classname right now it will only return the abbreviation ex. AAST101
});