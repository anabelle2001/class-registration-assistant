export {}
let response = await fetch("/api/sections/?semesterID=202410")
let responseJSON = (await response.json());
