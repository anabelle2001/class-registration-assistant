import { Hono } from 'hono'
import { serveStatic } from 'hono/bun'

// import { demoAPI } from './api/demo'
import { sectionsAPI } from './api/sections'
import { listSemestersAPI } from './api/semesters'
import { SectionDatabase } from './database/sectionDatabase'
import { inMilliseconds } from './millisecondDurations'
import { coursesAPI } from './api/courses'

// //this program will compile files from src/scripts to public/scripts in realtime
// import './bundle'

const app = new Hono();


// app.route('/api/demo/',demoAPI);
app.route('/api/sections', sectionsAPI);
app.route('/api/courses',coursesAPI);
app.route('/api/semesters/',listSemestersAPI)
app.get('/style/normalize.css', serveStatic({
     path:'node_modules/normalize.css/normalize.css'
}))
app.get('/scripts/*', serveStatic({
     root: './public/',
     rewriteRequestPath: (path) => {
          console.log(path)
          return path.endsWith('js') ? 
               path :
               path+'.js'
     }
}))
app.get('/*',serveStatic({root: './public'}))

const db = SectionDatabase.getInstance()
global.db=db

if('--fetch' in Bun.argv){
     db.updateSemesterFromEllucian('202420')
     setInterval(
          ()=>{
               db.updateSemesterFromEllucian('202420')
          }, inMilliseconds(20, 'minutes')
     )
}

export default app