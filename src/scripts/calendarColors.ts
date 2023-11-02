// Marked portions of this file are (c) 2018, by Jozef Legény
// Original file taken from his blog @
// <https://yozy.net/files/downloads/2018/apple-calendar-colors.js>
// Any modifications by Anabelle VanDenburgh are public domain.


import {hsv,rgb,color,Color} from './colors'

// colorTools is (C) 2018, by Jozef Legény
const colorTools = {
    light: {
        text: Color.fromHEX("#a8a8a8"),
        background: Color.fromHEX("#f8f8f8"),
    },
    dark: {
        text: Color.fromHEX("#000000"),
        background: Color.fromHEX("#1a1a1a"),
    },

    isLight(color: hsv) {
        return color.v > 0.6 && color.s < 0.1
    },

    isDark(color: hsv) {
        return color.v < 0.3
    },

    isGray(color: hsv) {
        return color.s < 0.1
    },

    bgBrightness(color: hsv) {
        return Math.min(color.v * 1.5, 1)
    },
    
};

/**
 * Calculates and returns a tinted text color
 * 
 * @copyright 2018, by Jozef Legény
 * @param color the base color to derive the text color from
 */
export function computeTextColor(color: Color) {

    const { h, s, v, r, g, b } = color

    if (colorTools.isLight(color)) {
        return colorTools.light.text;
    } else if (colorTools.isDark(color)) {
        return colorTools.dark.text;
    } else {
        const rs = colorTools.isGray(color) ? 0 : Math.max(s, 0.5);
        const rv = v - 0.35;
        return Color.fromHSV({
            h,
            s: rs,
            v: Math.max(rv, 0.3)
        })
    }
}

/**
 * Calculates and returns a tinted background color
 * 
 * @copyright 2018, by Jozef Legény
 * @param color the base color to derive the background color from
 */
export function computeBackgroundColor(color: Color) {
    if (!(color instanceof Color)) {
        console.trace("Variable",color,", is not `instanceof` Color")
    }

    if (colorTools.isLight(color))
        return colorTools.light.background;

    if (colorTools.isDark(color))
        return colorTools.dark.background;

    const { h, s, v } = color;
    let rs = colorTools.isGray(color) ? 0 : s;
    return Color.fromHSV({
        h, 
        s:rs, 
        v: colorTools.bgBrightness(color)
    });
}