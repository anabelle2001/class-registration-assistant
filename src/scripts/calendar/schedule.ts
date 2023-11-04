import { Color } from "../colors/colors";
import { computeTextColor,computeBackgroundColor } from "./calendarColors";

setInterval(()=>{
    document.querySelectorAll('.meeting').forEach(el=>{
        let ell = el as HTMLElement;

        const foo = Color.random()
        const bg = computeBackgroundColor(foo)
        const tx = computeTextColor(foo)

        ell.style.color = tx.hex;
        ell.style.backgroundColor = bg.hex+'88';
        ell.style.borderLeft = `solid ${foo.hex}`;
    })
},1000)