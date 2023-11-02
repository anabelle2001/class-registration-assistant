# Sections
Returns a list of sections contained in a particular semester.

## Basic Info

|||
-|-
URL | `/api/section/`
Method | GET
On Success | Returns a JSON array containing Section objects.
On Failure | Returns an empty array.


## Examples
Get a list of classes for Fall 2023
### Request:
```js
fetch("/api/section/?semesterID=202410")
```

### Response:
```json
[
  {
    "CRN": 10001, 
    "semesterID": 202410, //Fall 2023
    "express": 1, //Express I class.
    "section": 1, // Section 1 of AAST200
    "online": 0, // Not an online class
    "independentStudy": 0, // Not an independent study
    "seatsMaximum": 30, // A maximum of 30 students can enroll in the class
    "seatsAvailable": 0, // The class is full
    "creditHours": 3,
    "courseName": "AAST200",// African American Studies 200
    "faculty": [//Array because class may have multiple faculty.
      {
        "id": 24349,
        "name": "Mahoney, Antron",
        "email": "mahoneyad@cofc.edu",
      }
    ],
    "schedule": [ //Array because class may have multiple meet times
      {
        "weekdays": "m-w-f",//Meets on mondays, wednesdays, and fridays
        "begins": 1000, //24-Hour start time
        "ends": 1050, //24-Hour end time
        "room": "MYBK 302"//
      }
    ],
  }
]
```


## Request Schema
Parameters:

### semesterID
| Informal Semester Name | Semester ID |
|------------------------|-------------|
| Fall 2023              | 202410      |
| Spring 2024            | 202420      |
| Summer 2024            | 202430      |


## Response Schema

### Section
| Key Name         | Example | Type                 | Description
| -                | -       | -                    | -
| CRN              | 10001   | Five digit integer   | Corresponds to section's CRN.
| semesterID       | 202410  | Six digit integer    | Corresponds to semester ID.
| express          | 1       | Integer (0, 1, or 2) | 0 - Full semester class. (not express)<br>1 - Express I Class.<br>2 - Express II Class.
| section          | 1       | Integer              | Informally referred to as a "section number", this number is used to enumerate different sections of the same class.
| online           | 0       | Integer (0, 1, or 2) | 0 - Not an online class.<br>1 - Online, but synchronous <br>2 - Online, and asynchronous.
| independentStudy | 0       | "Boolean" (0 or 1)   | Truthy (1) if the class is an independent study. Falsy (0) if the class is not.
| seatsMaximum     | 30      | Integer              | The maximum number of students allowed to enroll in the class. Typically between 0 and 150.
| seatsAvailable   | 0       | Integer              | The number of open seats in a class. If the value is <= 0, you cannot register for the class.
| creditHours      | 3       | Integer              | The number of credit hours that can be earned by passing the class. 
| courseName       |"AAST200"| String[7]            | The four-letter department code plus the three-digit course number.
| faculty          | [{...}] | Array of Faculty     | List of faculty teaching the class. Ordered so that primary faculty come first.
| schedule         | [{...}] | Array of Meetings    | List of weekdays/time pairs of when the class meets. Sorted in descending order by hours met per week. 

### Faculty
| Key Name         | Example              | Type                 | Description
| -                | -                    | -                    | -
| id               | 24349                | Integer              | Internal ID used to track faculty
| name             | "Mahoney, Antron"    | String               | Lastname, Firstname of faculty member
| email            | "mahoneyad@cofc.edu" | String               | email address of faculty memeber

### Meeting
| Key Name | Example | Type                 | Description
| -        | -       | -                    | -
| days     | '-t-r-' | String[5]            | Days in which the class will meet at the marked time. For each (M)onday, (T)uesday, (W)ednesday, Thu(R)sday, and (F)riday, the `days` string will contain the abbreviation letter if it meets that day. if the class does not meet that day, a dash is used instead.
| begins   | 1000    | Integer              | Class start time in EDT. 24-hour format
| ends     | 1050    | Integer              | Class start time in EDT. 24-hour format
