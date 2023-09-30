let response = await fetch("/api/sections/?semesterID=202410")
document.storage = await response.json();
console.log(document.storage);

