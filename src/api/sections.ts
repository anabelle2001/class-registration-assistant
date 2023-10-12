import { Hono } from 'hono'
import { classDB } from '../database/classData'

export const sectionsAPI = new Hono();

sectionsAPI.get('', (c) => {
    return c.json(classDB.data)
});

