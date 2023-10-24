import { section } from "../database/sectionTypes";


// a list of functions
// each function takes in a section and spits out a string
// they're orered in the order that columns show up in the table
const tableFields: ((x: section) => string)[] = [
    (x:section) => x.courseName, //title
    (x:section) => x.section.toString(), //section Number
    (x:section) => (    //Teachers
        x.faculty
            .map(teacher=>teacher.name)
            .join(', ')
    ),
    (x:section) =>  x.schedule.map(x=>x.room).join(', '), //Room(s)
    (x:section) => `${x.seatsAvailable} / ${x.seatsMaximum}`, //seats left
    (x: section) => x.CRN.toString(), //crn
    (x: section) => x.CRN.toString(), //crn
]

async function clearAndPopulate(SID: string){
    let table = document.getElementsByTagName('table')[0]

    //clear the inner html of the table
    table.innerHTML = '';

    let resp = await fetch('/api/sections/'+SID) 
    let data = await resp.json() as section[];

    for (const section of data) {
        let row = table.insertRow();
        for(let index = 0; index < tableFields.length; index++) {
            let translatingFunction = tableFields[index]

            let cellText = translatingFunction(section)
            let cell = row.insertCell(index)
            cell.innerText = cellText;
        }      
    }
}

window.populateTable = clearAndPopulate