// Marked portions of this file are (c) 2018, by Jozef Legény
// Original file taken from his blog @
// <https://yozy.net/files/downloads/2018/apple-calendar-colors.js>
// Any modifications by Anabelle VanDenburgh are public domain.


export type rgb = {
    r: number,
    g: number,
    b: number,
};
export type hsv = {
    h: number,
    s: number,
    v: number
};

export interface color extends hsv,rgb {};
export class Color implements color {
    r: number
    g: number
    b: number
    h: number
    s: number
    v: number
    hex: string
    
    constructor(values: color){
        //helper functions assert_is_unit8, assert_is_percentage, and 
        //numberToTwoCharHex are defined at the end of this function,
        //after the constructor returns
        const {r,g,b,h,s,v} = values;

        [r, g, b].forEach(assert_is_uint8);
        [h, s, v].forEach(assert_is_percentage);

        this.r = r;
        this.g = g;
        this.b = b;
        this.h = h;
        this.s = s;
        this.v = v;
        
        this.hex = (
            '#' +
            numberToTwoCharHex(this.r) +
            numberToTwoCharHex(this.g) +
            numberToTwoCharHex(this.b)
        )

        Object.seal(this);
        return;

        function assert_is_uint8(i: number){
            if (i < 0 || i > 255 || i != Math.floor(i))
                console.trace("Expected integer in [0,255]. got", i);
        }
        
        
        function assert_is_percentage(i: number){
            if (i < 0 || i > 1)
                console.trace("Expected float between [0,1]. got",i);
        }


        function numberToTwoCharHex(i: number): string {
            //turns i into a hex of length 1 or 2 (eg: 'f' or 'ff)
            const varLenString = i.toString(16); 

            //pad result with a '0' and return
            return (varLenString.length == 1) ? "0" + varLenString : varLenString;
        }

    }

    /**
     * Takes an HSV, computes the RGB components, and returns a new Color.
     * @param color - a set of hsv values
     * @copyright Jozef Legény, 2018
     */
    static fromHSV(color: hsv): Color {
        const { h, s, v } = color;

        const angle = h == 1 ? 0 : Math.floor(h * 6);
        const u = h == 1 ? 0 : h * 6 - angle;
        const a = v * (1 - s);
        const f = v * (1 - s * u);
        const l = v * (1 - s * (1 - u));
        const c = [
            [v, l, a],
            [f, v, a],
            [a, v, l],
            [a, f, v],
            [l, a, v],
            [v, a, f]
        ];
        

        const r = Math.round(255 * c[angle][0]);
        const g = Math.round(255 * c[angle][1]);
        const b = Math.round(255 * c[angle][2]);

        return new Color({r, g, b, ...color})
    }

    /**
     * Takes an RGB, computes the HSV components, and returns a new Color.
     * @param color - a set of RGB values
     * @copyright Jozef Legény, 2018
     */
    static fromRGB(color: rgb): Color {
        const { r, g, b } = color

        const cmax = Math.max(r, g, b); //Brightest color's value
        const cmin = Math.min(r, g, b); //darkest color's value

        const s = cmax === 0 ? 0 : 1 - cmin / cmax;
        const v = cmax / 255;

        let h;
        if (cmax == cmin) {
            h = 0
        } else if (cmax == r) {
            h = (g - b) / (cmax - cmin) / 6;
        } else if (cmax == g) {
            h = (b - r) / (cmax - cmin) / 6 + 1 / 3;
        } else {
            h = (r - g) / (cmax - cmin) / 6 + 2 / 3;
        }

        if (h < 0) {
            h += 1;
        } else if (h > 1) {
            h -= 1;
        }
        return new Color({ h, s, v, ...color });
    }

    static fromHEX(color:`#${string}`): Color{
        if(color.length != 7){
            console.trace("Expected to get a 7 char string")
        }
        const rComponentHex = '0x'+color.slice(1,3);
        const gComponentHex = '0x'+color.slice(3,5);
        const bComponentHex = '0x'+color.slice(5,7);

        return Color.fromRGB({
            r: Number(rComponentHex),
            g: Number(gComponentHex),
            b: Number(bComponentHex),
        })
    }

    static random(){
        return Color.fromRGB({
            r: Math.floor(Math.random() * 255),
            g: Math.floor(Math.random() * 255),
            b: Math.floor(Math.random() * 255),
        })
    }
}
