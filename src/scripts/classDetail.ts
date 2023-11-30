import type { section, course } from "../database/sectionTypes"

type semesterData = {//sid
    courses: course[]
    sections: section[]
}

main();

async function main(){
    document.body.innerText = "loading..."
    const urlParams = new URLSearchParams(window.location.search)
    const urlSid = urlParams.get('sid')
    const courseAbbFromURL = urlParams.get('courseAbb').toUpperCase()

    const db = await fetchSemester(urlSid)

    
    const selectedCourse = db.courses.find(course=>course.courseAbb == courseAbbFromURL)
    

    const {
        courseAbb,
        courseName,
        credits,
        sid,
    } = selectedCourse

    const sectionsOfCourse = db.sections.filter(section=>section.courseAbb=courseAbb)

    document.body.innerHTML = `
        <h1>${courseName}</h1>
    `

    const table = document.body.appendChild(document.createElement('table'));
    table.classList.add('table', 'table-bordered', 'table-striped')
    populateCourseData(
        table,
        selectedCourse,
        sectionsOfCourse
    )
}






async function fetchSemester(sid: string): Promise<semesterData> {
    const isValidSid =
        typeof sid == 'string' &&
        sid.length == 6 &&
        2010_00 < +sid && +sid <= 2099_30

    if (!isValidSid) {
        console.trace(sid, " is not a valid SID")
        throw new Error('foo');
    }

    const sectionsResponse = await fetch(`/api/sections/${sid}`)
    const coursesResponse = await fetch(`/api/courses/${sid}`)

    const sections = await sectionsResponse.json() as section[]
    const courses = await coursesResponse.json() as course[]

    return {
        sections,
        courses,
    }
}



export function populateCourseData(
    table: HTMLTableElement,
    course: course,
    sectionsOfCourse: section[]
) {
    const header = table.insertRow();
    [
        'CRN',
        'Faculty',
        "Meets",
        "Availible Seats",
        "Section Number",
        "Credit Hours"
    ].forEach(heading => {
        // const h = document.createElement('th')
        // h.innerText = heading
        header.insertCell().innerText = heading
    });



    for (const section of sectionsOfCourse) {
        const sectionRow = table.insertRow();

        toRowAddCells(sectionRow,
            section.CRN.toString(),
        )

        //add teachers
        sectionRow.insertCell().innerHTML =
            section.faculty.map(fac => fac.name).join(', ')


        ///add meetings
        sectionRow.insertCell().innerHTML =
            section.schedule.map(meetingTime => `
                <span class="days">${meetingTime.weekdays.toUpperCase()}</span>
                <br>
                <span class="time">${prettyTime(meetingTime.begins)} - ${prettyTime(meetingTime.ends)}</span>                
            `).join('<br>')

        //crn
        sectionRow.insertCell().innerText =
            section.seatsAvailable +
            ' / '
            + section.seatsMaximum


        toRowAddCells(sectionRow,section.section.toString(),section.creditHours)
    }
}


function toRowAddCells(
    row: HTMLTableRowElement,
    ...cells: string[]
) {
    for (const cellText of cells) {
        row.insertCell().innerText = cellText
    }
}
function prettyTime(
    time: number //time in four digit number. tens and ones are mins. rest 24 hr
) {
    const minsInt = time % 100;
    const minsStr = (
        minsInt < 10 ?
            '0' :
            ''
    ) + minsInt

    const hour24 = ~~(time / 100); //integer division
    const hour12 = hour24 % 12 || 12

    const xm = (time >= 1200) ? 'PM' : 'AM'


    return `${hour12}:${minsStr}&nbsp;${xm}`
}