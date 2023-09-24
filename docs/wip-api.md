[
  {
    "id": 145013,
    "term": "202410",
    "courseReferenceNumber": "10001",
    "partOfTerm": "1",
    "courseNumber": "200",
    "subject": "AAST",
    "sequenceNumber": "01",
    "scheduleTypeDescription": "Lecture",
    "courseTitle": "Introduction to African American Studies",
    "creditHours": null,
    "maximumEnrollment": 30,
    "enrollment": 30,
    "seatsAvailable": 0,
    "waitCapacity": 0,
    "waitCount": 0,
    "waitAvailable": 0,
    "crossList": null,
    "crossListCapacity": null,
    "crossListCount": null,
    "crossListAvailable": null,
    "creditHourHigh": null,
    "creditHourLow": 3,
    "creditHourIndicator": null,
    "openSection": false,
    "linkIdentifier": null,
    "isSectionLinked": false,
    "courseName": "AAST200",
    "faculty": [
      {
        "bannerId": "24349",
        "class": "net.hedtech.banner.student.faculty.FacultyResultDecorator",
        "courseReferenceNumber": "10001",
        "displayName": "Mahoney, Antron",
        "emailAddress": "mahoneyad@cofc.edu",
        "primaryIndicator": true,
        "term": "202410"
      }
    ],
    "meetingsFaculty": [
      {
        "category": "01",
        "class": "net.hedtech.banner.student.schedule.SectionSessionDecorator",
        "courseReferenceNumber": "10001",
        "faculty": [],
        "meetingTime": {
          "building": "MYBK",
          "campus": "M",
          "class": "net.hedtech.banner.general.overall.MeetingTimeDecorator",
	  "classDuration": "1000-1050",
          "creditHourSession": 3.0,
          "endDate": "12/11/2023",
          "hoursWeek": 2.5,
          "meetingScheduleType": "LEC",
          "meetingType": "CLAS",
	  "meetsOn": "m-w-f"
          "room": "302",
          "startDate": "08/22/2023",
          "term": "202410",
	  
        },
        "term": "202410"
      }
    ],
    "reservedSeatSummary": null,
    "sectionAttributes": [
      {
        "code": "REIU",
        "courseReferenceNumber": "10001",
        "description": "REI - US",
        "isZTCAttribute": false,
        "termCode": "202410"
      }
    ],
    "online": "false"
  }



Ignoring "class":"net.hedtech.banner.student.schedule.SectionSessionDecorator"... etc. as requested

removed Monday - Sunday variables and replaced them with meetsOn variable which can either be m-w-f or t-r

replaced subjectCourse with courseName

removed campusDescription, subjectDescription, buildingDescription, meetingTypeDescription, termDesc. Didn't really seem necessary, the abbreviated verison isn't hard to interpret.

combine beginTime and endTime and rename to classDuration 

instead of doing instructionalMethod, instructionalMethodDescription, just do a boolean that is online: true/false.

removed CRN from meetingsFaculty, didn't seem necessary to have in that category.

removed category, doesn't seem to help clairfy anything.

Independent study courses are keeping a couple outliers to the rest of the courses for a json file, was wondering if we had the capability to separate these into two API's to shorten this one down substantially.

I don't know if we need all of the waitlist variables so I left them in for now.
