type Faculty = {
    FID: number;
    Name: string;
    email: string;
}

type Schedule = {
    weekdays: string;
    begins: number;
    ends: number;
    room: string;
}


type Section = {
    CRN: number;
    semesterID: number;
    express: number;
    section: number;
    online: number;
    independentStudy: number;
    seatsMaximum: number;
    creditHours: number;
    courseName: string;

    Faculty: Faculty[];
    Schedule: Schedule[];
}