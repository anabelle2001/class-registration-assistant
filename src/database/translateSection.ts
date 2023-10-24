import {facultyResponse, sectionResponse} from '../scrape/ellucianResponseTypes'
import {section, trinaryInt, faculty, schedule} from  './sectionTypes'

export default function translateSection(
    responseToTranslate:sectionResponse
): section {
    let convertedSection:section =  {
        CRN: +responseToTranslate.courseReferenceNumber,
        semesterID: +responseToTranslate.term,
        
        courseName: responseToTranslate.subjectCourse,
        section: +responseToTranslate.sequenceNumber,
        
        creditHours: responseToTranslate.creditHourLow,
        express: null, //TODO: FIX ME
        faculty: [],//TODO: IMPLEMENT ME
        independentStudy: 0, //TODO: IMPLEMENT ME
        online: null, //TODO: IMPLEMENT ME
        schedule: [], //TODO: IMPLEMENT ME
        seatsAvailable: responseToTranslate.seatsAvailable,
        seatsMaximum: responseToTranslate.maximumEnrollment,
    }

    for(let i = 0; i < responseToTranslate.faculty.length ; i++)
    {
        let facultyToTranslate = responseToTranslate.faculty[i]

        let newFacObj:faculty = {
            id: +facultyToTranslate.bannerId,
            email: facultyToTranslate.emailAddress,
            name: facultyToTranslate.displayName,
            
        }

        convertedSection.faculty.push(newFacObj)
    }

    // for(let i = 0; i < responseToTranslate.meetingsFaculty.length ; i++)
    // {
    //     let scheduleToTranslate = responseToTranslate.meetingsFaculty[i]

    //     let newSchObj:schedule = {
    //         begins: +scheduleToTranslate.begins,
    //         ends: +scheduleToTranslate.ends,
    //         weekdays: scheduleToTranslate.weekdayList,
    //         room: scheduleToTranslate.room,

    //     }

    //     convertedSection.schedule.push(newSchObj)
    // }


    return convertedSection
}