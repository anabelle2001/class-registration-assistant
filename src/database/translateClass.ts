import {sectionResponse} from '../scrape/ellucianResponseTypes'
import {section} from  './sectionTypes'

export default function translateClass(
    responseToTranslate:sectionResponse
): section {
    return {
        CRN: +responseToTranslate.courseReferenceNumber,
        semesterID: +responseToTranslate.term,
        
        courseName: responseToTranslate.subjectCourse,
        section: +responseToTranslate.sequenceNumber,
        
        creditHours: responseToTranslate.creditHourLow,
        express: 0, //TODO: FIX ME
        faculty: [],//TODO: IMPLEMENT ME
        independentStudy: 0, //TODO: IMPLEMENT ME
        online: 0, //TODO: IMPLEMENT ME
        schedule: [], //TODO: IMPLEMENT ME
        seatsAvailable: responseToTranslate.seatsAvailable,
        seatsMaximum: responseToTranslate.maximumEnrollment,
    }
}