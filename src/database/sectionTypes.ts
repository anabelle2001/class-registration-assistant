export type booleanInt = 0|1
export type trinaryInt = 0| 1  | 2

export type section = {
    /**
     * Course Reference Number, usually 5 digits 
     * 
     * Example: 10001
     * */
    CRN: number

    /**
     * Semester ID, usually 6 digits
     *
     * Examples:
     * | Semester ID | Semester Name |
     * | --- | --- |
     * | 202410 | Fall 2023 |
     * | 202420 | Spring 2024 |
     * | 202430 | Summer 2024 |
     * 
     */
    semesterID: number

    /**
     * | Value| Meaning
     * | --- | :---: |
     * 0 | Not an Express class
     * 1 | Express I class
     * 2 | Express II class
     */
    express: trinaryInt
    
    section: number
    
    /**
     * | Value| Meaning
     * | --- | :---: |
     * 0 | In-person
     * 1 | Online, Synchronous
     * 2 | Online, Asynchronous
     */
    online: trinaryInt


    independentStudy: booleanInt
    seatsMaximum: number
    seatsAvailable: number
    creditHours: number
    /**
     * e.g: `"AAST200"`
     */
    courseName: string

    faculty: faculty[]
    schedule: schedule[]
}

export type faculty = {
    id: number
    name: string
    email: string
}

export type schedule = {
    /**
     * 24-hour time of when the class starts
     * 
     * e.g: `1350` - the class begins at 1:50
     */
    begins: number

    /**
     * 24-hour time of when the class ends
     * 
     * e.g: `1500` - the class ends at 3:00
     */
    ends: number

    /**
     * What days of the week the class meets on
     * 
     * e.g: `'-t-r'` - the class meets on tuesdays and thursdays
     */
    weekdays: weekdayList

    room: string
}

export type weekdayList = `${'m' | '-'}${'t' | '-'}${'w' | '-'}${'r' | '-'}${'f' | '-'}`