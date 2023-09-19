import { describe, expect, it } from 'bun:test'
import { pixarDB } from "./demo"

//For more info on writing tests, see <https://bun.sh/docs/test/writing>

describe('Demo Database', () => {
    it('Should have at least one entry',() => {
        expect(
            pixarDB.query("select * from Movies").get()
        ).not.toBeNull()
    })

    it('Should contain "Cars" (2006)', () => {
        expect(
            pixarDB
                .query("select * from Movies where Title='Cars'")
                .get()
        ).toMatchObject({
            ID: 7,
            Title: 'Cars',
            Director: 'John Lasseter',
            Year: 2006,
            LengthMinutes: 117
        })
    })

    it('Should not Contain "Planes" (2013)', ()=>{
        expect(
            pixarDB
                .query("select * from Movies where Title='Planes'")
                .get()
        ).toBeNull()
    })
})