import { Database } from "bun:sqlite";
import * as path from 'path';

export const classDB: Database = new Database("database/classData.sqlite3");


// External Links: 
// [1]: https://bun.sh/docs/api/sqlite
// [2]: <https://stackoverflow.com/questions/73339396/how-does-nodejs-handle-relative-paths>
