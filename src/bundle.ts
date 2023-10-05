import { readdir } from 'node:fs/promises';

let findScriptsSubprocess = Bun.spawn([
    'find',
    './src/scripts',
    '-name',
    '*.ts',
])

let sourceFileList = (await new Response(findScriptsSubprocess.stdout).text()).split('\n').filter(str => str != '');


let bundlerArgs = [
    'bun',
    'build',
    '--watch',
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