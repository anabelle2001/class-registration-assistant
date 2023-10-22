import { describe, it, expect, afterAll } from "bun:test"
import {getAuthHeaders} from "./authenticate"
import { getSemesters } from "./getSemesters"
import { getClasses } from "./getClasses"
import { listSectionsResponse, sectionResponse, term } from "./ellucianResponseTypes"

describe('getAuthHeaders()', () => {
    it("should return without erroring", async () => {
        let headers = await getAuthHeaders("ssb.cofc.edu")        
        expect(headers).not.toBeNil()
    })
})

describe('getSemesters()', async () => {

    let response:term[];

    await it("should return without erroring", async () => {
        response = await getSemesters()
    })

    it("should return a list of at least one semester", ()=>{
        expect(response).toBeArray;
        expect(response.length).toBeGreaterThan(0)
    })
})

describe('getClasses()', async() =>{
    let headers = await getAuthHeaders("ssb.cofc.edu")
    let result: sectionResponse[];

    await it("should return without erroring",async () => {
        result = await getClasses('202410', headers,20,0)
    })

    it("should return an array containing at least one section", ()=>{
        expect(result).toBeArray()
        expect(result[0]).not.toBeNil()
    })
    
})