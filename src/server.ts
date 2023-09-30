import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'

import { demoAPI } from './api/demo'
import { sectionAPI, listSemesters } from './api/section'

const app = new Hono();

app.route('/api/demo/',demoAPI);
app.route('/api/sections/',sectionAPI);
app.route('/api/listSemesters',listSemesters)

app.get('/*',serveStatic({root: '../public'}))

export default app