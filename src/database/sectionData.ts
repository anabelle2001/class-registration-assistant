import { Database, Statement } from "bun:sqlite";
import * as path from 'path';
import { Faculty, Schedule, Section } from "../types";

class SectionDB {
    static instance: SectionDB;
    SQLiteOBJ: Database;
    data: Section[];
    
    constructor(path: string) {
        this.SQLiteOBJ = new Database(path);
        this.loadFromSQLite()
    }

    writeToSQLite() {
        
    }

    loadFromSQLite() {
        const basicSectionData = this.SQLiteOBJ.query<Section,any>("SELECT * FROM SECTION").all()
        
        const getTeachersFromCRN = this.SQLiteOBJ.query<Faculty,any>("select * from faculty where fid in (select fid from teaches where crn = $1);")

        const getMeetingsFromCRN = this.SQLiteOBJ.query<Schedule,any>("select * from meetsOn where CRN = $1;")

        basicSectionData.forEach((section) => {
            let CRN = section.CRN;
            section.faculty = getTeachersFromCRN.all(String(CRN));
            section.schedule = getMeetingsFromCRN.all(String(CRN));
        });

        this.data = basicSectionData;
    }

    
    
    static getInstance(path:string): SectionDB{
        if(this.instance == undefined){
            this.instance = new SectionDB(path);
            return this.instance;
        } else {
            return this.instance;
        }
    }
};

export let classDB = SectionDB.getInstance("sql/classData.sqlite3");

// External Links: 
// [1]: https://bun.sh/docs/api/sqlite
// [2]: <https://stackoverflow.com/questions/73339396/how-does-nodejs-handle-relative-paths>