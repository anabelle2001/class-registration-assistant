import type { course, section, semester} from '../../../database/sectionTypes'
import { makeCourseElement, populateCourseData } from './sectionViewHTMLGenerators';

export const db = {} as { 
    [x: string]: {//sid
        courses: course[]
        sections: section[]
    }
}

export async function clearFetchAndShowSemester(sid: string){
    const courseListDiv = document.getElementById('Courses')
    
    courseListDiv.innerHTML = `
        <h2>Courses</h2>
        <p>Loading...</p>
    `

    if(!(sid in db)) //in is good here becaseu db has semester asa key not value
        await fetchSemester(sid);
    const {sections,courses} = db[sid]

    courseListDiv.innerHTML = `<h2>Courses</h2>`

    let i = 0;
    for (const course of courses) {
        const sectionsOfCourse = sections.filter(
            sec => sec.courseAbb == course.courseAbb
        )

        const courseBoxContainingSections = makeCourseElement(course)
        courseListDiv.appendChild(courseBoxContainingSections)
        // if (i++ > 10) break;
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
    const coursesResponse = await fetch(`/api/courses/${sid}`)
    
    const sections = await sectionsResponse.json() as section[]
    const courses = await coursesResponse.json() as course[]

    db[sid] = {
        sections,
        courses,
    }
}