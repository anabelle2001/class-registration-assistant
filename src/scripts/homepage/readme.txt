How is this code structured?

anabelle.html
    includes Homepage.ts
        imports semesterSelect.ts
        imports populateSections.ts


What does `semesterSelect.ts` do, when imported?
- beigns to fetch a list of semesters
- exports a promise `onSemesterListReady`
- exports a variable semesterList that's an array of semesters

What does `populateSections.ts` do, when imported?
- provides, but does not call the following functions:
    - clearAndShowSemester(sid)

What does homepage.ts do?

connects 
