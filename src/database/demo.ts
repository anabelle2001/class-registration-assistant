// This file creates a [Database][1] Object to be used in the demo api.
// It's used to store the data used in ./api/demo.ts
import { Database } from "bun:sqlite";

export const pixarDB: Database = new Database("database/demo.sqlite3");


// External Links: 
// [1]: https://bun.sh/docs/api/sqlite
// [2]: <https://stackoverflow.com/questions/73339396/how-does-nodejs-handle-relative-paths>
