import { describe, expect, it } from "bun:test";
import { sectionAPI } from "./section";

describe('Demo API', () => {
    it("should be neither `null` nor `undefined`", async () => {
        let response = await sectionAPI.request('/')
        let responseText = await response.text()

        expect(responseText).not.toBeNil()
    })

    it('should respond with JSON', async () => {
        let response = await sectionAPI.request('/')
        let responseJSON = await response.json()

        expect(responseJSON).not.toBeNil()
    })
})