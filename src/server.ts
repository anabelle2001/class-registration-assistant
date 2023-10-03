import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'

import { demoAPI } from './api/demo'
import { sectionsAPI} from './api/sections'
import { listSemestersAPI } from './api/semesters'

const app = new Hono();

app.route('/api/demo/',demoAPI);
app.route('/api/sections/',sectionsAPI);
app.route('/api/semesters',listSemestersAPI)

app.get('/*',serveStatic({root: './public'}))

export default app