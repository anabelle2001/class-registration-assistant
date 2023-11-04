import { Color, color } from "./colors";
import {
    minimumContrastStandards, 
    minimumContrastStandard
} from './minimumContrastStandards'

export class AccessibleColor extends Color {
    __luminance__ : number

    constructor(values: color){
        super(values)
    }
    
    get luminance() {
        if (this.__luminance__ !== undefined) {
            return this.__luminance__
        }
        const { r, g, b } = this;

        const RED = 0.2126;
        const GREEN = 0.7152;
        const BLUE = 0.0722;

        const GAMMA = 2.4;

        var a = [r, g, b].map((intensity) => {
            intensity /= 255; //map intensity from 0-255 to 0-1
            return intensity <= 0.03928
                ? intensity / 12.92
                : Math.pow((intensity + 0.055) / 1.055, GAMMA);
        });
        this.__luminance__ = a[0] * RED + a[1] * GREEN + a[2] * BLUE;
        return this.__luminance__;
    }


    static contrastRatio(foreground: AccessibleColor, background: AccessibleColor) {
        const lum1 = foreground.luminance,
            lum2 = background.luminance;
        const brightLuminance = Math.max(lum1, lum2),
            darkLuminance = Math.min(lum1, lum2);

        return (brightLuminance + 0.05) / (darkLuminance + 0.05);
    }
    contrastRatio(foreground:AccessibleColor) {
        return AccessibleColor.contrastRatio(this,foreground)
    }

    static fromHEX(color: `#${string}`): AccessibleColor {
        return new AccessibleColor(super.fromHEX(color))
    }

    static fromHSV(color: hsv): AccessibleColor {
        return super.fromHSV(color) as AccessibleColor
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
     * @param minIterations - minimum number of times to perform binary search for sufficently contrastted pair.
     * 
     * @returns an object with a `darkColor` and a `lightColor`, which are 
     * similar to the base color but have contrast betwene them
     */
    deriveContrastingPair(
        strategy: "saturation" | 'value' | 'both',
        standard:minimumContrastStandard,
        minIterations: number
    ): false | {
        darkColor:AccessibleColor,
        lightColor:AccessibleColor
    } {
        if(!Number.isInteger(minIterations) || minIterations <= 0){
            console.trace("minIterations must be integer")
        }

        //step 1, check if possible

        const desiredContrastRatio = minimumContrastStandards[standard];
        let prevContrastRatio = 1
        let candidateProgression = 0.5

        for(
            let i = 0;
            i < minIterations || prevContrastRatio < desiredContrastRatio;
            i++
        ){
            switch (strategy) {
                case 'saturation':
                    let newSaturations = interpolate(
                        this.s,
                        candidateProgression
                    )

                    prevContrastRatio = AccessibleColor.contrastRatio(
                        AccessibleColor.fromHSV({

                        }),
                        AccessibleColor.fromHSV({

                        })
                    )

                    break;
            
                case 'value':

                    break;
                case 'both':

                    break;
                default:
                    break;
            }
            prevContrastRatio =0;
        }


        return false;


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

            return [
                center + slopeBright * progression,
                center + slopeDark * progression,
            ]
        }
        
        
        
    }
}