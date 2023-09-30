import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'

import { demoAPI } from './api/demo'
import { sectionAPI} from './api/section'
import { listSemestersAPI } from './api/semester'

const app = new Hono();

app.route('/api/demo/',demoAPI);
app.route('/api/sections/',sectionAPI);
app.route('/api/listSemesters',listSemestersAPI)

app.get('/*',serveStatic({root: '../public'}))

export default app