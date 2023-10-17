import {getAuthHeaders} from './authenticate';

export let endpointURL ='https://ssb.cofc.edu'+'/StudentRegistrationSsb/ssb/classSearch/getTerms'+'?offset=0&max=0'

export let headers = await getAuthHeaders();

export let res = await fetch(endpointURL,{headers})

export let text = await res.text()

console.log(text)