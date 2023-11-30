//THIS FILE WAS GENERATED PRIMARILY BY OPENAI.

import { generateCourseListFromSectionResponse } from './course'
import { sectionResponse } from '../scrape/ellucianResponseTypes';
import { course, section } from './sectionTypes';
import { describe, expect, it} from "bun:test"
import { BunFile } from 'bun';


let testDataFile = Bun.file('ellucianResponseTestingData.json')
let testData: sectionResponse[];

//@ts-ignore
await
describe('ellucianResponseTestingData.json', async ()=>{
    await it('should exist', async()=>{
        expect(await testDataFile.exists()).toBeTrue()
    })
    await it('should contain json array of size 10', async()=>{
        testData = await testDataFile.json() as sectionResponse[];
        expect(testData).toBeArray()
        expect(testData.length).toBe(10)
    })
})

//@ts-ignore
await 
describe('generateCourseListFromSectionResponse', () => {
    it('returns an empty array when given an empty section response', () => {
        const result = generateCourseListFromSectionResponse([]);
        expect(result).toEqual([]);
    });

    it('should return an array of unique items', () => {
        const result = generateCourseListFromSectionResponse(testData);
        for(let i = 0; i < result.length; i++){
            for(let j = i+1; j < result.length; j++){
                const earlierSection = result[i]
                const laterSection = result[j]
                // console.log("comparing ",i,'to',j);
                
                expect(earlierSection).not.toEqual(laterSection)
            }
        }
    });

    // it('throws an error when sections contain multiple terms', () => {
    //     const sections: sectionResponse[] = [
    //         {
    //             term: 'Fall 2023',
    //             subjectCourse: 'CS101',
    //             courseTitle: 'Intro to Computer Science',
    //             creditHourLow: 3,
    //         },
    //         {
    //             term: 'Spring 2024',
    //             subjectCourse: 'CS102',
    //             courseTitle: 'Advanced Computer Science',
    //             creditHourLow: 4,
    //         },
    //     ];

    //     expect(() => generateCourseListFromSectionResponse(sections)).toThrowError(
    //         'AssertionError: expected parameter sections to only contain sections from one term'
    //     );
    // });
});
