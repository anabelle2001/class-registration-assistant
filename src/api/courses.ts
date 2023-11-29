import { Hono } from 'hono'
import { SectionDatabase } from '../database/sectionDatabase';

export const coursesAPI = new Hono();
const db = SectionDatabase.getInstance()

coursesAPI.get('/:semester', (c) => {
    const semester = c.req.param('semester')
    if (db.courseData[semester] != undefined) {
        return c.json(db.courseData[semester])
    } else {
        return c.json({
            error:"Couldn't find courses for semester "+semester,
            availibleSemesters: Object.keys(db.courseData)
        })
    }
});