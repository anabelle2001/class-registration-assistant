import { Database, Statement } from "bun:sqlite";
import * as path from 'path';
import translateSection from "./translateSection";
import { section } from "./sectionTypes";

import { getAuthHeaders } from '../scrape/authenticate'
import { listSectionsResponse, sectionResponse, term } from '../scrape/ellucianResponseTypes'
import { getSections } from '../scrape/getSections'
import { getSemesters } from '../scrape/getSemesters'
import { sleep } from "bun";
import { inMilliseconds } from "../scrape/millisecondDurations";

export class SectionDatabase {    
    SQLiteOBJ: Database;
    data: {[key: string]: section[]} = {};
    semesterList: term[]
    domain: string

    constructor(
        path: string,
        domain: string = 'ssb.cofc.edu'
    ) {
        this.SQLiteOBJ = new Database(path);
        this.loadFromSQLite()
        this.domain = domain
        this.loadFromJSON('202410')
        this.loadFromJSON('202420')
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

    writeToSQLite() { }
    loadFromSQLite() { }

    async loadFromJSON(SID: string){
        let fileContents = await Bun.file(`./json/${SID}.json`)
        let data = await fileContents.json() as sectionResponse[];
        this.data[SID] = data.map(translateSection);
    }
    
    insertEnrollmentRecord: Statement
    appendCurrentCapacityOfSectionsIntoSQLite: (x: section[]) => void

    async updateSemesterList(){
        this.semesterList = await getSemesters()
    }

    getSemester(semesterID:string): term | null {

        for (let i = 0; i < this.semesterList.length; i++) {
            if (this.semesterList[i].code == semesterID) {
                return this.semesterList[i]
            }
        }
        return null
    }

    async updateSections(semesterID:string){
        console.log("updating....")

        if (semesterID == undefined){
            throw new Error("No semester given");

        }

        await this.updateSemesterList()
        if (this.getSemester(semesterID) == null) {
            throw new Error("No such semester:"+semesterID);
        }
        
        let auth = await getAuthHeaders(this.domain);
        const numSections = 200 //(await getSections(semesterID,auth,0,0)).totalCount
        let newSectionList:section[] = [];

        
        for (let i = 0; i < numSections; i+=50) {
            console.info(
                "Downloading Sections... ",
                Math.round(100*i/numSections),
                "%",
            )

            let response: listSectionsResponse;

            try {
                response = await getSections(semesterID, auth, 50, i)
            } catch (error) {
                
                console.log("Request was denied - trying new authentication")

                auth = await(getAuthHeaders(this.domain))
                continue
            }

            newSectionList.push(...response.data.map(translateSection))
            await sleep(inMilliseconds(3,"seconds"))
        }

        this.data[semesterID] = newSectionList
        
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

Bun.global = {sdb: SectionDatabase.getInstance}
