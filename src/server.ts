import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'
import { demoAPI } from './api/demo'

const app = new Hono()

//Import the demo API into our application, and have it serve requests directed
//to /api/demo/
app.route('/api/demo/',demoAPI);

export default app