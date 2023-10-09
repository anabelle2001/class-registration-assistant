let response = await fetch("/api/sections/?semesterID=202410")
document.storage = await response.json();
console.log(document.storage);

//This is just a test
//Delete after
let data = [{
    //"id": "1",
    "semesterID": "Fall 2023"
  },
  {
    //"id": "2",
    "semesterID": "Spring 2023"
  }
];

let test = [{
    response
}]

let two = [{

}]
var selectElement = document.getElementById('testing');

data.map(item => testing.appendChild(new Option(item.semesterID)).cloneNode(true));