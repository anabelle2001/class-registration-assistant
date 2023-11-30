import type { section, semester } from "../../../database/sectionTypes";

export const semesterSelectButton = 
    document.getElementById('semesterSelect') as HTMLSelectElement;

export let semesterList;

async function getSemesterList(){
    semesterSelectButton.innerHTML="<option>Loading...</option>"
    const response = await fetch('/api/semesters/');
    semesterList = await response.json() as semester[]

    Object.seal(semesterList);

    semesterSelectButton.innerHTML = ""

    for (const semester of semesterList) {
        const opt = document.createElement('option') as HTMLOptionElement

        opt.value = semester.sid
        opt.innerText = semester.name

        semesterSelectButton.appendChild(opt)
    }

    semesterList[0]

    return semesterList
}

export const onSemesterListReady = getSemesterList();

