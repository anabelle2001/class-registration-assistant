import { Color, color, rgb, hsv } from "./colors";
import { it, expect, describe} from "bun:test"

describe('Color.fromHex, Color.fromRGB, Color.fromHSV',()=>{

    let blackFromHex, 
        blackFromRGB, 
        blackFromHSV, 
        whiteFromHex, 
        whiteFromRGB, 
        whiteFromHSV, 
        redFromHex, 
        redFromRGB

    it('should return without erroring',()=>{
        blackFromHex = Color.fromHEX("#000000")
        blackFromRGB = Color.fromRGB({ r: 0, g: 0, b: 0 })
        blackFromHSV = Color.fromHSV({ h: 0, s: 0, v: 0 })
        whiteFromHex = Color.fromHEX("#ffffff")
        whiteFromRGB = Color.fromRGB({ r: 255, g: 255, b: 255 })
        whiteFromHSV = Color.fromHSV({ h: 0, s: 0, v: 1 })
        redFromHex = Color.fromHEX("#ff0000")
        redFromRGB = Color.fromRGB({ r: 255, g: 0, b: 0 })
    })


    it('should Object.seal() the returned values', ()=>{
        expect(Object.isSealed(blackFromHSV)).toBeTrue()
        expect(Object.isSealed(blackFromRGB)).toBeTrue()
        expect(Object.isSealed(blackFromHex)).toBeTrue()
    })

    it('should return the same values for black', () => {
        expect(blackFromRGB).toEqual(blackFromHex)
        expect(blackFromHSV).toEqual(blackFromHex)
    })

    it('should return the same values for white', () => {
        expect(whiteFromRGB).toEqual(whiteFromHex)
        expect(whiteFromHSV).toEqual(whiteFromHex)
    })

    it('should return the same values for red', () => {
        expect(redFromHex).toEqual(redFromRGB)
    })
})
