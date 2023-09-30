import { describe, expect, it } from 'bun:test'
import { classDB } from "./classData"

//For more info on writing tests, see <https://bun.sh/docs/test/writing>

describe('Class Data', () => {
    it('Should have at least one class',() => {
        expect(
            classDB.query("SELECT * FROM section LIMIT 1")
        ).not.toBeNull()
    })

    it('Should contain "CSCI362"', () => {
        expect(
            classDB.query("select * from section where courseName ='CSCI362'").get()
        ).toMatchObject({
            CRN: 10155,
            semesterID: 202410,
            section: 1, //use 0,1 becasue sqlite doesn't support booleans
            online: 0,
            independentStudy: 0,
            express: 0,
            seatsMaximum: 22,
            seatsAvaliable: -3,
            creditHours: 3,
            courseName: "CSCI362"
        })
    })
})