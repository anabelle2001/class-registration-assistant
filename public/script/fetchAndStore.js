let response = await fetch("/api/sections/?semesterID=202410")
document.storage = await response.json();
console.log(document.storage);


async function getSemesterList(){
    let semesterListResponse = await fetch("./api/semesters")
    let semesterListJSON = await semesterListResponse.json()
}

