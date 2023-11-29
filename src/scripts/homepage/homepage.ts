//This line imports code to give the scheduled classes a random color
import './calendar/schedule'

import {
    semesterList,
    semesterSelectButton,
    onSemesterListReady
} from './populateSections/semesterDropdown'


import {
    clearFetchAndShowSemester, 
    semesters
}  from './populateSections/sectionView'



//Connect semesterDropdown to SectionView
onSemesterListReady.then(() => {
    
    //take the currently selected section and autofill, baby!
    clearFetchAndShowSemester(semesterSelectButton.value)

    semesterSelectButton.addEventListener('change',
        ev => {
            clearFetchAndShowSemester(semesterSelectButton.value)
        }
    )
})
