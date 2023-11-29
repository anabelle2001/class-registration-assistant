import { Hono } from 'hono';

export const listSemestersAPI = new Hono();

listSemestersAPI.get('/', (c) => {
    return c.json([
        {sid: 202410, name: "Fall 2023"}, //Fall 2023
    ]);
});
