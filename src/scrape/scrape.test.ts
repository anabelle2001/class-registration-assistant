import { describe, it, expect } from "bun:test"
import {getAuthHeaders} from "./authenticate"
import { getSemesters } from "./getSemesters"
import { getClasses } from "./getClasses"
import { term } from "./ellucianResponseTypes"

// describe('authenticator', () => {
//     it("should return without erroring", async () => {
//         let headers = await getAuthHeaders("ssb.cofc.edu")
//         console.log(headers);
        
//         expect(headers).not.toBeNil()
//     })
// })

// describe('getSemesters()', async () => {

//     let response:term[];

//     await it("should return without erroring", async () => {
//         response = await getSemesters()
//     })

//     it("should return a list of at least one semester", ()=>{
//         expect(response).toBeArray;
//         expect(response.length).toBeGreaterThan(0)
//     })
// })

describe('getClasses()', async() =>{
    let headers = await getAuthHeaders("ssb.cofc.edu")

    await it("should return without erroring",async () => {
        let result = await getClasses('202410', headers)
        console.log(result);
    })
})