import { Database, Statement } from "bun:sqlite";
import * as path from 'path';
import translateClass from "./translateClass";
import {DatabaseUpdater} from '../scrape/databaseUpdater'
import { section } from "./sectionTypes";

class SectionDB {    
    SQLiteOBJ: Database;
    data: {[key: number]: section[]};
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
            .getSectionListResponse(String(semesterID),50)

        const newData = downloadedData.map(translateClass)

        newData.forEach((section)=>{
            this.SQLiteOBJ
        })

        this.data[semesterID] = newData;

        
    }

    static instance: SectionDB;
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
