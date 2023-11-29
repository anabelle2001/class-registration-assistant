import type { simpleCourse } from "../../../database/sectionTypes";

export function makeCourseElement(course: simpleCourse) {
    const courseBox = new HTMLDivElement()
    courseBox.classList.add('course')
    courseBox.setAttribute('courseAbb', course.courseAbb)

    const collapseToggle = new HTMLInputElement();
    collapseToggle.setAttribute('type', 'checkbox');
    collapseToggle.id = `sections-${course.courseAbb}`

    const collapseToggleLabel = new HTMLLabelElement();
    collapseToggle.innerHTML =
        `${course.courseName} (${course.courseAbb})` +
        `<i class="bi bi-chevron-down"></i>`
    collapseToggle.setAttribute('for', collapseToggle.id)

    const sectionsDiv = new HTMLDivElement()
    sectionsDiv.classList.add('tableBox')

    const sectionsTable = new HTMLTableElement();
    sectionsTable.classList.add(
        'table',
        'table-bordered',
        'table-striped'
    )
    sectionsDiv.appendChild(sectionsTable)

    populateCourseData(sectionsTable, course)

    courseBox.appendChild(collapseToggle)
    courseBox.appendChild(collapseToggleLabel)

    return courseBox
}

export function populateCourseData(
    table: HTMLTableElement,
    course: simpleCourse
) {

}