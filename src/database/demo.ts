// This file creates a [Database][1] Object to be used in the demo api.
// It's used to store the data used in ./api/demo.ts
import { Database } from "bun:sqlite";
import * as path from 'path';

//Code to calcuate database path stolen from [Stackoverflow][2]
const __dirname = new URL('.', import.meta.url).pathname;
const dbPath = path.join(__dirname, "demo.sqlite3");

// console.log(dbPath)

export const pixarDB: Database = new Database(dbPath);


// External Links: 
// [1]: https://bun.sh/docs/api/sqlite
// [2]: <https://stackoverflow.com/questions/73339396/how-does-nodejs-handle-relative-paths>
