import type { course } from "../../../database/sectionTypes";

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

    courseBox.appendChild(collapseToggle)
    courseBox.appendChild(collapseToggleLabel)
    courseBox.appendChild(sectionsDiv)
    return courseBox
}

export function populateCourseData(
    table: HTMLTableElement,
    course: course,
    sectionsOfCourse: section
) {
    
}