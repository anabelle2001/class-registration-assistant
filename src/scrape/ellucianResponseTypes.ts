export type sectionListResponse = {
    success: boolean

    /**The number of sections returned by the query*/
    totalCount: number;

    /**The data returned by the query */
    data: sectionResponse[]
    pageOffset: number
    pageMaxSize: number
    sectionsFetchedCount: number
    pathMode: string
    searchResultsConfigs: null
    ztcEncodedImage: string
}


export type sectionResponse = {
    id: number
    term: string
    termDesc: string
    courseReferenceNumber: string
    partOfTerm: string
    courseNumber: string
    subject: string
    subjectDescription: string
    sequenceNumber: string
    campusDescription: string
    scheduleTypeDescription: string
    courseTitle: string
    creditHours: null
    maximumEnrollment: number
    enrollment: number
    seatsAvailable: number
    waitCapacity: number
    waitCount: number
    waitAvailable: number
    crossList: null
    crossListCapacity: null
    crossListCount: null
    crossListAvailable: null
    creditHourHigh: null
    creditHourLow: number
    creditHourIndicator: null
    openSection: boolean
    linkIdentifier: null
    isSectionLinked: boolean
    subjectCourse: string
    faculty: facultyResponse[]
    meetingsFaculty: meetingsFacultyResponse[]
}

export type facultyResponse = {
    bannerId: string
    category: null
    class: string
    courseReferenceNumber: string
    displayName: string
    emailAddress: string
    primaryIndicator: boolean
    term: string
}

export type meetingsFacultyResponse = {
    category: string
    class: string
    courseReferenceNumber: string
    term: string
    faculty: []
    meetingTime: meetingTimeResponse
}

export type meetingTimeResponse = {
    beginTime: string
    building: string
    buildingDescription: string
    campus: string
    campusDescription: string
    category: string
    class: string
    courseReferenceNumber: string
    creditHourSession: number
    endDate: string
    endTime: string
    hoursWeek: number
    meetingScheduleType: string
    meetingType: string
    meetingTypeDescription: string
    room: string
    sunday: boolean
    monday: boolean
    tuesday: boolean
    wednesday: boolean
    thursday: boolean
    friday: boolean
    saturday: boolean
    startDate: string
    term: string
}
