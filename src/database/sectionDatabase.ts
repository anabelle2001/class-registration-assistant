import { Database, Statement } from "bun:sqlite";
import * as path from 'path';
import translateClass from "./translateClass";
import {DatabaseUpdater} from '../scrape/databaseUpdater'
import { section } from "./sectionTypes";

class SectionDatabase {    
    SQLiteOBJ: Database;
    data: {[key: number]: section[]} = {};
    databaseUpdater: DatabaseUpdater

    constructor(path: string) {
        this.SQLiteOBJ = new Database(path);
        this.loadFromSQLite()
        this.databaseUpdater = new DatabaseUpdater();

        // this.__initializeEnrollmentMethods()

    }

    __initializeEnrollmentMethods(){

        this.insertEnrollmentRecord = this.SQLiteOBJ.prepare(`
            INSERT INTO enrollment (
                SID,
                CRN,
                maxSeats,
                filledSeats,
                atTime
            ) VALUES (
                $SID,
                $CRN,
                $maxSeats,
                $filledSeats,
                CURRENT_TIMESTAMP
            )
        `);

        this.appendCurrentCapacityOfSectionsIntoSQLite = (
            this.SQLiteOBJ.transaction((s: section) => {
                this.insertEnrollmentRecord.run({
                    $SID: s.semesterID,
                    $CRN: s.CRN,
                    $maxSeats: s.seatsMaximum,
                    $filledSeats: s.seatsMaximum-s.seatsAvailable,
                })
            })
        ) as CallableFunction as (x: section[]) => void
    }

    writeToSQLite() {
        
    }

    loadFromSQLite() {
        
    }
    
    insertEnrollmentRecord: Statement
    appendCurrentCapacityOfSectionsIntoSQLite: (x: section[]) => void

    async updateSemesterFromInternet(semesterID:number){
        const downloadedData = await this
            .databaseUpdater
            .getSectionListResponse(String(semesterID))

        const newData = downloadedData.map(translateClass)

        newData.forEach((section)=>{
            this.SQLiteOBJ
        })

        this.data[semesterID] = newData;

        
    }

    static instance: SectionDatabase;
    static getInstance(): SectionDatabase{
        let path = "sql/classData.sqlite3"
        if(this.instance == undefined){
            this.instance = new SectionDatabase(path);
            return this.instance;
        } else {
            return this.instance;
        }
    }
};

export default SectionDatabase.getInstance();

Bun.db = SectionDatabase.getInstance()
// External Links: 
// [1]: https://bun.sh/docs/api/sqlite
// [2]: <https://stackoverflow.com/questions/73339396/how-does-nodejs-handle-relative-paths>
