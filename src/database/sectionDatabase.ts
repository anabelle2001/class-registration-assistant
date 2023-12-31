import { Database, SQLQueryBindings, Statement } from "bun:sqlite";
import * as path from 'path';
import translateSection from "./translateSection";
import { section, course } from "./sectionTypes";
import { getAuthHeaders } from '../scrape/authenticate'
import type {
    listSectionsResponse,
    sectionResponse,
    term 
} from '../scrape/ellucianResponseTypes'
import { getSections } from '../scrape/getSections'
import { getSemestersFromEllucian } from '../scrape/getSemesters'
import { sleep } from "bun";
import { inMilliseconds } from "../millisecondDurations";
import { generateCourseListFromSectionResponse } from "./course";

export class SectionDatabase {    
    SQLiteOBJ: Database;
    sectionData: { [key: string]: section[] } = {};
    courseData: { [key: string]: course[] } = {};
    semesterList: term[]
    domain: string

    constructor(
        path: string,
        domain: string = 'ssb.cofc.edu'
    ) {
        this.domain = domain
        this.SQLiteOBJ = new Database(path);
        this.__initializeEnrollmentMethods()

        this.updateSemesterListFromEllucian().then(()=>{
            for (const semester of this.semesterList)
                this.loadSemesterFromJSON(semester.code);
        })

    }

    
    /**
     * Addsa section to the 
     */
   //Defined in this.__initializeEnrollmentMethods
   insertEnrollmentRecordTransaction: Statement

    /**
     * Prepares SQL transactions required to read and write from 
     * enrollment table (tracks enrollment history)
     */
    __initializeEnrollmentMethods(){
        //First, if the Tables don't exist, create them.
        this.SQLiteOBJ.exec(`
            CREATE TABLE IF NOT EXISTS enrollment(
                SID INTEGER,
                CRN INTEGER,
                maxSeats INTEGER,
                filledSeats INTEGER,
                atTime INTEGER,

                PRIMARY KEY(SID,CRN,atTime)
            );
        `)

        //Prepare trans
    }

    /**
     * Loads a particular semester into the database
     * 
     * @param {string} SID  - 6-digit SID (format: YYYYSS)
     */
    async loadSemesterFromJSON(SID: string){
        let file = await Bun.file(`data/json/${SID}.json`)

        if (await file.exists() == false) {
            return
        }
        console.info("Loading Semester",SID)
        
        let fileContents = await file

        let data = await fileContents.json() as sectionResponse[];
        this.sectionData[SID] = data.map(translateSection);
        this.courseData[SID] = generateCourseListFromSectionResponse(data)
    }
    

    /**
     * Fetches a list of semesters from Ellucian. 
     * Stores result in `this.semesterlist`
     * 
     * 
     * @authentication none required
     * @params none
     * @returns none
     */
    async updateSemesterListFromEllucian(){
        this.semesterList = await getSemestersFromEllucian()
    }

    /**
     * If a semester exists, it returns the `term` object 
     * containing `{SID, name}`
     * 
     * @param SID The 6-digit SID of the semester 
     * @returns {term} The object representing the semester name
    */
    getSemester(SID:string): term | null {

        for (let i = 0; i < this.semesterList.length; i++) {
            if (this.semesterList[i].code == SID) {
                return this.semesterList[i]
            }
        }
        return null
    }

    /**
     * Queries Ellucian to get all classes for a particular semester
     * 
     * BROKEN --- using cached value for demo
     */
    async updateSemesterFromEllucian(SID:string){
        console.log("updating....")

        if (SID == undefined){
            throw new Error("No semester given");
        }

        await this.updateSemesterListFromEllucian()
        if (this.getSemester(SID) == null) {
            throw new Error("No such semester:"+SID);
        }
        
        let auth = await getAuthHeaders(this.domain,SID);

        const numSections = (await getSections(SID,auth,0,0)).totalCount
        
        let newSectionList:section[] = [];

        
        for (let i = 0; i < numSections; i+=50) {
            await sleep(inMilliseconds(1, "seconds"))

            console.info(
                "Downloading Sections... ",
                Math.round(100*i/numSections),
                "%",
            )

            let response: listSectionsResponse;

            try {
                response = await getSections(SID, auth, 50, i)
            } catch (error) {
                
                console.log("Request was denied - trying new authentication")

                for(let i = 1; true; i++) {
                    try {
                        if(i >= 5) {return null}
                        console.log("attempt ",i,"to reauth");
                        
                        await sleep(inMilliseconds(5,'seconds'))
                        auth = await getAuthHeaders(this.domain,SID)
                        break;
                    } catch { }
                }
                continue
            }

            newSectionList.push(...response.data.map(translateSection))
        }

        this.sectionData[SID] = newSectionList
        // this.courseData[SID] = generateCourseListFromSectionResponse(data)
        //save to json

        await Bun.write(
            `json/${SID}.json`,
            JSON.stringify(newSectionList)
        )

        //save to db
        this.writeSemesterAttendanceValues(newSectionList)
        
    }

    writeSemesterAttendanceValues(semester: string | section[]){
        const transaction = this.SQLiteOBJ.prepare(`
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

        const actualSemester = (semester instanceof String) ?
            this.sectionData[semester as string] as section[]:
            semester as section[]
        
        actualSemester.forEach( section => {
            transaction.run({
                $SID: section.semesterID,
                $CRN: section.CRN,
                $maxSeats: section.seatsMaximum,
                $filledSeats: section.seatsMaximum-section.seatsAvailable
            })
        })
    }

    static instance: SectionDatabase;
    static getInstance(): SectionDatabase{
        let path = "data/sql/classData.sqlite3"
        if(this.instance == undefined){
            this.instance = new SectionDatabase(path);
            return this.instance;
        } else {
            return this.instance;
        }
    }
};
