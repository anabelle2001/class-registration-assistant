import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'

import { demoAPI } from './api/demo'
import { classAPI } from './api/class'

const app = new Hono();

app.route('/api/demo/',demoAPI);
app.route('/api/classes/',classAPI);
app.get('/*',serveStatic({root: 'public'}))

export default app