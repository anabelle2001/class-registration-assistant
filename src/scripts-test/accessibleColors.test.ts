//describe accessible colors
import { describe, expect, it } from "bun:test";
import { Color } from "../scripts/common/colors/colors";
import { ColorTools } from '../scripts/common/colors/accessibleColor'

describe('accessible colors',async ()=>{
    it('should generate valid AAA_text pairs for 10000 random colors', function(){
        for(let i = 0; i < 10000; i++){
            const randColor = Color.random()
         
            const randColorPair = ColorTools.deriveContrastingPair(randColor,'AAA_text');
         
            if(randColorPair === undefined){
                print
            }

            expect(randColorPair).toBeDefined()
        }
    })
    //it should not fail for 100 random colors
})