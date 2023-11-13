import { Color, color } from "./colors";
import {
    minimumContrastStandards, 
    minimumContrastStandard
} from './minimumContrastStandards'

export class ColorTools {


    static WCAGContrastRatio(foreground: Color, background: Color) {
        const 
            lum1 = foreground.WCAGLuminance,
            lum2 = background.WCAGLuminance;

        const
            brightLuminance = Math.max(lum1, lum2),
            darkLuminance = Math.min(lum1, lum2);

        return (brightLuminance + 0.05) / (darkLuminance + 0.05);
    }

    /**
     * Take a 'base' color and generate a pair of colors.
     * 
     * These generated colors:
     * - Will have the same hue (ish) compared to the base color
     * - Will have good contrast
     * 
     * @param strategy - whether to mess with the saturation, value, or both
     * @param standard - what minimum contrast standard to adhere to
     * @param minIterations - minimum number of times to perform binary search for sufficently contrastmted pair.
     * 
     * @returns an object with a `darkColor` and a `lightColor`, which are 
     * similar to the base color but have contrast betwene them
     */
    static deriveContrastingPair(
        baseColor: Color,
        standard:minimumContrastStandard = 'AAA_text',
        minIterations: number = 3,
        maxIterations: number = 100,
    ): {
        light:Color,
        dark:Color,
        contrastRatio:number,
    } | undefined {

        //check type of args
        if(!Number.isInteger(minIterations) || minIterations <= 0){
            console.trace("minIterations must be integer")
        }

        const desiredContrastRatio = minimumContrastStandards[standard];

        //binary search for good color pair. 

        let progression = 0.5; //in (0,1)

        for(let iterations = 0; iterations < maxIterations; iterations++) {
            //step 1: calculate new interpolated values
            const newSaturations = interpolate(
                baseColor.s,
                progression
            )

            const newValue = interpolate(
                baseColor.v,
                progression
            )

            //step 2: figue out which permutation works best 
            
            const pair1 = {
                light: Color.fromHSV({
                    h: baseColor.h,
                    s: newSaturations.bright,
                    v: newValue.bright
                }),
                dark: Color.fromHSV({
                    h: baseColor.h,
                    s: newSaturations.dark,
                    v: newValue.dark
                }),
            }
            const pair2 = {
                light: Color.fromHSV({
                    h: baseColor.h,
                    s: newSaturations.dark,
                    v: newValue.bright
                }),
                dark: Color.fromHSV({
                    h: baseColor.h,
                    s: newSaturations.bright,
                    v: newValue.dark
                })
            }
            
            const pair1ContrastRatio = ColorTools.WCAGContrastRatio(
                pair1.light,
                pair1.dark
            )

            const pair2ContrastRatio = ColorTools.WCAGContrastRatio(
                pair2.light,
                pair2.dark
            )

            const [candidateContrastRatio,candidatePair] = 
                pair1ContrastRatio > pair2ContrastRatio?
                    [pair1ContrastRatio, pair1]:
                    [pair2ContrastRatio, pair2];


            //step 3 - test contrast ratio,
            if (
                candidateContrastRatio > desiredContrastRatio
                && iterations > minIterations
            ){
                return {
                    contrastRatio:candidateContrastRatio, 
                    ...candidatePair
                };
            }

            //step 4: else, do an iteration

            const nudgeBy = 2 ** -(2 + iterations)  //we start at 1/2
                                                    //then nudge by \pm 1/4
                                                    //then nudge by \pm 1/8
                                                    //etc.
            
            if ( candidateContrastRatio > desiredContrastRatio )
                progression -= nudgeBy;//get closer to base colors
            else
                progression += nudgeBy;//increase contrast

        }

        return undefined;


        /**
         * this function returns two values "geometrically centered"
         * around `center`. the difference between values will be progression.
         * 
         * All values, inputs, and outputs are bounded on [0,1]
         * 
         * Larger values are described as "bright", and lower values
         * are described as "dark".
         * 
         * ## What's "Geometrically Centered" mean?
         * 
         * Two numbers bright,dark in the range [0,1] are "geometrically 
         * centered" around the center point c in range [0,1] iff the ratio 
         * between dark and 1-light = the ratio between center and 1-center.
         * 
         * ## What?
         * 
         * The importnace of this ratio is best explained by a diagram, so i'm 
         * gonna ask you to break out pen and and paper.
         * 
         * you're gonna draw a graph. you only need the +x,+y quadrant.
         * - create a dashed square box with corners at the origin and (1,1).
         * - make a point 'p' at (0,center).
         *      - choose any value for `center` in the interval [0,1]
         * - draw a line segment from p to (1,1)
         * - draw a line segment from p to (1,0)
         * 
         * 
         * @param center 
         * @param progression 
         * @returns 
         */
        function interpolate(
            center: number,
            progression: number
        ) {
            const
                slopeBright = 1 - center,
                slopeDark = -center;

            return {
                bright: center + slopeBright * progression,
                dark: center + slopeDark * progression,
            }
        }
        
        
    }
}