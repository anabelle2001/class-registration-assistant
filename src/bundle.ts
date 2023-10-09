import { readdir } from 'node:fs/promises';

//Spawns a subprocess to get the names of all the scripts we need to compile
let findScriptsSubprocess = Bun.spawn([
    'find',
    './src/scripts',
    '-name',
    '*.ts',
])

/* in this next line, we get the text output of that process (eg: an array of strings, with each string being a path to a file).

The @ts-ignore is because I haven't figured out how to tell typescript that our bun environment supports async in the body of a file.*/

// @ts-ignore
let sourceFileList = (await new Response(findScriptsSubprocess.stdout).text()).split('\n').filter(str => str != '');


let bundlerArgs = [
    'bun',//We want to run bun, the program
    'build',
    '--watch',//Recompile the javascript whenever the typescript updates
    '--splitting',
    '--target','browser',
    '--sourcemap',
    '--outdir','./public/scripts',
    ...sourceFileList
]

console.log(`Starting bun build:`);
console.log(bundlerArgs);



Bun.spawn(bundlerArgs,{stdout:"inherit"})
// await ps.exited