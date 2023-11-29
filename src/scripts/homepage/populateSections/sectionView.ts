import type { section, semester, simpleCourse } from '../../../database/sectionTypes'
import { makeCourseElement } from './sectionViewHTMLGenerators';

export const semesters = {} as { [x: string]: section[] }

export async function clearFetchAndShowSemester(sid: string){
    document.getElementById('Courses').innerHTML = `
        <h2>Courses</h2>
        <p>Loading...</p>
    `
    if(!(sid in semesters))
        await fetchSemester(sid);

    const sections = semesters[sid]

    const courses = new Set(sections.map(section=>({
        sid,
        courseAbb: section.courseAbb,
        courseName: section.courseName
    })))

    for (const course of courses) {
        const courseBox = makeCourseElement(course)
    }
   
}


async function fetchSemester(sid: string){
    const isValidSid = 
        typeof sid == 'string' &&
        sid.length == 6 &&
        2010_00 < +sid && +sid <= 2099_30
    
    if(!isValidSid) {
        console.trace(sid, " is not a valid SID")
        throw new Error('foo');
    }

    const sectionsResponse = await fetch(`/api/sections/${sid}`)
    
    const sections = await sectionsResponse.json() as section[]

    semesters[sid] = sections

    sections[0]

    const courses = new Set(sections.map((section: section)=>({
        courseAbb: section.courseAbb,
        courseName: section.courseName,
    })))
}