import {facultyResponse, sectionResponse, meetingsFacultyResponse} from '../scrape/ellucianResponseTypes'
import {section, trinaryInt, faculty, schedule, weekdayList} from  './sectionTypes'

function getFaculty(
    ellucianSection: sectionResponse
):faculty[] {
    return ellucianSection.faculty.map( ellucianFaculty => ({
        id: +ellucianFaculty.bannerId,
        email: ellucianFaculty.emailAddress,
        name: ellucianFaculty.displayName,
    }))
}

function getMeetings(
    ellucianSection: sectionResponse
): schedule[] {
    let meetings: schedule[] = [];

    for(const mf of ellucianSection.meetingsFaculty) {
        let weekdays = (
            mf.meetingTime.monday    ? 'm' : '-' +
            mf.meetingTime.tuesday   ? 't' : '-' +
            mf.meetingTime.wednesday ? 'w' : '-' +
            mf.meetingTime.thursday  ? 'r' : '-' +
            mf.meetingTime.friday    ? 'f' : '-' 
        ) as weekdayList

        meetings.push({
            begins: +mf.meetingTime.beginTime,
            ends: +mf.meetingTime.endTime,
            room: (
                mf.meetingTime.building + 
                ' ' +
                mf.meetingTime.room
            ),
            weekdays         
        })
    }

    return meetings
}

export default function translateSection(
    responseToTranslate:sectionResponse
): section {
    return  {
        CRN: +responseToTranslate.courseReferenceNumber,
        semesterID: +responseToTranslate.term,
        
        courseAbb: responseToTranslate.subjectCourse,
        courseName: responseToTranslate.courseTitle,
        section: +responseToTranslate.sequenceNumber,
        
        creditHours: responseToTranslate.creditHourLow,
        express: null, //TODO: FIX ME
        faculty: getFaculty(responseToTranslate),
        independentStudy: 0, //TODO: IMPLEMENT ME
        online: null, //TODO: IMPLEMENT ME
        schedule: getMeetings(responseToTranslate),
        seatsAvailable: responseToTranslate.seatsAvailable,
        seatsMaximum: responseToTranslate.maximumEnrollment,
    }
}