import {byAbbrev} from './byAbbrev'

export type courseSortingComparator = (a: HTMLDivElement, b:HTMLDivElement) => number

export const orderCourses = {
    byAbbrev,
}

export type definedSortingMethod = keyof typeof orderCourses;




