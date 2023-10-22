import { Hono } from 'hono'
import SectionDatabase from '../database/sectionDatabase'

export const sectionsAPI = new Hono();

sectionsAPI.get('', (c) => {
    return c.json(SectionDatabase.data)
});

