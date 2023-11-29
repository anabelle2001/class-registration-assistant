type major = {
	degName: string,
	minCredits: number,
	requiredCourses: (course | string)[],
    //Need some way to establish conditional courses (# of from a list, # of from above a certain threshold) since not every degree
            //has conditional requirements, or have different #s of them
    //Also maintain a section for elective courses, which'll have its own set of conditions
        //Can this really be defined like this?
}

type course = {
    courseName: string,
    courseAbb: string,
    CRN: number,
    instructor: string[],
}