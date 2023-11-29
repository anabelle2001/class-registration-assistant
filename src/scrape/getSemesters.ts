import './ellucianResponseTypes'
import { term } from './ellucianResponseTypes';

export async function getSemestersFromEllucian(): Promise<term[]> {
    let url = 'https://ssb.cofc.edu/StudentRegistrationSsb/ssb/classSearch/getTerms?offset=0&max=0'
    let response = await fetch(url);
    return await response.json()
}