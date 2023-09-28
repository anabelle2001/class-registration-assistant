import { describe, expect, it } from 'bun:test'
import { classDB } from "./classData"

//For more info on writing tests, see <https://bun.sh/docs/test/writing>

describe('Class Data', () => {
    it('Should have at least one test',() => {
        expect(
            classDB.query("SELECT * FROM section LIMIT 1")
        ).not.toBeNull()
    })

    it('Should contain "CSCI362"', () => {
        expect(
            classDB.query("select * from section where courseName ='CSCI362'").get()
        ).toMatchObject({
            CRN: 10155,
            partOfTerm: 1,
            section: 1,
            online: false,
            independentStudy: false,
            seatsMaximum: 22,
            seatsAvaliable: -3,
            creditHours: 3,
            courseName: "CSCI362"
        })
    })
})