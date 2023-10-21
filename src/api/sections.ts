import { Hono } from 'hono'
import { classDB } from '../database/sectionData'

export const sectionsAPI = new Hono();

sectionsAPI.get('', (c) => {
    return c.json(classDB.data)
});

