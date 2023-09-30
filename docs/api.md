# API
## Unauthenticated Endpoints:
### /api/classes

returns a JSON object containing a representation of all classes.

#### Parameters
None.

#### Response:

[
  {
    "courseReferenceNumber": "10001", //CRN of course
    "partOfTerm": "1", //used to identify whether a course is full-semester, express 1, or express 2.
    "sequenceNumber": "01", //section number
    "scheduleTypeDescription": "Lecture", //Used to create IndependentStudy, Online variables
    "courseTitle": "Introduction to African American Studies",//stored on server in courses api?
    "maximumEnrollment": 30,
    "enrollment": 30,
    "sectionAttributes": [
      {
        "code": "REIU",
        "courseReferenceNumber": "10001",
        "description": "REI - US",
        "isZTCAttribute": false,
        "termCode": "202410"
      }
    ]
  }
    "seatsAvailable": 0,
    "waitCapacity": 0,
    "waitCount": 0,
    "waitAvailable": 0,
    <!-- "crossList": null,
    "crossListCapacity": null,
    "crossListCount": null,
    "crossListAvailable": null, --> //this is null for 93% of classes. i don't know what it does
    <!-- "creditHourHigh": null, -->//null for most classes.
    "creditHourLow": 3, //becomes credit Hours. 
    <!-- "creditHourIndicator": null, -->
    "openSection": false, //may be removed, iff this can be derived by capacity.
    <!-- "linkIdentifier": null, -->
    <!-- "isSectionLinked": false, -->
    "courseName": "AAST200",
    "faculty": [
      {
        "bannerId": "24349",
        <!-- "class": "net.hedtech.banner.student.faculty.FacultyResultDecorator", -->
        <!-- "courseReferenceNumber": "10001", -->
        "displayName": "Mahoney, Antron",
        "emailAddress": "mahoneyad@cofc.edu",
        "primaryIndicator": true,
        <!-- "term": "202410" -->
      }
    ],
    "meetingsFaculty": [
      {
        "category": "01",
        "class": "net.hedtech.banner.student.schedule.SectionSessionDecorator",
        "courseReferenceNumber": "10001",
        "faculty": [],
        "meetingTime": {
          <!-- "sunday": false,
          "monday": true,
          "tuesday": false,
          "wednesday": true
          "thursday": false,
          "friday": true,
          "saturday": false, --> //turns into meetsOn


          "beginTime": "1000", //rename to begins
          "endTime": "1050", //rename to ends
          
          <!-- 
          "campus": "M",
          "campusDescription": "Main",
          "buildingDescription": "MAYBANK HALL",
          "building": "MYBK",
          "room": "302", 
          --> //turns into "place": "MYBK 302"
          <!-- "category": "01", -->
          <!-- "class": "net.hedtech.banner.general.overall.MeetingTimeDecorator", -->
          <!-- "courseReferenceNumber": "10001", -->
          <!-- "creditHourSession": 3.0, -->
          <!-- "endDate": "12/11/2023", -->
          <!-- "hoursWeek": 2.5, -->
          <!-- "meetingScheduleType": "LEC", -->
          <!-- "meetingType": "CLAS", -->
          <!-- "meetingTypeDescription": "Class", -->
          <!-- "startDate": "08/22/2023", Covered by Sequence Number-->
          <!-- "term": "202410", -->
        },
        "term": "202410"
      }
    ],
    <!-- "reservedSeatSummary": null, -->
    "sectionAttributes": [
      {
        "code": "REIU",
        "courseReferenceNumber": "10001",
        "description": "REI - US",
        "isZTCAttribute": false,
        "termCode": "202410"
      }
    ]
  }
]