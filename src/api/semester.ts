import { Hono } from 'hono';

export const listSemestersAPI = new Hono();

listSemestersAPI.get('/', (c) => {
    return c.json([
        202410, //Fall 2023
    ]);
});
