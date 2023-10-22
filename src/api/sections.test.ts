// import { describe, expect, it } from "bun:test";
// import { sectionsAPI } from "./sections";

// describe('Demo API', () => {
//     it("should be neither `null` nor `undefined`", async () => {
//         let response = await sectionsAPI.request('/?semesterID=202410')
//         let responseText = await response.text()

//         expect(responseText).not.toBeNil()
//     })

//     it('should respond with JSON', async () => {
//         let response = await sectionsAPI.request('/?semesterID=202410')
//         let responseJSON = await response.json()
//         // console.debug(responseJSON);
        
//         expect(responseJSON).not.toBeNil()
//     })

//     it('should respond with an array of at least one item', async () => {
//         let response = await sectionsAPI.request('/?semesterID=202410')
//         let responseJSON = await response.json()
//         // console.debug(responseJSON);

//         expect(responseJSON).toBeArray()
//         expect(responseJSON).not.toBeArrayOfSize(0)
//     })

//     it('should respond gracefully when given a bad request',async () => {
         
//     })
// })