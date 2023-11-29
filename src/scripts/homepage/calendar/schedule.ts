import { Color } from "../../common/colors/colors";
import { ColorTools } from '../../common/colors/accessibleColor'
import { computeTextColor,computeBackgroundColor } from "./calendarColors";

document.querySelectorAll('#WeeklySchedule .meeting').forEach(el=>{
    let ell = el as HTMLElement;

    const foo = Color.random()
    const {dark,light} = ColorTools.deriveContrastingPair(foo)

    ell.style.color = dark.hex;
    ell.style.backgroundColor = light.hex+'ff';
    ell.style.borderLeft = `solid ${dark.hex}`;
})