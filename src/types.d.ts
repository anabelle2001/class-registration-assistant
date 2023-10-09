//used
export type Faculty = {
    FID: number;
    Name: string;
    email: string;
}

export type Schedule = {
    weekdays: string;
    begins: number;
    ends: number;
    room: string;
}

export type Section = {
    CRN: number; 
    semesterID: number;
    express: 0 | 1 | 2;
    section: number;
    online: 0 | 1 | 2;
    independentStudy: 0 | 1;
    seatsMaximum: number;
    creditHours: number;
    courseName: string;

    faculty: Faculty[];
    schedule: Schedule[];
}

export type Semester = {
    SID: number;
    name: string;
}

