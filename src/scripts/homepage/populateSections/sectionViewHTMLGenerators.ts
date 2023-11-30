import type { course, section } from "../../../database/sectionTypes";

export function makeCourseElement(course: course) {
    const courseBox = document.createElement('div') as HTMLDivElement
    courseBox.classList.add('course')
    courseBox.setAttribute('courseAbb', course.courseAbb)

    const collapseToggle = document.createElement('input') as HTMLInputElement;
    collapseToggle.setAttribute('type', 'checkbox');
    collapseToggle.id = `sections-${course.courseAbb}`

    const collapseToggleLabel = document.createElement('label') as HTMLLabelElement;
    collapseToggleLabel.innerHTML =
        `${course.courseName} (${course.courseAbb})` +
        `<i class="bi bi-chevron-down"></i>`
    collapseToggleLabel.setAttribute('for', collapseToggle.id)
    collapseToggleLabel.classList.add('h4')

    const sectionsDiv = document.createElement('div') as HTMLDivElement
    sectionsDiv.classList.add('tableBox')

    const sectionsTable = document.createElement('table') as HTMLTableElement;
    sectionsTable.classList.add(
        'table',
        'table-bordered',
        'table-striped'
    )
    sectionsDiv.appendChild(sectionsTable)


    const link = document.createElement('a') as HTMLAnchorElement;
    link.href = `/classDetail?sid=${course.sid}&courseAbb=${course.courseAbb}`
    link.classList.add('button','btn')
    link.innerText='View All Sections'
    link.style.display = 'inline-block'
    
    courseBox.appendChild(collapseToggle)
    courseBox.appendChild(collapseToggleLabel)
    courseBox.appendChild(link)
    courseBox.appendChild(sectionsDiv)




    return {
        courseBox,
        sectionsTable
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
    ].forEach(heading => {
        // const h = document.createElement('th')
        // h.innerText = heading
        header.insertCell().innerText = heading
    });



    for(const section of sectionsOfCourse){
        const sectionRow = table.insertRow();
        
        toRowAddCells(sectionRow,
            section.CRN.toString(),
        )

        //add teachers
        sectionRow.insertCell().innerHTML =
            section.faculty.map(fac=>fac.name).join(', ')

        
        ///add meetings
        sectionRow.insertCell().innerHTML = 
            section.schedule.map(meetingTime =>`
                <span class="days">${meetingTime.weekdays.toUpperCase()}</span>
                <br>
                <span class="time">${prettyTime(meetingTime.begins)} - ${prettyTime(meetingTime.ends)}</span>                
            `).join('<br>')

        //crn
        sectionRow.insertCell().innerText =
            section.seatsAvailable +
            ' / '
            + section.seatsMaximum
    }
}


function toRowAddCells(
    row: HTMLTableRowElement,
    ...cells: string[]
) {
    for (const cellText of cells){
        row.insertCell().innerText = cellText
    }
}
function prettyTime(
    time:number //time in four digit number. tens and ones are mins. rest 24 hr
) {
    const minsInt = time % 100;
    const minsStr = (
        minsInt < 10? 
            '0': 
            ''
    ) + minsInt

    const hour24 = ~~(time / 100); //integer division
    const hour12 = hour24 % 12 || 12

    const xm = (time >= 1200) ? 'PM' : 'AM'


    return `${hour12}:${minsStr}&nbsp;${xm}`
}