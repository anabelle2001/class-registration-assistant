import { readdir } from 'node:fs/promises';

function isJavascriptOrTypescript(filePath: string) {
    return (
        filePath.endsWith('.ts') || 
        filePath.endsWith('.js')
    )
}


let sourceFileList = 
    (await readdir('src/scripts'))
    .filter(isJavascriptOrTypescript)
    .map(path => `src/scripts/${path}`)

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

await Bun.spawn(bundlerArgs,{stdout:"inherit"}).exited