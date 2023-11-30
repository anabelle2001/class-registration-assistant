import { sectionResponse } from "../scrape/ellucianResponseTypes";
import { course } from "./sectionTypes";

export function generateCourseListFromSectionResponse(
    sections: sectionResponse[]
): course[] {
    if (sections.length == 0){
        return []
    } 

    const 
        sid = sections[0].term,  
        courses = [] as course[],

        //course abbreviations
        courseAbbs = [] as string[];

    for (const section of sections) {
        if (section.term != sid) {
            throw new Error("AssertionError: expected parameter sections to only contain sections from one term")
        }

        const
            courseAbb = section.subjectCourse,
            courseName = section.courseTitle,
            sectionCreditHours = section.creditHourLow;

        if (courseAbbs.includes(courseAbb)) {
            const courseRecord = courses.find(
                candidate => candidate.courseAbb == courseAbb
            )

            if (courseRecord.credits != sectionCreditHours) {
                courseRecord.credits="depends"
            }

        } else {
            courseAbbs.push(courseAbb)
            courses.push({
                sid,
                courseAbb,
                courseName,
                credits: sectionCreditHours
            })
        }

    }

    // console.log(courses);
    
    return courses
}