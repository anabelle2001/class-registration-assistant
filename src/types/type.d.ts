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
    express: number;
    section: number;
    online: number;
    independentStudy: number;
    seatsMaximum: number;
    creditHours: number;
    courseName: string;

    faculty: Faculty[];
    schedule: Schedule[];
}