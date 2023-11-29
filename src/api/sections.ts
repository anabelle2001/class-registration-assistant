import { Hono } from 'hono'
import { SectionDatabase } from '../database/sectionDatabase'

export const sectionsAPI = new Hono();
const db = SectionDatabase.getInstance()

sectionsAPI.get('/:semester', (c) => {
    const semester = c.req.param('semester')
    if (db.sectionData[semester] != undefined) {
        return c.json(db.sectionData[semester])
    } else {
        return c.json({
            error:"Couldn't find sections for semester"+semester,
            availibleSemesters: Object.keys(db.sectionData)
        })
    }
});

sectionsAPI.get('/:semester/:crn', (c) => {
    const semester = c.req.param('semester')
    const crn = +c.req.param('crn')
    for (const section of db.sectionData[semester]) {
        if (section.CRN == crn) return c.json(crn);
    }
    return c.json({})
});