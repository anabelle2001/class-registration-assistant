import { Color } from "./colors";
import { computeTextColor,computeBackgroundColor } from "./calendarColors";

setInterval(()=>{
    document.querySelectorAll('.week').forEach(el=>{
        let ell = el as HTMLElement;

        const foo = Color.random()
        const bg = computeBackgroundColor(foo)
        const tx = computeTextColor(foo)

        ell.style.color = tx.hex;
        ell.style.backgroundColor = bg.hex+'88';
        ell.style.borderLeft = `solid ${foo.hex}`;
        console.log({bg,tx})
    })
},1000)